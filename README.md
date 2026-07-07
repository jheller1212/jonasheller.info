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
    layout.tsx            # Root layout, metadata, Person JSON-LD, skip link
    sitemap.ts            # Sitemap (all routes)
    opengraph-image.tsx   # Dynamic OG image (uses the .ttf fonts in src/app/)
  components/
    Hero.tsx              # Animated hero section
    Speaking.tsx          # Keynotes & workshops
    Consulting.tsx        # Advisory offering
    Bento.tsx             # Bento-grid research/impact section
    Publications.tsx      # Publication list (sort + type filter)
    Contact.tsx           # Contact form (Formspree)
    Footer.tsx            # Footer with Impressum & Privacy dialog
    Nav.tsx               # Navigation bar
    Terminal.tsx          # Terminal-style about animation
    MagneticButton.tsx
    SmoothScroll.tsx      # Lenis wiring
    ThemeProvider.tsx     # Light/dark theme toggle
  data/
    publications.ts       # Publication data (typed entries)
  lib/
    i18n.tsx              # EN/DE/NL translations (client-side)
public/
  robots.txt              # Points to /sitemap.xml
```

## License

Content (text, publications, biographical data) is owned by Jonas Heller. Code is available for reference.
