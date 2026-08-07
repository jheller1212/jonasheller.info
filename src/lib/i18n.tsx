"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

export type Locale = "en" | "de" | "nl";

const STORAGE_KEY = "locale";

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "de" || stored === "nl" || stored === "en") return stored;
  const lang = navigator.language?.toLowerCase() ?? "";
  if (lang.startsWith("de")) return "de";
  if (lang.startsWith("nl")) return "nl";
  return "en";
}

type TranslationMap = Record<string, Record<Locale, string>>;

const translations: TranslationMap = {
  // Nav
  "nav.about": { en: "About", de: "Über mich", nl: "Over mij" },
  "nav.publications": { en: "Publications", de: "Publikationen", nl: "Publicaties" },
  "nav.speaking": { en: "Speaking", de: "Vorträge", nl: "Lezingen" },
  "nav.consulting": { en: "Consulting", de: "Beratung", nl: "Advies" },
  "nav.projects": { en: "Projects", de: "Projekte", nl: "Projecten" },
  "nav.cv": { en: "CV", de: "Lebenslauf", nl: "CV" },
  "nav.contact": { en: "Contact", de: "Kontakt", nl: "Contact" },

  // Hero
  "hero.subtitle": { en: "Keynote Speaker · Consultant · Professor", de: "Keynote Speaker · Berater · Professor", nl: "Keynote spreker · Adviseur · Professor" },
  "hero.value": {
    en: "I help executives and their teams cut through the hype of AR, VR, and AI — with keynotes, workshops, and strategy grounded in a decade of consumer research.",
    de: "Ich helfe Führungskräften und ihren Teams, den Hype um AR, VR und KI zu durchschauen — mit Keynotes, Workshops und Strategien, gestützt auf ein Jahrzehnt Konsumentenforschung.",
    nl: "Ik help bestuurders en hun teams door de hype van AR, VR en AI heen te kijken — met keynotes, workshops en strategie, gestoeld op tien jaar consumentenonderzoek.",
  },
  "hero.ctaPrimary": { en: "Book a keynote", de: "Keynote anfragen", nl: "Keynote boeken" },
  "hero.ctaSecondary": { en: "or discuss a project", de: "oder ein Projekt besprechen", nl: "of een project bespreken" },

  // Trusted by
  "trusted.label": {
    en: "Trusted by organizations including",
    de: "Diese Organisationen vertrauen mir",
    nl: "Vertrouwd door organisaties zoals",
  },
  "trusted.0": { en: "Allianz", de: "Allianz", nl: "Allianz" },
  "trusted.1": { en: "APG", de: "APG", nl: "APG" },
  "trusted.2": {
    en: "Dutch Ministry of I&W",
    de: "NL-Infrastrukturministerium",
    nl: "Ministerie van IenW",
  },
  "trusted.3": {
    en: "Maastricht University MBA",
    de: "Maastricht University MBA",
    nl: "Maastricht University MBA",
  },

  // Terminal
  "terminal.title": { en: "about.sh", de: "ueber-mich.sh", nl: "over-mij.sh" },

  // Terminal lines
  "terminal.line.0": { en: 'name: "Dr. Jonas Heller"', de: 'Name: "Dr. Jonas Heller"', nl: 'naam: "Dr. Jonas Heller"' },
  "terminal.line.1": {
    en: 'role: "Tenured Assistant Professor (Universitair Docent 1), Marketing"',
    de: 'Rolle: "Tenured Assistant Professor (Universitair Docent 1), Marketing"',
    nl: 'functie: "Universitair Docent 1, Marketing (vast)"',
  },
  "terminal.line.2": { en: 'affiliation: "Maastricht University, SBE"', de: 'Universität: "Maastricht University, SBE"', nl: 'universiteit: "Maastricht University, SBE"' },
  "terminal.line.3": { en: 'labs: ["DEXLab", "LIT Network"]', de: 'Labs: ["DEXLab", "LIT Network"]', nl: 'labs: ["DEXLab", "LIT Network"]' },
  "terminal.line.4": { en: 'research: ["AR/VR", "AI", "Digital Marketing", "Consumer Behavior"]', de: 'Forschung: ["AR/VR", "KI", "Digitales Marketing", "Konsumentenverhalten"]', nl: 'onderzoek: ["AR/VR", "AI", "Digitale Marketing", "Consumentengedrag"]' },
  "terminal.line.5": {
    en: 'funding: "Marie Skłodowska-Curie Fellow | {external} external competitive funding"',
    de: 'Drittmittel: "Marie-Skłodowska-Curie-Fellow | {external} externe kompetitive Mittel"',
    nl: 'financiering: "Marie Skłodowska-Curie Fellow | {external} externe competitieve financiering"',
  },
  "terminal.line.6": { en: 'awards: ["SBE Junior Researcher 2024", "Dean\'s Award UNSW"]', de: 'Auszeichnungen: ["SBE Junior Researcher 2024", "Dean\'s Award UNSW"]', nl: 'prijzen: ["SBE Junior Researcher 2024", "Dean\'s Award UNSW"]' },
  "terminal.line.7": { en: 'education: [', de: 'Ausbildung: [', nl: 'opleiding: [' },
  "terminal.line.8": { en: '  "PhD Digital Marketing @ UNSW",', de: '  "PhD Digital Marketing @ UNSW",', nl: '  "PhD Digital Marketing @ UNSW",' },
  "terminal.line.9": { en: '  "M.Sc. International Business: SCM @ Maastricht University",', de: '  "M.Sc. International Business: SCM @ Universität Maastricht",', nl: '  "M.Sc. International Business: SCM @ Universiteit Maastricht",' },
  "terminal.line.10": { en: '  "B.Sc. International Business @ Maastricht University"', de: '  "B.Sc. International Business @ Universität Maastricht"', nl: '  "B.Sc. International Business @ Universiteit Maastricht"' },
  "terminal.line.11": { en: ']', de: ']', nl: ']' },
  "terminal.line.12": { en: 'industry: ["Zalando", "Jimdo"]', de: 'Industrie: ["Zalando", "Jimdo"]', nl: 'industrie: ["Zalando", "Jimdo"]' },
  "terminal.line.13": {
    en: 'publications: "{articles} peer-reviewed journal articles | {outputs} research outputs"',
    de: 'Publikationen: "{articles} peer-reviewte Zeitschriftenartikel | {outputs} Forschungsoutputs"',
    nl: 'publicaties: "{articles} peer-reviewed tijdschriftartikelen | {outputs} onderzoeksoutputs"',
  },

  // About bio
  "about.bio": {
    en: "Jonas Heller is a tenured Assistant Professor (Universitair Docent 1) of Marketing at Maastricht University\u2019s School of Business and Economics, where he directs DEXLab \u2014 a research lab specializing in immersive technologies, AI, and consumer neuroscience. He has secured {external} in external competitive research funding, published {articles} peer-reviewed journal articles, and advises organizations ranging from Allianz to government ministries on the behavioral science of digital transformation. He speaks internationally on AR, VR, AI, and the future of human-technology interaction.",
    de: "Jonas Heller ist entfristeter Assistant Professor (Universitair Docent 1) f\u00fcr Marketing an der School of Business and Economics der Universit\u00e4t Maastricht, wo er das DEXLab leitet \u2014 ein Forschungslabor f\u00fcr immersive Technologien, KI und Konsumenten-Neurowissenschaften. Er hat {external} an externen kompetitiven Drittmitteln eingeworben, {articles} peer-reviewte Zeitschriftenartikel ver\u00f6ffentlicht und ber\u00e4t Organisationen von Allianz bis zu Regierungsministerien zur Verhaltenswissenschaft der digitalen Transformation. Er h\u00e4lt international Vortr\u00e4ge \u00fcber AR, VR, KI und die Zukunft der Mensch-Technologie-Interaktion.",
    nl: "Jonas Heller is universitair docent 1 (vast) Marketing aan de School of Business and Economics van de Universiteit Maastricht, waar hij DEXLab leidt \u2014 een onderzoekslab gespecialiseerd in immersieve technologie\u00ebn, AI en consumentenneurowetenschappen. Hij heeft {external} aan externe competitieve onderzoeksfinanciering verworven, {articles} peer-reviewed tijdschriftartikelen gepubliceerd en adviseert organisaties van Allianz tot overheidsministeries over de gedragswetenschap van digitale transformatie. Hij spreekt internationaal over AR, VR, AI en de toekomst van mens-technologie-interactie.",
  },

  // Bento
  "bento.eyebrow": { en: "Research & Impact", de: "Forschung & Wirkung", nl: "Onderzoek & Impact" },
  "bento.title": { en: "Work Highlights", de: "Ausgewählte Arbeiten", nl: "Hoogtepunten" },
  "bento.a.title": { en: "DEXLab", de: "DEXLab", nl: "DEXLab" },
  "bento.a.desc": {
    en: "Co-founder & Scientific Director of the Digital Experience Lab — a hub for AR, VR, AI, service robots, and neuroscientific tools at Maastricht University SBE.",
    de: "Mitgründer & wissenschaftlicher Direktor des Digital Experience Lab — ein Zentrum für AR, VR, KI, Serviceroboter und neurowissenschaftliche Instrumente an der Universität Maastricht SBE.",
    nl: "Medeoprichter & wetenschappelijk directeur van het Digital Experience Lab — een centrum voor AR, VR, AI, servicerobot en neurowetenschappelijke tools aan Maastricht University SBE.",
  },
  "bento.a.link": { en: "Visit DEXLab →", de: "DEXLab besuchen →", nl: "Bezoek DEXLab →" },
  "bento.b.title": {
    en: "{external} External Competitive Funding",
    de: "{external} externe kompetitive Drittmittel",
    nl: "{external} externe competitieve financiering",
  },
  "bento.b.desc": {
    en: "External competitive grants including Marie Skłodowska-Curie, Comenius, NETSPAR, ERASMUS+, and international PhD funding from CSC and SACM. Including internal and strategic funding, {total} across {count} grants.",
    de: "Externe kompetitive Drittmittel, u.a. Marie Skłodowska-Curie, Comenius, NETSPAR, ERASMUS+ sowie internationale Promotionsförderungen von CSC und SACM. Einschließlich interner und strategischer Mittel {total} aus {count} Bewilligungen.",
    nl: "Externe competitieve subsidies, waaronder Marie Skłodowska-Curie, Comenius, NETSPAR, ERASMUS+ en internationale PhD-financiering van CSC en SACM. Inclusief interne en strategische middelen {total} uit {count} toekenningen.",
  },
  "bento.c.title": { en: "Immersive Technologies", de: "Immersive Technologien", nl: "Immersieve Technologieën" },
  "bento.c.desc": {
    en: "Pioneering research on AR, VR, and XR's impact on consumer decision-making in frontline services.",
    de: "Wegweisende Forschung zur Wirkung von AR, VR und XR auf Konsumentenentscheidungen im Dienstleistungsbereich.",
    nl: "Baanbrekend onderzoek naar de invloed van AR, VR en XR op consumentenbeslissingen in dienstverlening.",
  },
  "bento.d.title": { en: "AI & Digital Marketing", de: "KI & Digitales Marketing", nl: "AI & Digitale Marketing" },
  "bento.d.desc": {
    en: "Combining experimental and econometric methods to study AI-driven marketing decisions.",
    de: "Kombination experimenteller und ökonometrischer Methoden zur Erforschung KI-gestützter Marketingentscheidungen.",
    nl: "Combinatie van experimentele en econometrische methoden om AI-gedreven marketingbeslissingen te onderzoeken.",
  },
  "bento.e.title": { en: "LIT Network", de: "LIT Network", nl: "LIT Network" },
  "bento.e.desc": {
    en: "Co-founded the Limburg Immersive Technologies Network connecting academia, industry, and SMEs.",
    de: "Mitgründer des Limburg Immersive Technologies Network, das Wissenschaft, Industrie und KMU verbindet.",
    nl: "Medeoprichter van het Limburg Immersive Technologies Network dat wetenschap, industrie en mkb verbindt.",
  },
  "bento.e.link": { en: "Learn more →", de: "Mehr erfahren →", nl: "Meer informatie →" },
  "bento.f.title": {
    en: "{articles} Peer-Reviewed Articles",
    de: "{articles} peer-reviewte Artikel",
    nl: "{articles} peer-reviewed artikelen",
  },
  "bento.f.desc": {
    en: "Published in journals including Journal of Retailing, Journal of Service Research, The Leadership Quarterly, and Computers in Human Behavior — {outputs} research outputs in total.",
    de: "Veröffentlichungen u.a. in Journal of Retailing, Journal of Service Research, The Leadership Quarterly und Computers in Human Behavior — insgesamt {outputs} Forschungsoutputs.",
    nl: "Gepubliceerd in o.a. Journal of Retailing, Journal of Service Research, The Leadership Quarterly en Computers in Human Behavior — {outputs} onderzoeksoutputs in totaal.",
  },
  "bento.g.title": { en: "Executive Education", de: "Executive Education", nl: "Executive Education" },
  "bento.g.desc": {
    en: "MBA Digital Strategy, workshops & in-company training for Allianz, APG, Dutch Ministry of I&W, and more.",
    de: "MBA Digital Strategy, Workshops & Inhouse-Trainings für Allianz, APG, niederländisches Ministerium für I&W u.a.",
    nl: "MBA Digital Strategy, workshops & incompany trainingen voor Allianz, APG, Ministerie van I&W en meer.",
  },

  // Publications
  "pub.eyebrow": { en: "Publications", de: "Publikationen", nl: "Publicaties" },
  "pub.title": { en: "Selected Papers", de: "Ausgewählte Arbeiten", nl: "Geselecteerde publicaties" },
  "pub.count": { en: "Publications", de: "Publikationen", nl: "Publicaties" },
  "pub.showAll": { en: "Show All", de: "Alle anzeigen", nl: "Alles tonen" },
  "pub.papers": { en: "Papers", de: "Arbeiten", nl: "Artikelen" },
  "pub.showLess": { en: "Show Less", de: "Weniger anzeigen", nl: "Minder tonen" },
  "pub.sortRelevance": { en: "Relevance", de: "Relevanz", nl: "Relevantie" },
  "pub.sortYear": { en: "Year", de: "Jahr", nl: "Jaar" },
  "pub.filterAll": { en: "All", de: "Alle", nl: "Alle" },
  "pub.article": { en: "Articles", de: "Artikel", nl: "Artikelen" },
  "pub.review": { en: "Reviews", de: "Übersichten", nl: "Reviews" },
  "pub.chapter": { en: "Chapters", de: "Kapitel", nl: "Hoofdstukken" },
  "pub.comment": { en: "Comments", de: "Kommentare", nl: "Commentaren" },
  "pub.abstract": { en: "Abstracts", de: "Abstracts", nl: "Abstracts" },
  "pub.thesis": { en: "Thesis", de: "Dissertation", nl: "Proefschrift" },
  "pub.preprint": { en: "Preprints", de: "Preprints", nl: "Preprints" },
  "pub.report": { en: "Reports", de: "Berichte", nl: "Rapporten" },
  "pub.citations": { en: "citations", de: "Zitationen", nl: "citaties" },
  "pub.conference": { en: "Conference", de: "Konferenzbeiträge", nl: "Congresbijdragen" },
  "pub.selectedNote": {
    en: "Seven selected papers. The complete list is on the publications page.",
    de: "Sieben ausgewählte Arbeiten. Das vollständige Schriftenverzeichnis finden Sie auf der Publikationsseite.",
    nl: "Zeven geselecteerde publicaties. De volledige lijst staat op de publicatiepagina.",
  },
  "pub.viewAll": {
    en: "Full list of publications →",
    de: "Vollständiges Schriftenverzeichnis →",
    nl: "Volledige publicatielijst →",
  },

  // Publications page
  "pubPage.heading": {
    en: "Publications",
    de: "Schriftenverzeichnis",
    nl: "Publicaties",
  },
  "pubPage.intro": {
    en: "Complete list of research outputs, grouped by type and ordered by year. The authoritative record is ORCID; this page is generated from it.",
    de: "Vollständiges Verzeichnis aller Forschungsoutputs, nach Publikationsform gegliedert und chronologisch absteigend sortiert. Maßgeblich ist das ORCID-Profil, aus dem diese Seite erzeugt wird.",
    nl: "Volledig overzicht van alle onderzoeksoutput, gegroepeerd per type en chronologisch aflopend. Het ORCID-profiel is leidend; deze pagina wordt daaruit gegenereerd.",
  },
  "pubPage.statArticles": {
    en: "peer-reviewed journal articles",
    de: "peer-reviewte Zeitschriftenartikel",
    nl: "peer-reviewed tijdschriftartikelen",
  },
  "pubPage.statOutputs": {
    en: "research outputs in total",
    de: "Forschungsoutputs insgesamt",
    nl: "onderzoeksoutputs in totaal",
  },
  "pubPage.lastSynced": {
    en: "Synced from ORCID on",
    de: "Aus ORCID übernommen am",
    nl: "Overgenomen uit ORCID op",
  },

  // Publication sections (P2.5)
  "pub.section.articles": {
    en: "Journal Articles",
    de: "Zeitschriftenartikel",
    nl: "Tijdschriftartikelen",
  },
  "pub.section.reviews": {
    en: "Review Articles",
    de: "Übersichtsarbeiten",
    nl: "Overzichtsartikelen",
  },
  "pub.section.chapters": {
    en: "Book Chapters",
    de: "Buchbeiträge",
    nl: "Boekbijdragen",
  },
  "pub.section.conference": {
    en: "Conference Contributions",
    de: "Konferenzbeiträge",
    nl: "Congresbijdragen",
  },
  "pub.section.other": {
    en: "Reports & Other Contributions",
    de: "Berichte und sonstige Beiträge",
    nl: "Rapporten en overige bijdragen",
  },

  // Publication entry metadata (P2.4)
  "pub.authorPosition": {
    en: "Author {n} of {total}",
    de: "Autorenposition {n} von {total}",
    nl: "Auteur {n} van {total}",
  },
  "pub.openAccess": { en: "Open Access", de: "Open Access", nl: "Open Access" },
  "pub.closedAccess": { en: "Subscription", de: "Closed Access", nl: "Closed access" },
  "pub.type.article": { en: "Article", de: "Artikel", nl: "Artikel" },
  "pub.type.review": { en: "Review", de: "Übersichtsarbeit", nl: "Review" },
  "pub.type.chapter": { en: "Chapter", de: "Buchbeitrag", nl: "Hoofdstuk" },
  "pub.type.conference": { en: "Conference", de: "Konferenzbeitrag", nl: "Congresbijdrage" },
  "pub.type.report": { en: "Report", de: "Bericht", nl: "Rapport" },
  "pub.type.thesis": { en: "Dissertation", de: "Dissertation", nl: "Proefschrift" },
  "pub.type.preprint": { en: "Preprint", de: "Preprint", nl: "Preprint" },

  // Under review (P2.6)
  "pub.underReview": {
    en: "Manuscripts Under Review",
    de: "Manuskripte im Begutachtungsverfahren",
    nl: "Manuscripten in beoordeling",
  },
  "pub.status.underReview": { en: "Under Review", de: "Under Review", nl: "Under review" },
  "pub.status.rr": { en: "Revise and Resubmit", de: "Revise and Resubmit", nl: "Revise and resubmit" },
  "pub.status.accepted": { en: "Accepted", de: "Angenommen", nl: "Geaccepteerd" },

  // ── CV / academic record ──
  // German uses the established academic vocabulary here (Drittmittel,
  // Betreuung, akademische Selbstverwaltung), not literal translations of the
  // English headings (P3.6).
  "cv.rankFootnote": {
    en: "Universitair Docent 1 is the tenured senior rank below Associate Professor in the Dutch academic system.",
    de: "Universitair Docent 1 ist die entfristete Senior-Position unterhalb der Associate Professur im niederländischen Hochschulsystem.",
    nl: "Universitair Docent 1 is de vaste seniorrang onder Universitair Hoofddocent in het Nederlandse stelsel.",
  },

  "cv.section.experience": { en: "Professional Experience", de: "Beruflicher Werdegang", nl: "Loopbaan" },
  "cv.section.education": { en: "Academic Degrees", de: "Akademische Abschlüsse", nl: "Academische graden" },
  "cv.section.awards": { en: "Awards & Honors", de: "Auszeichnungen", nl: "Onderscheidingen" },
  "cv.section.funding": { en: "Grants & Third-Party Funding", de: "Drittmittel", nl: "Onderzoeksfinanciering" },
  "cv.section.teaching": { en: "Teaching", de: "Lehre und Lehrdeputat", nl: "Onderwijs" },
  "cv.section.supervision": { en: "Doctoral Supervision", de: "Promotionsbetreuung", nl: "Promotiebegeleiding" },
  "cv.section.service": { en: "Academic Service", de: "Akademische Selbstverwaltung", nl: "Bestuurlijke taken" },
  "cv.section.reviewing": { en: "Peer Reviewing", de: "Gutachtertätigkeit", nl: "Peer review" },
  "cv.section.publications": { en: "Publications", de: "Schriftenverzeichnis", nl: "Publicaties" },

  "cv.eyebrow.experience": { en: "Experience", de: "Werdegang", nl: "Loopbaan" },
  "cv.eyebrow.education": { en: "Education", de: "Ausbildung", nl: "Opleiding" },
  "cv.eyebrow.awards": { en: "Recognition", de: "Anerkennung", nl: "Erkenning" },
  "cv.eyebrow.funding": { en: "Funding", de: "Drittmittel", nl: "Financiering" },
  "cv.eyebrow.teaching": { en: "Teaching", de: "Lehre", nl: "Onderwijs" },
  "cv.eyebrow.supervision": { en: "Supervision", de: "Betreuung", nl: "Begeleiding" },
  "cv.eyebrow.service": { en: "Service", de: "Selbstverwaltung", nl: "Bestuur" },
  "cv.eyebrow.reviewing": { en: "Reviewing", de: "Begutachtung", nl: "Review" },

  // Funding tables (P3.3)
  "cv.funding.external": {
    en: "External Competitive Funding",
    de: "Externe kompetitive Drittmittel",
    nl: "Externe competitieve financiering",
  },
  "cv.funding.internal": {
    en: "Internal & Strategic Funding",
    de: "Interne und strategische Mittel",
    nl: "Interne en strategische middelen",
  },
  "cv.funding.events": {
    en: "Conference & Event Funding",
    de: "Konferenz- und Eventförderung",
    nl: "Congres- en evenementfinanciering",
  },
  "cv.funding.subtotal": { en: "Subtotal", de: "Zwischensumme", nl: "Subtotaal" },
  "cv.funding.total": { en: "Total across all tables", de: "Summe aller Tabellen", nl: "Totaal alle tabellen" },
  "cv.funding.headline": {
    en: "external competitive funding",
    de: "externe kompetitive Drittmittel",
    nl: "externe competitieve financiering",
  },
  "cv.funding.acrossGrants": {
    en: "total funding across {n} grants, external and internal combined",
    de: "Gesamtvolumen aus {n} Bewilligungen, extern und intern zusammen",
    nl: "totale financiering uit {n} toekenningen, extern en intern samen",
  },
  "cv.funding.col.year": { en: "Year", de: "Jahr", nl: "Jaar" },
  "cv.funding.col.funder": { en: "Funder", de: "Geldgeber", nl: "Financier" },
  "cv.funding.col.project": { en: "Project", de: "Projekttitel", nl: "Project" },
  "cv.funding.col.role": { en: "Role", de: "Rolle", nl: "Rol" },
  "cv.funding.col.amount": { en: "Total volume", de: "Gesamtvolumen", nl: "Totaalvolume" },
  "cv.funding.col.share": { en: "Own share", de: "Eigener Anteil", nl: "Eigen aandeel" },
  "cv.funding.col.duration": { en: "Duration", de: "Laufzeit", nl: "Looptijd" },
  "cv.funding.industry": {
    en: "In addition, ongoing industry contract income for DEXLab workshops since {year} (approx. {amount}). Reported separately, as contract income is not competitively awarded funding.",
    de: "Hinzu kommen laufende Industrieerträge für DEXLab-Workshops seit {year} (rund {amount}). Diese werden gesondert ausgewiesen, da Auftragserträge keine kompetitiv eingeworbenen Drittmittel sind.",
    nl: "Daarnaast lopende opdrachtinkomsten voor DEXLab-workshops sinds {year} (circa {amount}). Deze worden apart vermeld, omdat opdrachtinkomsten geen competitief verworven financiering zijn.",
  },

  // Teaching (P3.4)
  "cv.teaching.pbl": {
    en: "Courses are taught in Maastricht University's Problem-Based Learning format, combining plenary lectures with tutorial groups.",
    de: "Die Lehrveranstaltungen finden im Problem-Based-Learning-Format der Universität Maastricht statt und verbinden Vorlesungen mit Tutorien in Kleingruppen.",
    nl: "Het onderwijs volgt het Problem-Based Learning-format van Maastricht University, met hoorcolleges en tutorgroepen.",
  },
  "cv.teaching.role": { en: "Role", de: "Rolle", nl: "Rol" },
  "cv.teaching.cohort": { en: "cohort", de: "Kohorte", nl: "cohort" },
  "cv.teaching.evaluation": { en: "evaluation", de: "Evaluation", nl: "evaluatie" },

  "cv.supervision.current": { en: "Current", de: "Laufend", nl: "Lopend" },
  "cv.supervision.completed": { en: "Completed", de: "Abgeschlossen", nl: "Afgerond" },
  "cv.supervision.other": { en: "Additional", de: "Weitere Betreuung", nl: "Overig" },

  // Academic view (P3.5)
  "academic.link": {
    en: "Academic profile →",
    de: "Akademisches Profil →",
    nl: "Academisch profiel →",
  },
  "academic.heading": { en: "Academic Profile", de: "Akademisches Profil", nl: "Academisch profiel" },
  "academic.intro": {
    en: "Full academic record: profile, publications, third-party funding, teaching, doctoral supervision, and academic service.",
    de: "Vollständiges akademisches Profil: Werdegang, Schriftenverzeichnis, Drittmittel, Lehre, Promotionsbetreuung und akademische Selbstverwaltung.",
    nl: "Volledig academisch profiel: loopbaan, publicaties, onderzoeksfinanciering, onderwijs, promotiebegeleiding en bestuurlijke taken.",
  },
  "academic.print": { en: "Download as PDF", de: "Als PDF herunterladen", nl: "Downloaden als pdf" },
  "academic.printHint": {
    en: "Opens your browser's print dialogue — choose “Save as PDF”.",
    de: "Öffnet den Druckdialog des Browsers — dort „Als PDF sichern“ wählen.",
    nl: "Opent het afdrukvenster van uw browser — kies “Opslaan als pdf”.",
  },
  "academic.generated": { en: "Generated on", de: "Erstellt am", nl: "Gegenereerd op" },

  // Speaking
  "speaking.eyebrow": { en: "Speaking", de: "Vorträge", nl: "Lezingen" },
  "speaking.title": { en: "Keynote Topics", de: "Keynote-Themen", nl: "Keynote-onderwerpen" },

  // Speaking topics
  "speaking.0.title": {
    en: "Reality, Augmented: Where AR & VR Actually Pay Off",
    de: "Reality, Augmented: Wo sich AR & VR wirklich lohnen",
    nl: "Reality, Augmented: waar AR & VR zich echt terugbetalen",
  },
  "speaking.0.desc": {
    en: "What a decade of lab and consumer studies says about immersive tech in retail and services — your audience leaves knowing which use cases create value and which are expensive gimmicks.",
    de: "Was ein Jahrzehnt Labor- und Konsumentenforschung über immersive Technologien in Handel und Dienstleistung zeigt — Ihr Publikum erfährt, welche Anwendungsfälle Wert schaffen und welche teure Spielerei sind.",
    nl: "Wat tien jaar lab- en consumentenonderzoek leert over immersieve technologie in retail en dienstverlening — uw publiek weet daarna welke toepassingen waarde creëren en welke dure gimmicks zijn.",
  },
  "speaking.1.title": {
    en: "Beyond the AI Hype: What AI Really Does to Customers",
    de: "Jenseits des KI-Hypes: Was KI mit Kunden wirklich macht",
    nl: "Voorbij de AI-hype: wat AI echt met klanten doet",
  },
  "speaking.1.desc": {
    en: "How consumers actually respond to AI in marketing and service — and how to deploy it without eroding the trust your brand runs on.",
    de: "Wie Konsumenten tatsächlich auf KI in Marketing und Service reagieren — und wie Sie KI einsetzen, ohne das Vertrauen in Ihre Marke zu beschädigen.",
    nl: "Hoe consumenten werkelijk reageren op AI in marketing en service — en hoe u AI inzet zonder het vertrouwen in uw merk te schaden.",
  },
  "speaking.2.title": {
    en: "Mind Meets Machine: Brain-Computer Interfaces",
    de: "Mind Meets Machine: Brain-Computer-Interfaces",
    nl: "Mind Meets Machine: brain-computer interfaces",
  },
  "speaking.2.desc": {
    en: "A look past the science fiction: what neurotechnology can already measure about your customers, and the strategic and ethical questions leaders should ask now.",
    de: "Ein Blick hinter die Science-Fiction: Was Neurotechnologie heute schon über Ihre Kunden messen kann — und welche strategischen und ethischen Fragen Führungskräfte jetzt stellen sollten.",
    nl: "Voorbij de sciencefiction: wat neurotechnologie nu al over uw klanten kan meten — en welke strategische en ethische vragen leiders vandaag moeten stellen.",
  },
  "speaking.3.title": {
    en: "Working in the Metaverse: Immersive Collaboration",
    de: "Arbeiten im Metaverse: Immersive Zusammenarbeit",
    nl: "Werken in het metaverse: immersief samenwerken",
  },
  "speaking.3.desc": {
    en: "What XR genuinely changes about collaboration, training, and learning — separating the durable shifts from the hype cycle.",
    de: "Was XR an Zusammenarbeit, Training und Lernen wirklich verändert — und wie sich dauerhafte Entwicklungen vom Hype unterscheiden lassen.",
    nl: "Wat XR werkelijk verandert aan samenwerken, trainen en leren — en hoe u blijvende verschuivingen onderscheidt van de hype.",
  },
  "speaking.4.title": {
    en: "The Experience Dividend: Transformation Customers Feel",
    de: "Die Experience-Dividende: Digitalisierung, die Kunden spüren",
    nl: "Het experience-dividend: digitalisering die klanten voelen",
  },
  "speaking.4.desc": {
    en: "Why most digital transformation never reaches the customer — and how behavioral science turns technology investments into experiences people notice and pay for.",
    de: "Warum digitale Transformation beim Kunden oft nicht ankommt — und wie Verhaltenswissenschaft aus Technologie-Investitionen Erlebnisse macht, die Kunden wahrnehmen und honorieren.",
    nl: "Waarom digitale transformatie de klant vaak niet bereikt — en hoe gedragswetenschap technologie-investeringen omzet in ervaringen die klanten opmerken en waarderen.",
  },
  "speaking.5.title": {
    en: "Evidence Over Hype: Inside the Open Science Movement",
    de: "Evidenz statt Hype: Einblick in Open Science",
    nl: "Bewijs boven hype: de open science-beweging van binnenuit",
  },
  "speaking.5.desc": {
    en: "How open, transparent research separates real insight from noise — and how decision-makers can tell credible evidence from cherry-picked claims.",
    de: "Wie offene, transparente Forschung echte Erkenntnis von Rauschen trennt — und wie Entscheider glaubwürdige Evidenz von Rosinenpickerei unterscheiden.",
    nl: "Hoe open, transparant onderzoek echt inzicht van ruis scheidt — en hoe beslissers geloofwaardig bewijs onderscheiden van selectieve claims.",
  },

  "speaking.moreLink": {
    en: "All talks in detail \u2192",
    de: "Alle Vortr\u00e4ge im Detail \u2192",
    nl: "Alle lezingen in detail \u2192",
  },
  "speakingPage.heading": {
    en: "Keynote Speaking",
    de: "Keynotes & Vortr\u00e4ge",
    nl: "Keynotes & lezingen",
  },
  "speakingPage.intro": {
    en: "Research-backed keynotes on AR, VR, AI, and consumer behavior \u2014 for conferences, leadership summits, and corporate events. On stage or online, in English or German.",
    de: "Forschungsbasierte Keynotes zu AR, VR, KI und Konsumentenverhalten \u2014 f\u00fcr Konferenzen, Leadership-Summits und Firmenevents. Auf der B\u00fchne oder online, auf Englisch oder Deutsch.",
    nl: "Op onderzoek gebaseerde keynotes over AR, VR, AI en consumentengedrag \u2014 voor congressen, leadership summits en bedrijfsevenementen. Op het podium of online, in het Engels of Duits.",
  },
  "speakingPage.talksTitle": {
    en: "Signature Talks",
    de: "Signature Talks",
    nl: "Signature talks",
  },
  "speakingPage.tailored": {
    en: "Every talk is tailored to your audience and industry \u2014 and can be combined with a hands-on workshop or executive session on the same day.",
    de: "Jeder Vortrag wird auf Ihr Publikum und Ihre Branche zugeschnitten \u2014 und l\u00e4sst sich am selben Tag mit einem Workshop oder einer Executive Session kombinieren.",
    nl: "Elke lezing wordt afgestemd op uw publiek en branche \u2014 en is op dezelfde dag te combineren met een workshop of executive sessie.",
  },
  "speakingPage.crossLink": {
    en: "Also looking for consulting or executive education? \u2192",
    de: "Auch an Beratung oder Executive Education interessiert? \u2192",
    nl: "Ook op zoek naar advies of executive education? \u2192",
  },

  "speaking.bookingCta": {
    en: "For keynote bookings, please include the event date, expected audience size, and preferred topic in your message.",
    de: "F\u00fcr Keynote-Buchungen geben Sie bitte Veranstaltungsdatum, erwartete Teilnehmerzahl und gew\u00fcnschtes Thema in Ihrer Nachricht an.",
    nl: "Voor keynote-boekingen vermeld alstublieft de evenementdatum, verwacht publiek en gewenst onderwerp in uw bericht.",
  },
  "speaking.bookingBtn": { en: "Book a Keynote", de: "Keynote buchen", nl: "Keynote boeken" },

  // Consulting
  "consulting.eyebrow": { en: "Consulting", de: "Beratung", nl: "Advies" },
  "consulting.title": { en: "Advisory & Training", de: "Beratung & Training", nl: "Advies & Training" },
  "consulting.intro": {
    en: "I help organizations navigate the intersection of immersive technologies, AI, and consumer behavior \u2014 translating cutting-edge research into actionable strategy.",
    de: "Ich unterst\u00fctze Organisationen an der Schnittstelle von immersiven Technologien, KI und Konsumentenverhalten \u2014 und \u00fcbersetze Spitzenforschung in umsetzbare Strategien.",
    nl: "Ik help organisaties bij het navigeren van immersieve technologie\u00ebn, AI en consumentengedrag \u2014 en vertaal baanbrekend onderzoek naar uitvoerbare strategie.",
  },
  "consulting.workshops": { en: "Workshops & Masterclasses", de: "Workshops & Masterclasses", nl: "Workshops & Masterclasses" },
  "consulting.workshops.desc": {
    en: "Hands-on sessions that take your team from curiosity to a prioritized shortlist of AR, VR, and AI use cases — evidence-based and jargon-free.",
    de: "Praxisnahe Sessions, die Ihr Team von der Neugier zu einer priorisierten Shortlist von AR-, VR- und KI-Anwendungsfällen führen — evidenzbasiert und ohne Fachjargon.",
    nl: "Praktische sessies die uw team van nieuwsgierigheid naar een geprioriteerde shortlist van AR-, VR- en AI-toepassingen brengen — onderbouwd en zonder jargon.",
  },
  "consulting.training": { en: "In-Company Training & Executive Education", de: "Inhouse-Trainings & Executive Education", nl: "Incompany trainingen & Executive Education" },
  "consulting.training.desc": {
    en: "Programs for leadership teams and professionals — from MBA-level digital strategy to tailored in-company curricula, as delivered for Allianz, APG, and the Dutch Ministry of I&W.",
    de: "Programme für Führungsteams und Fachkräfte — von Digital Strategy auf MBA-Niveau bis zu maßgeschneiderten Inhouse-Curricula, u. a. für Allianz, APG und das NL-Infrastrukturministerium.",
    nl: "Programma's voor managementteams en professionals — van digital strategy op MBA-niveau tot incompany curricula op maat, zoals verzorgd voor Allianz, APG en het Ministerie van IenW.",
  },
  "consulting.advisory": { en: "Strategic Advisory on AR, VR, AI & Digital Transformation", de: "Strategische Beratung zu AR, VR, KI & digitale Transformation", nl: "Strategisch advies over AR, VR, AI & digitale transformatie" },
  "consulting.advisory.desc": {
    en: "Independent, research-grounded counsel on where immersive technologies and AI fit your strategy — and where they don't.",
    de: "Unabhängiger, forschungsgestützter Rat dazu, wo immersive Technologien und KI in Ihre Strategie passen — und wo nicht.",
    nl: "Onafhankelijk, op onderzoek gestoeld advies over waar immersieve technologie en AI in uw strategie passen — en waar niet.",
  },
  "consulting.clientsTitle": { en: "Past Clients", de: "Bisherige Kunden", nl: "Eerdere klanten" },
  "consulting.clients": {
    en: "Allianz \u00b7 APG \u00b7 Dutch Ministry of Infrastructure and Water Management \u00b7 Maastricht University MBA",
    de: "Allianz \u00b7 APG \u00b7 Niederl\u00e4ndisches Ministerium f\u00fcr Infrastruktur und Wasserwirtschaft \u00b7 Maastricht University MBA",
    nl: "Allianz \u00b7 APG \u00b7 Ministerie van Infrastructuur en Waterstaat \u00b7 Maastricht University MBA",
  },
  "consulting.cta": { en: "Discuss a Project", de: "Projekt besprechen", nl: "Project bespreken" },
  "consulting.moreLink": {
    en: "More about consulting \u2192",
    de: "Mehr zur Beratung \u2192",
    nl: "Meer over advies \u2192",
  },
  "consultingPage.heading": {
    en: "Consulting & Executive Education",
    de: "Beratung & Executive Education",
    nl: "Advies & executive education",
  },
  "consultingPage.crossLink": {
    en: "Looking for a keynote instead? \u2192",
    de: "Lieber eine Keynote buchen? \u2192",
    nl: "Liever een keynote boeken? \u2192",
  },

  // Newsletter
  "newsletter.eyebrow": { en: "Newsletter", de: "Newsletter", nl: "Nieuwsbrief" },
  "newsletter.title": {
    en: "From the lab to your inbox",
    de: "Aus dem Labor in Ihr Postfach",
    nl: "Van het lab naar uw inbox",
  },
  "newsletter.desc": {
    en: "Essays on what AR, VR, and AI actually do to customers and organizations \u2014 research-backed, hype-free.",
    de: "Essays dar\u00fcber, was AR, VR und KI bei Kunden und Organisationen wirklich bewirken \u2014 forschungsbasiert, ohne Hype.",
    nl: "Essays over wat AR, VR en AI echt doen met klanten en organisaties \u2014 onderbouwd door onderzoek, zonder hype.",
  },
  "newsletter.cta": {
    en: "Read on Substack",
    de: "Auf Substack lesen",
    nl: "Lees op Substack",
  },

  // Contact
  "contact.eyebrow": { en: "Contact", de: "Kontakt", nl: "Contact" },
  "contact.title": { en: "Get in Touch", de: "Kontakt aufnehmen", nl: "Neem contact op" },
  "contact.subtitle": {
    en: "Interested in research collaborations, speaking engagements, or consulting? Reach out.",
    de: "Interesse an Forschungskooperationen, Vorträgen oder Beratung? Schreiben Sie mir.",
    nl: "Geïnteresseerd in onderzoekssamenwerking, lezingen of advies? Neem contact op.",
  },
  "contact.name": { en: "Name", de: "Name", nl: "Naam" },
  "contact.namePlaceholder": { en: "Your name", de: "Ihr Name", nl: "Uw naam" },
  "contact.email": { en: "Email", de: "E-Mail", nl: "E-mail" },
  "contact.message": { en: "Message", de: "Nachricht", nl: "Bericht" },
  "contact.messagePlaceholder": {
    en: "Tell me about your event or project — a date, audience, and goal help me respond faster...",
    de: "Erzählen Sie mir von Ihrer Veranstaltung oder Ihrem Projekt — Datum, Publikum und Zielsetzung helfen mir, schneller zu antworten...",
    nl: "Beschrijf uw evenement of project — datum, doelgroep en doelstelling helpen mij sneller te reageren...",
  },
  "contact.interest": { en: "I'm interested in", de: "Ich interessiere mich für", nl: "Ik ben geïnteresseerd in" },
  "contact.interest.placeholder": { en: "Select a topic...", de: "Bitte auswählen...", nl: "Maak een keuze..." },
  "contact.interest.keynote": { en: "Keynote speaking", de: "Keynote / Vortrag", nl: "Keynote / lezing" },
  "contact.interest.workshop": { en: "Corporate workshop or masterclass", de: "Workshop oder Masterclass", nl: "Workshop of masterclass" },
  "contact.interest.consulting": { en: "Strategic consulting", de: "Strategische Beratung", nl: "Strategisch advies" },
  "contact.interest.execed": { en: "Executive education", de: "Executive Education", nl: "Executive education" },
  "contact.interest.research": { en: "Research collaboration", de: "Forschungskooperation", nl: "Onderzoekssamenwerking" },
  "contact.interest.other": { en: "Something else", de: "Etwas anderes", nl: "Iets anders" },
  "contact.gdpr": {
    en: "I agree to the <a>Privacy Policy</a> and consent to my data being used to respond to my inquiry.",
    de: "Ich stimme der <a>Datenschutzerklärung</a> zu und willige ein, dass meine Daten zur Beantwortung meiner Anfrage verwendet werden.",
    nl: "Ik ga akkoord met het <a>Privacybeleid</a> en geef toestemming dat mijn gegevens worden gebruikt om op mijn verzoek te reageren.",
  },
  "contact.send": { en: "Send Message", de: "Nachricht senden", nl: "Bericht verzenden" },
  "contact.sending": { en: "Sending...", de: "Wird gesendet...", nl: "Verzenden..." },
  "contact.thanks": { en: "Thank you!", de: "Vielen Dank!", nl: "Dank u!" },
  "contact.thanksSub": {
    en: "Your message has been sent. I'll get back to you soon.",
    de: "Ihre Nachricht wurde gesendet. Ich melde mich in Kürze.",
    nl: "Uw bericht is verzonden. Ik neem snel contact met u op.",
  },
  "contact.sendAnother": { en: "Send another message", de: "Weitere Nachricht senden", nl: "Nog een bericht sturen" },
  "contact.error": {
    en: "Something went wrong. Please try again.",
    de: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    nl: "Er is iets misgegaan. Probeer het opnieuw.",
  },
  "contact.office": { en: "Office", de: "Büro", nl: "Kantoor" },

  // Projects page
  "projects.heading": { en: "Projects", de: "Projekte", nl: "Projecten" },
  "projects.intro": {
    en: "Experimental tools and platforms I have contributed to or built \u2014 focused on research, education, and MBA workshops. None of these are commercial products. If you have questions or suggestions, feel free to reach out via the contact page or through the project websites directly.",
    de: "Experimentelle Tools und Plattformen, zu denen ich beigetragen oder die ich entwickelt habe \u2014 mit Fokus auf Forschung, Lehre und MBA-Workshops. Keines davon ist ein kommerzielles Produkt. Bei Fragen oder Anregungen k\u00f6nnen Sie mich gerne \u00fcber die Kontaktseite oder direkt \u00fcber die Projektwebsites erreichen.",
    nl: "Experimentele tools en platforms waaraan ik heb bijgedragen of die ik heb gebouwd \u2014 gericht op onderzoek, onderwijs en MBA-workshops. Geen van deze zijn commerci\u00eble producten. Bij vragen of suggesties kunt u contact opnemen via de contactpagina of rechtstreeks via de projectwebsites.",
  },
  "projects.eyebrow": { en: "Featured", de: "Ausgew\u00e4hlt", nl: "Uitgelicht" },
  "projects.sectionTitle": { en: "Live Products", de: "Live-Produkte", nl: "Live producten" },
  "projects.ai2ai.title": { en: "AI2AI-Chat", de: "AI2AI-Chat", nl: "AI2AI-Chat" },
  "projects.ai2ai.desc": {
    en: "Put two AI models in conversation with each other. Configure GPT, Claude, Gemini, or Mistral with independent prompts, then watch them negotiate, debate, or brainstorm \u2014 and export everything as CSV. Used in research, MBA workshops, and business strategy testing.",
    de: "Zwei KI-Modelle miteinander ins Gespr\u00e4ch bringen. GPT, Claude, Gemini oder Mistral mit eigenen Prompts konfigurieren, dann Verhandlungen, Debatten oder Brainstormings beobachten \u2014 und alles als CSV exportieren. Eingesetzt in Forschung, MBA-Workshops und Strategietests.",
    nl: "Laat twee AI-modellen met elkaar in gesprek gaan. Configureer GPT, Claude, Gemini of Mistral met onafhankelijke prompts, kijk hoe ze onderhandelen, debatteren of brainstormen \u2014 en exporteer alles als CSV. Gebruikt in onderzoek, MBA-workshops en strategietests.",
  },
  "projects.scholarfolio.title": { en: "ScholarFolio", de: "ScholarFolio", nl: "ScholarFolio" },
  "projects.scholarfolio.desc": {
    en: "Turn any Google Scholar profile into an interactive research portfolio. Visualize citation trends, collaboration networks, and publication timelines with a single URL. Features h-index tracking, co-author graphs, and exportable analytics.",
    de: "Jedes Google-Scholar-Profil in ein interaktives Forschungsportfolio verwandeln. Zitationstrends, Kooperationsnetzwerke und Publikationszeitlinien mit einer einzigen URL visualisieren. Mit h-Index-Tracking, Co-Autoren-Grafiken und exportierbarer Analytik.",
    nl: "Zet elk Google Scholar-profiel om in een interactief onderzoeksportfolio. Visualiseer citatietrends, samenwerkingsnetwerken en publicatietijdlijnen met \u00e9\u00e9n URL. Met h-index-tracking, co-auteurgrafieken en exporteerbare analyses.",
  },
  "projects.researchchat.title": { en: "ResearchChatAI", de: "ResearchChatAI", nl: "ResearchChatAI" },
  "projects.researchchat.desc": {
    en: "A fully customizable chatbot platform that allows you to set up and conduct studies with sophisticated AI agents without coding experience. Let participants interact with chatbots while maintaining full control over the AI agent, conditions, and participants\u2019 message data.",
    de: "Eine vollst\u00e4ndig anpassbare Chatbot-Plattform, mit der Sie Studien mit anspruchsvollen KI-Agenten ohne Programmiererfahrung einrichten und durchf\u00fchren k\u00f6nnen. Lassen Sie Teilnehmer mit Chatbots interagieren und behalten Sie die volle Kontrolle \u00fcber den KI-Agenten, Bedingungen und Nachrichtendaten.",
    nl: "Een volledig aanpasbaar chatbotplatform waarmee u studies kunt opzetten en uitvoeren met geavanceerde AI-agenten zonder programmeerervaring. Laat deelnemers interacteren met chatbots terwijl u volledige controle behoudt over de AI-agent, condities en berichtgegevens.",
  },
  "projects.back": { en: "Back to Home", de: "Zur\u00fcck zur Startseite", nl: "Terug naar home" },

  // A11y
  "a11y.switchLang": {
    en: "Switch language:",
    de: "Sprache wechseln:",
    nl: "Taal wijzigen:",
  },
  "a11y.newTab": {
    en: "(opens in new tab)",
    de: "(\u00f6ffnet in neuem Tab)",
    nl: "(opent in nieuw tabblad)",
  },

  // Footer
  "footer.rights": { en: "All rights reserved.", de: "Alle Rechte vorbehalten.", nl: "Alle rechten voorbehouden." },
  "footer.impressum": { en: "Impressum & Privacy", de: "Impressum & Datenschutz", nl: "Impressum & Privacy" },

  // Impressum / Privacy dialog (links are marked as <a>label</a> and split at render time)
  "legal.close": { en: "Close", de: "Schließen", nl: "Sluiten" },
  "legal.responsible": {
    en: "Responsible for content",
    de: "Verantwortlich für den Inhalt",
    nl: "Verantwoordelijk voor de inhoud",
  },
  "legal.countryNL": { en: "The Netherlands", de: "Niederlande", nl: "Nederland" },
  "legal.contact": { en: "Contact", de: "Kontakt", nl: "Contact" },
  "legal.contactForm": {
    en: "Or use the <a>contact form</a> on this website.",
    de: "Oder nutzen Sie das <a>Kontaktformular</a> auf dieser Website.",
    nl: "Of gebruik het <a>contactformulier</a> op deze website.",
  },
  "legal.privacyNotice": {
    en: "Privacy Notice",
    de: "Datenschutzerklärung",
    nl: "Privacyverklaring",
  },
  "legal.controller": {
    en: "Data controller",
    de: "Verantwortlicher",
    nl: "Verwerkingsverantwoordelijke",
  },
  "legal.formTitle": {
    en: "Contact form / Formspree",
    de: "Kontaktformular / Formspree",
    nl: "Contactformulier / Formspree",
  },
  "legal.formText": {
    en: "When you submit the contact form, your name, email address, and message are transmitted to <a>Formspree Inc.</a> (US) for processing and forwarded to me by email. Legal basis: Art. 6(1)(a) GDPR (your consent, given via the consent checkbox on the form). Formspree is US-based; the transfer is covered by Standard Contractual Clauses (Art. 46 GDPR). Form submissions are retained for the duration of correspondence and then deleted. Formspree retains data per their own privacy policy.",
    de: "Wenn Sie das Kontaktformular absenden, werden Ihr Name, Ihre E-Mail-Adresse und Ihre Nachricht zur Verarbeitung an <a>Formspree Inc.</a> (USA) übermittelt und per E-Mail an mich weitergeleitet. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Ihre Einwilligung über die Checkbox im Formular). Formspree hat seinen Sitz in den USA; die Übermittlung erfolgt auf Grundlage von Standardvertragsklauseln (Art. 46 DSGVO). Formulareinsendungen werden für die Dauer der Korrespondenz gespeichert und danach gelöscht. Formspree speichert Daten gemäß eigener Datenschutzerklärung.",
    nl: "Wanneer u het contactformulier verzendt, worden uw naam, e-mailadres en bericht ter verwerking doorgegeven aan <a>Formspree Inc.</a> (VS) en per e-mail naar mij doorgestuurd. Rechtsgrondslag: art. 6 lid 1 sub a AVG (uw toestemming via het toestemmingsvakje in het formulier). Formspree is gevestigd in de VS; de doorgifte is gedekt door standaardcontractbepalingen (art. 46 AVG). Formulierinzendingen worden bewaard voor de duur van de correspondentie en daarna verwijderd. Formspree bewaart gegevens volgens haar eigen privacybeleid.",
  },
  "legal.hosting": { en: "Hosting", de: "Hosting", nl: "Hosting" },
  "legal.hostingText": {
    en: "This website is hosted on Vercel (Vercel Inc., US). Server logs may record IP addresses in accordance with Vercel's <a>privacy statement</a>.",
    de: "Diese Website wird bei Vercel (Vercel Inc., USA) gehostet. Server-Logs können IP-Adressen gemäß der <a>Datenschutzerklärung</a> von Vercel erfassen.",
    nl: "Deze website wordt gehost bij Vercel (Vercel Inc., VS). Serverlogs kunnen IP-adressen registreren conform de <a>privacyverklaring</a> van Vercel.",
  },
  "legal.cookies": {
    en: "No cookies or tracking",
    de: "Keine Cookies oder Tracking",
    nl: "Geen cookies of tracking",
  },
  "legal.cookiesText": {
    en: "This website uses no cookies, analytics, or third-party tracking. Language preference is stored in localStorage (functional, exempt from consent requirements).",
    de: "Diese Website verwendet keine Cookies, keine Analyse-Tools und kein Tracking durch Dritte. Die Spracheinstellung wird im localStorage gespeichert (funktional, nicht einwilligungspflichtig).",
    nl: "Deze website gebruikt geen cookies, analytics of tracking door derden. De taalvoorkeur wordt opgeslagen in localStorage (functioneel, vrijgesteld van toestemmingsvereisten).",
  },
  "legal.rights": { en: "Your rights", de: "Ihre Rechte", nl: "Uw rechten" },
  "legal.rightsText": {
    en: "Under the GDPR (Art. 15–21), you have the right to access, rectification, erasure, restriction of processing, data portability, and objection. To exercise these rights, please contact me via email or the contact form above.",
    de: "Nach der DSGVO (Art. 15–21) haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Zur Ausübung dieser Rechte kontaktieren Sie mich bitte per E-Mail oder über das Kontaktformular.",
    nl: "Op grond van de AVG (art. 15–21) heeft u recht op inzage, rectificatie, verwijdering, beperking van de verwerking, gegevensoverdraagbaarheid en bezwaar. Neem hiervoor contact met mij op per e-mail of via het contactformulier.",
  },
  "legal.complain": { en: "Right to complain", de: "Beschwerderecht", nl: "Klachtrecht" },
  "legal.complainText": {
    en: "You have the right to lodge a complaint with the <a>Autoriteit Persoonsgegevens</a> or your local supervisory authority.",
    de: "Sie haben das Recht, Beschwerde bei der <a>Autoriteit Persoonsgegevens</a> (niederländische Datenschutzbehörde) oder Ihrer lokalen Aufsichtsbehörde einzulegen.",
    nl: "U heeft het recht een klacht in te dienen bij de <a>Autoriteit Persoonsgegevens</a> of uw lokale toezichthouder.",
  },
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const detected = detectLocale();
    setLocaleState(detected);
    document.documentElement.lang = detected;
    setMounted(true);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[locale] ?? entry.en ?? key;
    },
    [locale],
  );

  // Prevent flash of wrong language
  if (!mounted) {
    return <I18nContext.Provider value={{ locale: "en", setLocale, t: (key) => translations[key]?.en ?? key }}>{children}</I18nContext.Provider>;
  }

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  nl: "NL",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  nl: "Nederlands",
};
