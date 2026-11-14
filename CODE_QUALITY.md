# Engineering and judging principles

LunaPath is designed as a transparent, maintainable decision-support prototype, not a cinematic mockup pretending to be a validated mission system. Preserve these principles in every page and future feature.

## 1. Scientific honesty and traceability

- Identify the origin of each dataset, image, model and external service in `SOURCES.md`.
- Label information as NASA source data, application calculation, schematic illustration or demo value.
- Show units, coordinate frame, time convention, spatial coverage, resolution and uncertainty wherever they affect interpretation.
- Use the global Moon model for orientation only. It is not a replacement for a local south-pole elevation model or terrain-horizon calculation.
- Separate geometric Sun/Earth direction from terrain obstruction. Do not infer sunlight duration, power yield, radio availability or landing safety from an unvalidated visual.
- Never invent site scores, visibility percentages, measurements or scientific certainty to make a screen look complete.

## 2. Clear product architecture

- Keep pages focused: overview, explorer, methodology and challenge context each serve a distinct user question.
- Prefer small reusable components over duplicated markup or a monolithic page.
- Keep browser-only APIs and Three.js rendering inside client components. Keep metadata, static structure and explanatory content server-renderable where possible.
- Isolate data acquisition and asset setup from presentation. Keep future backend integration behind normalized interfaces rather than scattering API calls through components.
- When real mission analysis is connected, one selected timestamp and one declared source of truth must drive every synchronized visualization.

## 3. Resilience and performance

- Treat WebGL, the large Moon model and remote imagery as optional enhancements. Explain missing assets or unavailable browser capabilities instead of crashing or showing a misleading blank scene.
- Do not download large models automatically during ordinary development startup. Provide explicit, resumable setup instructions.
- Keep large third-party binaries out of Git. Document their source, expected path, validation and setup command.
- Dispose of Three.js geometries, materials, textures, controls, observers and animation frames when client components unmount.
- Avoid unnecessary animation work when a scene is off-screen or the document is hidden.

## 4. Accessibility and responsive design

- Use semantic headings, landmarks, labels and descriptive alternative text.
- Support keyboard navigation and visible focus states.
- Respect `prefers-reduced-motion`; animation must never be the only way to access information.
- Preserve readability and core functionality on narrow screens and touch devices. Do not rely on hover as the only interaction.
- Provide loading, missing-asset, error and no-data states with clear language.

## 5. Security and dependency hygiene

- Never commit API keys, credentials, personal data, `.env` files or downloaded private material.
- Keep `.env.example` limited to variable names and safe placeholders.
- Pin direct dependency versions and commit the package lockfile.
- Review dependency licenses and security advisories; keep third-party notices separate from the project source-code license.
- Do not copy NASA logos, flags, mission identifiers or trademarks into AI-generated material.

## 6. Reproducibility and quality gates

The initial publication was validated on a clean GitHub Actions runner on **13 November 2026**. The archive integrity checks passed, a lockfile was generated, `npm ci` passed and `npm run build` passed. The build emitted one non-fatal Next.js tracing warning for dynamic filesystem lookup in `app/api/moon-model/route.js`.

Before calling the site fully ready for judging, the team must still complete and record:

1. Independent human code review and source/API behavior review.
2. `npm run doctor` with the local NASA GLB present; verify the missing-model fallback separately.
3. Manual route checks for `/`, `/explorer`, `/methodology` and `/challenge`.
4. Desktop, tablet and phone layout checks, including keyboard navigation and reduced-motion mode.
5. Network checks for missing images, failed requests, browser console errors and API failures.
6. Review of all facts, references, licenses, limitations and AI disclosures.
7. Scientific validation before any real visibility, illumination or site-comparison metrics are presented as results.

A green production build is necessary but does not replace browser testing, human code review or scientific validation. The one-time publisher is not retained as a recurring CI workflow in this repository.

## Current implementation boundary

The current repository delivers a polished, multi-page front-end concept and NASA asset setup tooling. It is not yet connected to a validated lunar ephemeris/horizon backend. Continue to state this clearly until that backend and its test evidence exist.
