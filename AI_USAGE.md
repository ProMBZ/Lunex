# AI-use disclosure

This project used ChatGPT (GPT-6) as an AI coding assistant for code authoring, design-system implementation, Three.js integration, interaction design, documentation and test preparation.

## Human direction and review boundary

The project owner provided the challenge requirements, visual reference, original Liquid Glass navbar source, skill-installation commands, Moon model location and product direction. The V1 uses that material and keeps the product focused on the Lunar Landing Site Navigator challenge rather than reframing it as a generic SaaS product.

This document does not claim an independent code audit or scientific validation. Site and time interactions are demonstrator features. Live ephemeris, local DEM horizon, power and radio-link calculations are not connected.

## Supplied skill guidance studied and applied

- Tailwind Design System: CSS-first Tailwind v4 configuration, token hierarchy, reusable UI conventions, responsive layout and accessibility.
- Three.js fundamentals, loaders, lighting, materials, interaction, animation, textures and performance: NASA GLB loading, OrbitControls, controlled lighting, deterministic star field, load progress, visibility-aware rendering, GPU resource disposal and reduced-motion behavior.
- React View Transitions: shared Moon element across overview and Mission Explorer, persistent navigation isolation and route transition classes.
- React composition patterns: the navigation shell, map, Moon portal, timeline illustration, domain data and route composition are separated into reusable components.
- Web Artifacts Builder: interactive DOM/SVG artifacts for the polar coordinate plot, horizon diagrams, scenario comparisons and temporal control, rather than decorative images.
- Frontend Slides: chapter-led editorial storytelling and staged explanation across overview, challenge and methodology routes.
- Remotion best practices: motion staging, readability and reduced-motion guidance were reviewed. Remotion itself is not installed because V1 does not create or render video.
- Three.js asset-pipeline guidance: optimization approaches were reviewed. The source NASA GLB is kept intact; no destructive compression or geometry simplification has been applied.

## Skill installation status

The supplied skill instructions were successfully retrieved and read from their public source repositories through the connected GitHub source access. The local shell could not resolve GitHub / npm hosts during this run, so the user's npx skills add and curl installation commands did not complete in the shell environment. No successful local .claude skill installation is claimed.

## AI-generated media and scientific data

No AI-generated images, stock images, NASA photographs or generic placeholder photographs are intentionally included in the V1 website. The Moon is the actual NASA GLB when the local asset is present. Diagrams and the coordinate plot are authored SVG / CSS. Timeline marker motion is clearly labelled illustrative. Uncomputed scientific values remain explicitly marked not calculated.


## Build verification — 13 November 2026

GitHub Actions completed the following checks successfully on the V1 branch and the merged mainline source:
- Locked dependency installation with npm ci.
- TypeScript validation with tsc --noEmit.
- Next.js production build with next build.

The final merged commit is d28c88f7a14899caa774ca7783ff7560dbafc3d9. This verifies dependency resolution, TypeScript checks and production compilation. It does not replace a hands-on browser / mobile visual review or the local NASA GLB loading check; the GLB is intentionally not committed to Git.


## Interface refinement — 13 November 2026

ChatGPT assisted with the compact public-site redesign. The human project owner supplied the visual reference and detailed product constraints, selected the final direction and remains responsible for review and publication.

AI-assisted changes in this refinement:
- Replaced the multi-section homepage with a focused project introduction and existing Moon model.
- Replaced the in-use liquid navbar with a simple two-destination responsive navigation. The legacy Liquid Glass component remains unused; it is not rendered by the public routes.
- Added a lightweight Canvas starfield with reduced-motion handling, desktop pointer parallax, and page-visibility pause behavior.
- Reused the existing local NASA GLB API and Three.js loader; removed duplicate 3D scene stars and nonessential overlays so the Moon sits directly against the page background.
- Added Coming Soon / In Progress placeholder destinations for Landing Explorer and Presentation.
- Removed the former methodology and challenge pages from the public route set while retaining their source and scientific material in the repository history.
- Updated public route documentation and the AI-use record.

No new external imagery, generated media, third-party font service or runtime dependency was added. Browser/device visual QA and local GLB rendering still require confirmation on the owner's machine. A successful CI build is not a substitute for those checks.


## Project overview and interaction refinement — 13 November 2026

The public site now includes one Project Overview section directly after the existing hero, a four-column resource footer, refined Coming Soon / In Progress destination layouts, a subtle pointer halo for fine mouse input, improved navigation states, and a working return-to-top control.

The Project Overview describes what the current prototype actually contains. It distinguishes the location/map and scenario-control interface from scientific outputs that are not connected: live JPL Horizons ephemerides, local LOLA terrain-horizon calculations, power estimates, and radio-link windows. The overview illustration is authored SVG artwork; it is not NASA photography or a measured terrain scene.

The repository did not contain a shadcn Button component or a lucide-react dependency. A lightweight local Button primitive with shadcn-compatible \`variant\` and \`size\` props, plus a small local arrow-up SVG icon, was added to avoid an unnecessary package and lockfile change. The back-to-top action honors reduced motion. The custom cursor is a non-interactive halo; it does not replace the native pointer, is limited to fine mouse pointers, and is disabled for reduced motion / touch.

No team section, team biographies, external personal profiles, launch dates, or unsupported NASA/JPL calculation claims were added.


## Overview and transition-error refinement — 13 November 2026

The Project Overview was reorganized into a two-column introductory story and one connected three-step panel. The technical prototype-status note was removed from the visitor-facing section; the steps now use concise, connected descriptions. The existing global Moon hero and starfield were not redesigned.

The footer hierarchy was tightened, its back-to-top control remains a real button, and repeated family attribution was removed from the lower footer line. The custom cursor remains a decorative, pointer-events-none halo for mouse input only.

The site no longer mounts React \`ViewTransition\` around the live Moon portal or the page-transition wrapper. This avoids interrupted browser view transitions when a tab becomes hidden. The MoonScene, GLB loader, OrbitControls and navigation remain in place.


## Landing-page and navigator refinement — 14 November 2026

The new Lunex repository now contains the full application source. The landing page was refined around the user-requested flow: a direct navigator call to action, a 30-second interactive walkthrough, three workflow cards, traceable USGS reference locations, a source/methodology section, and project transparency. The walkthrough is an interactive UI guide rather than a video recording; it uses real catalogue coordinates and marks scientific outputs as not calculated.

The public `/explorer` route now renders the existing mission-explorer demonstrator rather than a Coming Soon placeholder. It supports named USGS reference-feature selection, custom coordinate input, date and UTC-hour selection, map / global-Moon views, scenario comparisons and an illustrative timeline. It does not calculate observer-specific ephemerides, terrain-aware illumination, Earth-visibility windows, electrical power or an RF link budget.

The starfield was refined with varied star sizes, a small number of restrained glints, pointer parallax, reduced-motion support and visibility-aware animation. Section reveals are enabled through the existing IntersectionObserver component. No external photographs, stock images, generated media, new runtime packages or new font services were added. The actual NASA GLB remains a local, uncommitted asset. Manual browser/device testing and local GLB verification remain necessary.

 
## Lunex identity and motion refinement — 14 November 2026

The public brand name is Lunex. The overview section now uses original vector artwork to explain lunar mission-planning factors without astronaut or satellite photographs. The diagram shows the relationship between a south-polar candidate location, the lunar horizon, sunlight and Earth-view context. Its status is explicitly illustrative and is not presented as a computed mission result.

The shared page shell now mounts the existing scroll-reveal and custom-cursor components. The starfield uses a larger deterministic star set, restrained twinkle, occasional shooting-star trails on desktop, pointer parallax, visibility-aware pausing and reduced-motion handling. The custom cursor is supplemental to the native pointer, limited to fine mouse pointers, and disabled for touch and reduced-motion preferences.

The navbar and its action-button styling were retained. Product naming, page metadata, project documentation and the footer were updated to Lunex. The only public image asset restored in this refinement is the previously supplied project favicon; astronaut and satellite imagery are not used by the landing page.
