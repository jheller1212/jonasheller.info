#!/usr/bin/env node
/**
 * Publication data sync — ORCID is the authoritative source, not Google Scholar.
 *
 * Scholar mixes in works by same-named authors; ORCID is curated by Jonas.
 * Run this manually after adding works to ORCID:
 *
 *   npm run sync:orcid
 *
 * Writes src/data/orcid-works.json, which is committed. Nothing fetches at
 * build time or in the browser — the site ships a static snapshot.
 *
 * Enrichment: ORCID often omits volume/issue/pages and full author lists, so
 * each DOI is resolved against Crossref (bibliographic detail) and OpenAlex
 * (open-access status). Both are keyless and politely rate-limited below.
 */

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ORCID_ID = "0000-0002-3214-0724";
const CONTACT = "contact@jonasheller.info";
const UA = `jonasheller.info-sync/1.0 (+https://www.jonasheller.info; mailto:${CONTACT})`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "src", "data", "orcid-works.json");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, { accept = "application/json", optional = false } = {}) {
  const res = await fetch(url, { headers: { Accept: accept, "User-Agent": UA } });
  if (!res.ok) {
    if (optional) return null;
    throw new Error(`${res.status} ${res.statusText} for ${url}`);
  }
  return res.json();
}

/* ─────────────────────────── ORCID ─────────────────────────── */

/** ORCID work types → the section a work belongs in on the site. */
const TYPE_MAP = {
  "journal-article": "article",
  "book-chapter": "chapter",
  book: "chapter",
  report: "report",
  "conference-paper": "conference",
  "conference-presentation": "conference",
  "conference-abstract": "conference",
  "dissertation-thesis": "thesis",
  preprint: "preprint",
  other: "report",
};

function firstDoi(work) {
  const ids = work["external-ids"]?.["external-id"] ?? [];
  const doi = ids.find((e) => e["external-id-type"] === "doi");
  return doi ? doi["external-id-value"].trim() : null;
}

/** ORCID stores volume/issue/pages only inside the BibTeX citation blob. */
function fromBibtex(work) {
  const cite = work.citation?.["citation-value"];
  if (!cite || work.citation?.["citation-type"] !== "bibtex") return {};
  const field = (name) => {
    const m = cite.match(new RegExp(`${name}\\s*=\\s*\\{([^}]*)\\}`, "i"));
    return m ? m[1].trim() : undefined;
  };
  const pages = field("pages");
  return {
    volume: field("volume"),
    issue: field("number"),
    // BibTeX uses en-dash ranges (94--114); normalise to a single hyphen.
    pages: pages ? pages.replace(/-{2,}/g, "-") : undefined,
  };
}

/**
 * Author names arrive in three shapes depending on who deposited the work:
 * "van Esch, P." (Scopus), "Ekaterina Glebova" (manual ORCID entry) and
 * "de Ruyter, Ko" (Crossref). Normalise all of them to { family, initials }
 * so surnames are comparable — the author-position badge depends on reliably
 * locating "Heller" in the list.
 */
const NAME_PARTICLES = new Set([
  "van", "von", "de", "der", "den", "del", "della", "di", "da", "dos",
  "du", "la", "le", "ten", "ter", "bin", "al",
]);

function toInitials(given) {
  return given
    .split(/[\s.-]+/)
    .filter(Boolean)
    .map((part) => `${part[0].toUpperCase()}.`)
    .join(" ");
}

/**
 * Names no general rule can parse: compound surnames written without a hyphen
 * ("Maja Golf Papez") and particle casing that varies between deposits. Keyed
 * by the raw credit-name as it appears in ORCID.
 */
const NAME_FIXES = {
  "Maja Golf Papez": { family: "Golf-Papez", initials: "M." },
};

/** Applied after parsing, so it catches every spelling a deposit may use. */
const FAMILY_FIXES = {
  "van esch": "van Esch",
  "de ruyter": "de Ruyter",
  "di palma": "di Palma",
  "golf papez": "Golf-Papez",
};

function normalizeAuthor(raw) {
  const name = raw.replace(/\s+/g, " ").trim();
  if (!name) return null;

  const fixed = NAME_FIXES[name];
  if (fixed) {
    return { ...fixed, display: `${fixed.family}, ${fixed.initials}` };
  }

  let family;
  let given;

  if (name.includes(",")) {
    const [head, ...rest] = name.split(",");
    family = head.trim();
    given = rest.join(",").trim();
  } else {
    // "Given [Middle] [particle] Family" — walk back over trailing particles.
    const parts = name.split(" ");
    let i = parts.length - 1;
    while (i > 0 && NAME_PARTICLES.has(parts[i - 1].toLowerCase())) i -= 1;
    family = parts.slice(i).join(" ");
    given = parts.slice(0, i).join(" ");
  }

  family = FAMILY_FIXES[family.toLowerCase()] ?? family;

  // A group/consortium author ("GUMBI Center") has no given name to initialise.
  const initials = given ? toInitials(given) : "";
  return {
    family,
    initials,
    display: initials ? `${family}, ${initials}` : family,
  };
}

function orcidAuthors(work) {
  const list = work.contributors?.contributor ?? [];
  return list.map((c) => c["credit-name"]?.value).filter(Boolean);
}

async function fetchOrcid() {
  const summary = await getJson(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`);
  const putCodes = summary.group.map((g) => g["work-summary"][0]["put-code"]);

  // The bulk endpoint caps at 100 put-codes per request.
  const works = [];
  for (let i = 0; i < putCodes.length; i += 100) {
    const batch = putCodes.slice(i, i + 100).join(",");
    const res = await getJson(`https://pub.orcid.org/v3.0/${ORCID_ID}/works/${batch}`);
    works.push(...res.bulk.map((b) => b.work));
  }
  return works;
}

/* ────────────────────── Crossref / OpenAlex ────────────────────── */

function formatCrossrefAuthor(a) {
  if (a.name) return a.name; // consortium / group author
  return a.given ? `${a.family ?? ""}, ${a.given}` : (a.family ?? "");
}

async function crossref(doi) {
  const data = await getJson(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
    optional: true,
  });
  if (!data?.message) return null;
  const m = data.message;
  return {
    volume: m.volume,
    issue: m.issue,
    pages: m.page,
    container: m["container-title"]?.[0],
    type: m.type,
    authors: (m.author ?? []).map(formatCrossrefAuthor),
  };
}

async function openAlex(doi) {
  const data = await getJson(`https://api.openalex.org/works/doi:${encodeURIComponent(doi)}`, {
    optional: true,
  });
  if (!data) return null;
  return {
    isOpenAccess: Boolean(data.open_access?.is_oa),
    // "gold" | "green" | "hybrid" | "bronze" | "closed"
    oaStatus: data.open_access?.oa_status ?? null,
    oaUrl: data.best_oa_location?.landing_page_url ?? null,
  };
}

/* ─────────────────────────── main ─────────────────────────── */

function slug(leadFamily, year) {
  const lead = (leadFamily ?? "heller")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z]/g, "");
  return `${lead || "work"}${year}`;
}

async function main() {
  console.log(`Fetching ORCID ${ORCID_ID} …`);
  const raw = await fetchOrcid();
  console.log(`  ${raw.length} works`);

  const out = [];

  for (const work of raw) {
    const year = Number(work["publication-date"]?.year?.value) || null;
    const doi = firstDoi(work);
    const bib = fromBibtex(work);

    let cr = null;
    let oa = null;
    if (doi) {
      cr = await crossref(doi);
      await sleep(120); // stay well inside Crossref's polite-pool limits
      oa = await openAlex(doi);
      await sleep(120);
    }

    // Prefer the richer source per field, but never let an enrichment source
    // overwrite something ORCID states explicitly. Crossref is used for the
    // author list only when ORCID carries no contributors at all — a partial
    // ORCID list is still Jonas's own curation.
    const rawAuthors = orcidAuthors(work).length ? orcidAuthors(work) : (cr?.authors ?? []);
    const authors = rawAuthors.map(normalizeAuthor).filter(Boolean);
    const heller = authors.findIndex((a) => /^Heller$/i.test(a.family));

    out.push({
      id: null, // assigned after sorting, see below
      idBase: slug(authors[0]?.family, year ?? 0),
      putCode: work["put-code"],
      title: work.title?.title?.value?.trim() ?? "",
      year,
      type: TYPE_MAP[work.type] ?? "report",
      orcidType: work.type,
      venue: work["journal-title"]?.value ?? cr?.container ?? null,
      volume: bib.volume ?? cr?.volume ?? null,
      issue: bib.issue ?? cr?.issue ?? null,
      pages: bib.pages ?? cr?.pages ?? null,
      doi,
      authors: authors.map((a) => a.display),
      // 1-based position of Jonas in the author list; null if not detected.
      authorPosition: heller === -1 ? null : heller + 1,
      authorCount: authors.length,
      isOpenAccess: oa?.isOpenAccess ?? null,
      oaStatus: oa?.oaStatus ?? null,
      oaUrl: oa?.oaUrl ?? null,
    });

    console.log(`  ${year ?? "????"}  ${work.type.padEnd(24)} ${doi ? "doi" : "   "} ${work.title?.title?.value?.slice(0, 60)}`);
  }

  // Sort before assigning ids so that a work's id depends only on its own
  // content, never on the order ORCID happened to return it in. `selectedIds`
  // in the overlay references these ids and must survive a re-sync.
  out.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));

  const seen = new Map();
  for (const work of out) {
    const { idBase } = work;
    const n = (seen.get(idBase) ?? 0) + 1;
    seen.set(idBase, n);
    // Second and later works by the same lead author in one year get a, b, c…
    work.id = n === 1 ? idBase : `${idBase}${String.fromCharCode(97 + n - 2)}`;
    delete work.idBase;
  }

  await writeFile(
    OUT,
    JSON.stringify({ orcid: ORCID_ID, fetchedAt: new Date().toISOString().slice(0, 10), works: out }, null, 2) + "\n",
  );
  console.log(`\nWrote ${out.length} works to ${path.relative(process.cwd(), OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
