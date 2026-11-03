# Brian Mutunga — Engineering Portfolio

A responsive, editorial-style portfolio for presenting selected work across software engineering, systems, cybersecurity, networking, infrastructure, and scientific computing.

## Design direction

The site is designed as an engineering portfolio rather than a generic developer landing page:
- Distinctive editorial typography and a restrained paper / ink / signal-lime palette.
- A custom SVG systems map and original CSS/SVG project illustrations.
- Three featured case-study summaries followed by a concise technical index of six additional projects.
- Clear separation between demonstrations, source repositories, research prototypes, and validated capabilities.
- Responsive layouts, keyboard-visible focus, semantic landmarks, reduced-motion support, and accessible mobile navigation.

## Stack

- Semantic HTML
- Responsive CSS
- Small vanilla JavaScript navigation enhancement
- JSON-LD Person metadata, canonical / Open Graph metadata, sitemap, and robots directives
- Static deployment on Vercel

## Run locally

Serve this directory with any static file server:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy

The repository is configured for static deployment on Vercel from the repository root. No build command is required. The production domain in metadata is `https://brianmutunga.vercel.app/`.

## Accuracy and readiness notes

- Project descriptions intentionally distinguish prototypes, research work, demos, and validated capabilities.
- The RTOS project's physical hardware validation is separate from automated software tests.
- Chemistry Lab scientific outputs remain subject to documented model assumptions and independent validation.
- NETOPPS is a read-only-by-default local network operations toolkit, not a live network controller.
- Confirm contact details, credential links, and downloadable CV content before making additional claims.
- Do not add unverified job titles, customer claims, performance metrics, certifications, or project outcomes.

## Accessibility and testing

The page includes a skip link, semantic landmarks, accessible mobile navigation state, visible keyboard focus, and reduced-motion handling. These implementation features are not a substitute for automated accessibility tooling or manual screen-reader and cross-browser testing.

## License

Unless a separate license is added, all rights to this personal portfolio content remain with its author.
