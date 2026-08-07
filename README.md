# jonasheller.info

Personal academic website for Dr. Jonas Heller — Tenured Assistant Professor of Marketing at Maastricht University, Co-Founder of DEXLab & LIT Network.

**Live:** [www.jonasheller.info](https://www.jonasheller.info)

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, static prerendering)
- TypeScript, Tailwind CSS
- Framer Motion for animations, Lenis for smooth scrolling
- Deployed on Vercel (auto-deploys on push to `main`)

## Local development

```bash
npm install
npm run dev
```

Build check (the only gate — there is no test suite):

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Project structure

```
src/
  app/
    page.tsx              # Home (hero, speaking, consulting, publications, contact)
    speaking/             # Keynote topics (own metadata + Service JSON-LD)
    consulting/           # Advisory & training (own metadata + Service JSON-LD)
    projects/page.tsx     # Live products
    cv/page.tsx           # Full curriculum vitae
    publications/         # Complete publication record, no toggle
    academic/             # Sober academic profile, print/PDF-ready
    layout.tsx            # Root layout, metadata, Person JSON-LD, skip link
    sitemap.ts            # Sitemap (all routes)
    opengraph-image.tsx   # Dynamic OG image (uses the .ttf fonts in src/app/)
  components/
    Hero.tsx              # Animated hero section
    Speaking.tsx          # Keynotes & workshops
    Consulting.tsx        # Advisory offering
    Bento.tsx             # Bento-grid research/impact section
    Publications.tsx      # Home: the seven selected papers
    PublicationList.tsx   # Full list, grouped by contribution type
    PublicationEntry.tsx  # One entry: authors, position, DOI, OA status
    FundingTables.tsx     # Three funding tables with subtotals
    TeachingList.tsx      # Teaching record
    Contact.tsx           # Contact form (Formspree)
    Footer.tsx            # Footer with Impressum & Privacy dialog
    Nav.tsx               # Navigation bar
    Terminal.tsx          # Terminal-style about animation
    MagneticButton.tsx
    SmoothScroll.tsx      # Lenis wiring
    ThemeProvider.tsx     # Light/dark theme toggle
  data/
    orcid-works.json      # Generated mirror of ORCID — do not edit by hand
    publications-overlay.ts # Manual fields ORCID cannot express
    publications.ts       # Merges the two; single source of all pub counts
    cv.ts                 # CV data: funding tables, teaching, supervision
  lib/
    i18n.tsx              # EN/DE/NL translations (client-side)
scripts/
  sync-orcid.mjs          # ORCID -> orcid-works.json (run manually)
public/
  robots.txt              # Points to /sitemap.xml
```

## Publication data

ORCID [0000-0002-3214-0724](https://orcid.org/0000-0002-3214-0724) is the
authoritative source. Google Scholar is not used: that profile mixes in works
by a same-named author.

After adding or correcting a work in ORCID, refresh the local snapshot:

```bash
npm run sync:orcid
```

This rewrites `src/data/orcid-works.json`, enriching each DOI with volume,
issue and pages from Crossref and open-access status from OpenAlex. The file is
committed — nothing is fetched at build time or in the browser.

Anything ORCID cannot express (which papers are featured, which are systematic
reviews, manuscripts under review, works not yet deposited in ORCID) lives in
`src/data/publications-overlay.ts` and is merged in at import time.

Every publication count on the site is derived from `PUBLICATION_STATS` in
`src/data/publications.ts`. Do not hardcode these numbers anywhere else.

## License

Content (text, publications, biographical data) is owned by Jonas Heller. Code is available for reference.
