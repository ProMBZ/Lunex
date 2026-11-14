# Lunex handoff for an existing Next.js project

## One download

Download the repository ZIP from the exact tested source commit:

https://github.com/ProMBZ/Lunex/archive/refs/heads/main.zip

This is one file to transfer. Extract it once and keep the internal folders intact. Do not paste the entire application into a single TSX file: Next.js needs separate route, layout, stylesheet and API files.

## Important when merging into an existing project

Lunex uses the Next.js App Router. If the destination is already a Next.js App Router project, merge the source folders and files from the archive. Do not blindly overwrite the destination's existing `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, or `package.json`; those may already contain the Mission Nextdoor application. Merge the Lunex page/layout styles and dependencies into the existing files, or the current home page may be replaced.

The current Lunex home page imports the following source:
- `app/page.tsx`, `app/layout.tsx`, and `app/globals.css`
- all files in `app/components/`
- `app/api/moon-model/route.ts`
- `components/mission/moon-portal.tsx`
- `lib/mission-data.ts`
- `types/three.d.ts`

The destination pages also use `app/explorer/page.tsx` and `app/presentation/page.tsx`.

## Dependencies

Keep the destination project's existing Next.js and React versions if they are compatible. Add Three.js if it is not already installed:

```bash
npm install three
```

The TypeScript types and Next.js dependencies are included in Lunex's `package.json`; merge missing dependencies rather than replacing the destination's full package manifest.

## NASA Moon model (separate optional download)

The 77.7 MB NASA global Moon model is intentionally not stored in Git. Without it, the site still shows its lightweight Moon preview. To load the high-detail model, from the Lunex project root run:

```bash
npm run model:download
npm run model:verify
```

This places the file at:

`public/models/Moon_NASA_LRO_8k_Topo_Small.glb`

NASA source: https://svs.gsfc.nasa.gov/14959/

The model is for global orientation, not a local south-pole DEM or landing-safety calculation.

## Logo asset note

The repository currently does not contain `public/favicon.png`, although the header, footer and metadata still reference it. Bring that file from the original local project if it is available, or replace those references with the destination project's logo. It is not part of the ZIP.

## Local run

```bash
npm ci
npm run dev
```

For an existing Mission Nextdoor app, use its own package manager lockfile and merge only the missing dependencies. Test the merged app with:

```bash
npx tsc --noEmit
npm run build
```
