# Brian Mutunga — Portfolio

Responsive, accessible static portfolio presenting selected software engineering and systems projects.

## Stack
- Semantic HTML
- CSS with responsive layouts, keyboard focus styles, and reduced-motion support
- Small vanilla JavaScript navigation enhancement
- JSON-LD Person metadata, canonical/ Open Graph metadata, sitemap, and robots directives

## Run locally
Serve this directory with any static file server. For example:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy
The site can be deployed as a static site on Vercel with the repository root as the root directory and no build command. The production domain in metadata currently points to `https://brianmutunga.vercel.app/`.

## Accuracy and readiness notes
- Project descriptions intentionally distinguish exploratory prototypes from certified or production-validated products.
- The RTOS project's physical hardware validation is separate from software tests.
- ShuleLedger requires school-level acceptance, security review, and backup/restore drills before production accounting use.
- Confirm contact details, credential links, and any downloadable CV before advertising them as verified.
- Do not add unverified job titles, customer claims, performance metrics, certifications, or project outcomes.

## Accessibility and testing
The page includes a skip link, semantic landmarks, accessible mobile navigation state, visible keyboard focus, and reduced-motion handling. These are implementation features, not a substitute for automated accessibility tooling or manual screen-reader and cross-browser testing.

## License
Unless a separate license is added, all rights to this personal portfolio content remain with its author.
