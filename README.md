# Rohit Kumar — Portfolio

A cinematic, dark-themed developer portfolio built around a single JSON content file. The experience pairs deep-black surfaces and crimson light with GSAP scroll choreography, Framer Motion transitions, Lenis smooth scrolling, and a responsive, accessible layout.

## Highlights

- Premium black-and-crimson visual system with geometric grid, ambient glows and glass panels
- Animated hero intro, portrait stage with floating tech chips, and a magnetic CTA
- Infinite tech-stack marquee built from the resume-backed skills data
- About profile dossier with live counters, journey timeline and interests
- Featured project cards with local concept-preview artwork and honest coming-soon states
- Skills, education/certification timeline and “Why work with me” sections
- Client-side contact form using a prefilled `mailto:` message
- Custom cursor, 3D tilt cards, scroll progress, preloader and reduced-motion fallbacks
- Keyboard-friendly navigation, focus trapping in the mobile menu, skip link and visible focus states
- SEO metadata, Open Graph tags, JSON-LD person schema and a generated resume PDF
- All editable content lives in `src/data/portfolio.json`

## Tech Stack

- React 19 + Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite`) plus a custom CSS design system
- GSAP + ScrollTrigger
- Framer Motion
- Lenis smooth scrolling
- Lucide React and React Icons
- PDFKit for resume generation

## Getting Started

Requirements: Node.js 20.19+ or 22.12+ (Node 22 LTS recommended).

```bash
npm install
npm run dev
```

The local development server is started by Vite. Open the URL printed in the terminal, usually `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Editing Content

Portfolio copy and data are in [`src/data/portfolio.json`](src/data/portfolio.json). The file includes:

- `person` — name, role, availability, location, email, education summary and resume URL
- `nav` — desktop and mobile navigation
- `sections` — section indices, eyebrows, titles, accent phrases and descriptions
- `stats` — the four profile counters
- `aboutCards` and `journey` — About section supporting content
- `skills` — resume-backed skill names, categories, descriptions and icons
- `expertise` — grouped skill cards, including clear MERN-certification context
- `projects` — descriptions, tools, tags, preview images and optional links
- `education` — degrees, institutions, dates, scores and status
- `certification` — certification title, provider and note
- `interests` — six interest items
- `whyMe` — value-focused reasons to work together
- `contact` — form field labels
- `socials` — social links; entries with `url: null` render as disabled placeholders

Vite watches the JSON module and reloads the page after content changes. A full restart is only needed if you change Vite configuration.

### Portrait and project previews

The portrait is a swappable, local SVG placeholder:

- `public/portrait.svg` — replace with a real portrait (or update the path in the JSON/CSS) when available

Project preview images are also local SVG concept artwork:

- `public/projects/buzz-chat.svg`
- `public/projects/smart-billing.svg`

Replace those files with real screenshots (or update the `image` paths in the JSON) when they are available. Each project has `liveUrl` and `githubUrl` fields. They are currently `null`, so the UI shows disabled “coming soon” states. Set them to real URLs to enable the links.

### Social links

The GitHub profile links to `https://github.com/iim-rohit`. LinkedIn remains a disabled placeholder until a real profile URL is added. Update the `socials` entries in the JSON with real URLs to turn them into active links.

## Resume PDF

The resume is generated from the same JSON data and written to `public/Rohit-Kumar-Resume.pdf`.

```bash
npm run resume
```

The script lives at `scripts/generate-resume.mjs`. Run it again whenever the education, skills, projects, certification or contact details change. `npm run build` also regenerates the PDF automatically through the `prebuild` lifecycle script.

## Contact Form

The contact form has no backend. On submit it opens the visitor's email client with a prefilled `mailto:` message to the address in `portfolio.json`. No form data is stored or sent to a server. The email card in the contact section copies the address to the clipboard when possible.

## Accessibility and Motion

- A skip link jumps directly to the main content.
- Sections use labelled headings and navigation uses `aria-current`.
- The mobile menu locks background scrolling, traps focus, closes on `Escape` and restores focus.
- Custom cursor and tilt effects are limited to fine-pointer devices.
- `prefers-reduced-motion` disables the major entrance animations while keeping all content visible.
- Decorative ambient, portrait and cursor elements are hidden from assistive technology.

## Deployment

### Vercel or Netlify

Import the repository, use the default Node build environment and set:

- Build command: `npm run build`
- Output directory: `dist`

Both hosts detect Vite automatically.

### GitHub Pages

Set the Vite `base` option in `vite.config.mjs` to the repository path, then build and publish `dist/`. For a user/organization page deployed at the domain root, the default base is fine.

## Project Structure

```text
public/
  favicon.svg
  portrait.svg
  Rohit-Kumar-Resume.pdf
  projects/
    buzz-chat.svg
    smart-billing.svg
scripts/
  generate-resume.mjs
src/
  components/
  data/portfolio.json
  lib/
  styles/
    base.css
    sections.css
    responsive.css
  App.jsx
  main.jsx
  styles.css
index.html
vite.config.mjs
```

## License

MIT
