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
  "terminal.line.1": { en: 'role: "Assistant Professor of Marketing"', de: 'Rolle: "Assistant Professor für Marketing"', nl: 'functie: "Assistant Professor Marketing"' },
  "terminal.line.2": { en: 'affiliation: "Maastricht University, SBE"', de: 'Universität: "Maastricht University, SBE"', nl: 'universiteit: "Maastricht University, SBE"' },
  "terminal.line.3": { en: 'labs: ["DEXLab", "LIT Network"]', de: 'Labs: ["DEXLab", "LIT Network"]', nl: 'labs: ["DEXLab", "LIT Network"]' },
  "terminal.line.4": { en: 'research: ["AR/VR", "AI", "Digital Marketing", "Consumer Behavior"]', de: 'Forschung: ["AR/VR", "KI", "Digitales Marketing", "Konsumentenverhalten"]', nl: 'onderzoek: ["AR/VR", "AI", "Digitale Marketing", "Consumentengedrag"]' },
  "terminal.line.5": { en: 'funding: "Marie Curie Fellow | €2.1M+ in competitive grants"', de: 'Förderung: "Marie-Curie-Stipendiat | €2,1 Mio.+ kompetitive Drittmittel"', nl: 'financiering: "Marie Curie Fellow | €2,1 mln.+ competitieve subsidies"' },
  "terminal.line.6": { en: 'awards: ["SBE Junior Researcher 2024", "Dean\'s Award UNSW"]', de: 'Auszeichnungen: ["SBE Junior Researcher 2024", "Dean\'s Award UNSW"]', nl: 'prijzen: ["SBE Junior Researcher 2024", "Dean\'s Award UNSW"]' },
  "terminal.line.7": { en: 'education: [', de: 'Ausbildung: [', nl: 'opleiding: [' },
  "terminal.line.8": { en: '  "PhD Digital Marketing @ UNSW",', de: '  "PhD Digital Marketing @ UNSW",', nl: '  "PhD Digital Marketing @ UNSW",' },
  "terminal.line.9": { en: '  "M.Sc. International Business: SCM @ Maastricht University",', de: '  "M.Sc. International Business: SCM @ Universität Maastricht",', nl: '  "M.Sc. International Business: SCM @ Universiteit Maastricht",' },
  "terminal.line.10": { en: '  "B.Sc. International Business @ Maastricht University"', de: '  "B.Sc. International Business @ Universität Maastricht"', nl: '  "B.Sc. International Business @ Universiteit Maastricht"' },
  "terminal.line.11": { en: ']', de: ']', nl: ']' },
  "terminal.line.12": { en: 'industry: ["Zalando", "Jimdo"]', de: 'Industrie: ["Zalando", "Jimdo"]', nl: 'industrie: ["Zalando", "Jimdo"]' },
  "terminal.line.13": { en: 'publications: "39 peer-reviewed articles | h-index 23"', de: 'Publikationen: "39 peer-reviewed Artikel | h-Index 23"', nl: 'publicaties: "39 peer-reviewed artikelen | h-index 23"' },

  // About bio
  "about.bio": {
    en: "Jonas Heller is an Assistant Professor of Marketing at Maastricht University\u2019s School of Business and Economics, where he directs DEXLab \u2014 a research lab specializing in immersive technologies, AI, and consumer neuroscience. He has secured over \u20AC2.1M in competitive research funding, published 39 peer-reviewed papers, and advises organizations ranging from Allianz to government ministries on the behavioral science of digital transformation. He speaks internationally on AR, VR, AI, and the future of human-technology interaction.",
    de: "Jonas Heller ist Assistant Professor f\u00fcr Marketing an der School of Business and Economics der Universit\u00e4t Maastricht, wo er das DEXLab leitet \u2014 ein Forschungslabor f\u00fcr immersive Technologien, KI und Konsumenten-Neurowissenschaften. Er hat \u00fcber 2,1 Mio. \u20AC an kompetitiven Forschungsmitteln eingeworben, 39 peer-reviewed Artikel ver\u00f6ffentlicht und ber\u00e4t Organisationen von Allianz bis zu Regierungsministerien zur Verhaltenswissenschaft der digitalen Transformation. Er h\u00e4lt international Vortr\u00e4ge \u00fcber AR, VR, KI und die Zukunft der Mensch-Technologie-Interaktion.",
    nl: "Jonas Heller is Assistant Professor Marketing aan de School of Business and Economics van de Universiteit Maastricht, waar hij DEXLab leidt \u2014 een onderzoekslab gespecialiseerd in immersieve technologie\u00ebn, AI en consumentenneurowetenschappen. Hij heeft meer dan \u20AC2,1 miljoen aan competitieve onderzoeksfinanciering verworven, 39 peer-reviewed artikelen gepubliceerd en adviseert organisaties van Allianz tot overheidsministeries over de gedragswetenschap van digitale transformatie. Hij spreekt internationaal over AR, VR, AI en de toekomst van mens-technologie-interactie.",
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
    en: "€2.1M+ Research Funding",
    de: "€2,1 Mio.+ Forschungsförderung",
    nl: "€2,1 mln.+ onderzoeksfinanciering",
  },
  "bento.b.desc": {
    en: "Secured competitive grants including Marie Curie, Comenius, NETSPAR, ERASMUS+, and international PhD funding from CSC and SACM.",
    de: "Kompetitive Drittmittel eingeworben, u.a. Marie Curie, Comenius, NETSPAR, ERASMUS+ sowie internationale PhD-Förderungen von CSC und SACM.",
    nl: "Competitieve subsidies verworven, waaronder Marie Curie, Comenius, NETSPAR, ERASMUS+ en internationale PhD-financiering van CSC en SACM.",
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
  "bento.f.title": { en: "39 Publications", de: "39 Publikationen", nl: "39 Publicaties" },
  "bento.f.desc": {
    en: "Published in journals including Journal of Retailing, Journal of Service Research, and Computers in Human Behavior.",
    de: "Veröffentlichungen u.a. in Journal of Retailing, Journal of Service Research und Computers in Human Behavior.",
    nl: "Gepubliceerd in o.a. Journal of Retailing, Journal of Service Research en Computers in Human Behavior.",
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
  "pub.citations": { en: "citations", de: "Zitationen", nl: "citaties" },

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
    en: "What a decade of lab and field studies says about immersive tech in retail and services — your audience leaves knowing which use cases create value and which are expensive gimmicks.",
    de: "Was ein Jahrzehnt Labor- und Feldforschung über immersive Technologien in Handel und Dienstleistung zeigt — Ihr Publikum erfährt, welche Anwendungsfälle Wert schaffen und welche teure Spielerei sind.",
    nl: "Wat tien jaar lab- en veldonderzoek leert over immersieve technologie in retail en dienstverlening — uw publiek weet daarna welke toepassingen waarde creëren en welke dure gimmicks zijn.",
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
    nl: "Bewijs boven hype: binnenin open science",
  },
  "speaking.5.desc": {
    en: "How open, transparent research separates real insight from noise — and how decision-makers can tell credible evidence from cherry-picked claims.",
    de: "Wie offene, transparente Forschung echte Erkenntnis von Rauschen trennt — und woran Entscheider glaubwürdige Evidenz von Rosinenpickerei unterscheiden.",
    nl: "Hoe open, transparant onderzoek echt inzicht van ruis scheidt — en hoe beslissers geloofwaardig bewijs herkennen tussen selectieve claims.",
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
  "consulting.training": { en: "In-Company Training & Executive Education", de: "Inhouse-Trainings & Executive Education", nl: "Incompany trainingen & Executive Education" },
  "consulting.advisory": { en: "Strategic Advisory on AR, VR, AI & Digital Transformation", de: "Strategische Beratung zu AR, VR, KI & digitale Transformation", nl: "Strategisch advies over AR, VR, AI & digitale transformatie" },
  "consulting.clientsTitle": { en: "Past Clients", de: "Bisherige Kunden", nl: "Eerdere klanten" },
  "consulting.clients": {
    en: "Allianz \u00b7 APG \u00b7 Dutch Ministry of Infrastructure and Water Management \u00b7 Maastricht University MBA",
    de: "Allianz \u00b7 APG \u00b7 Niederl\u00e4ndisches Ministerium f\u00fcr Infrastruktur und Wasserwirtschaft \u00b7 Maastricht University MBA",
    nl: "Allianz \u00b7 APG \u00b7 Ministerie van Infrastructuur en Waterstaat \u00b7 Maastricht University MBA",
  },
  "consulting.cta": { en: "Discuss a Project", de: "Projekt besprechen", nl: "Project bespreken" },

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

  // Footer
  "footer.rights": { en: "All rights reserved.", de: "Alle Rechte vorbehalten.", nl: "Alle rechten voorbehouden." },
  "footer.impressum": { en: "Impressum & Privacy", de: "Impressum & Datenschutz", nl: "Impressum & Privacy" },
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
    setLocaleState(detectLocale());
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
