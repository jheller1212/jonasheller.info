# jonasheller.info

Personal academic website for Dr. Jonas Heller — Tenured Assistant Professor of Marketing at Maastricht University, Co-Founder of DEXLab & LIT Network.

**Live:** [www.jonasheller.info](https://www.jonasheller.info)

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router, static export)
- TypeScript, Tailwind CSS
- Framer Motion & GSAP for animations
- Deployed via GitHub Pages with GitHub Actions

## Local development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Output is written to `out/` and deployed automatically on push to `main`.

## Project structure

```
src/
  app/
    page.tsx          # Home (hero, bento grid, publications, speaking, contact)
    cv/page.tsx       # Full curriculum vitae
    layout.tsx        # Root layout, metadata, JSON-LD
  components/
    Hero.tsx          # Animated hero section
    Bento.tsx         # Bento-grid about/stats section
    Publications.tsx  # Publication list (39 papers, Google Scholar links)
    Speaking.tsx      # Keynotes & workshops
    Contact.tsx       # Contact form (Formspree)
    Footer.tsx        # Footer with Impressum & Privacy notice
    Nav.tsx           # Navigation bar
    Terminal.tsx      # Terminal-style animation
    MagneticButton.tsx
    SmoothScroll.tsx
    ThemeProvider.tsx  # Light/dark theme toggle
public/
  CNAME             # Custom domain config
  favicon.svg       # Site favicon
  sitemap.xml       # Sitemap (home + CV)
  robots.txt
```

## License

Content (text, publications, biographical data) is owned by Jonas Heller. Code is available for reference.
