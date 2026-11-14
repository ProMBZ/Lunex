# Portable Lunex website

This isolated handoff consolidates the current Lunex pages and browser components into one TypeScript page and moves the original visual rules into a locally scoped CSS Module. The original website in the repository root is untouched.

## File structure

```text
portable-website/
├── app/
│   ├── [[...slug]]/
│   │   ├── page.tsx
│   │   └── lunex.module.css
│   └── layout.tsx
├── next.config.mjs
├── package.json
├── three.d.ts
├── tsconfig.json
└── README.md
```

The main file `app/[[...slug]]/page.tsx` includes the hero, interactive Three.js Moon and procedural preview, starfield/meteors, cursor, reveal animations, navigation, project overview SVG, footer and the two original Coming Soon destination visuals. It serves:
- Standalone: `/`, `/presentation`, `/explorer`
- Host integration: `/website`, `/website/presentation`, `/website/explorer`

The CSS Module is derived from the current `app/globals.css`, but every rule is contained beneath its local `.root` class and every component class uses the `lunex-` prefix. It does not reset host `html`, `body` or theme CSS.

## Exact asset audit

As of the current `main` branch, these original binary assets are referenced by the code but are **not present in the tracked GitHub tree**:

| Purpose | Exact original local path | Host route path |
|---|---|---|
| Lunex logo/favicon | `public/favicon.png` | `public/website/favicon.png` |
| NASA LRO/LOLA GLB | `public/models/Moon_NASA_LRO_8k_Topo_Small.glb` | `public/website/models/Moon_NASA_LRO_8k_Topo_Small.glb` |

The Git ignore rules deliberately exclude `public/models/*.glb`. The favicon is referenced by the original root layout and navigation but is also absent from the current GitHub tree. Copy both from your existing local Lunex project. Do not replace them with generated assets. NASA source/reference: https://svs.gsfc.nasa.gov/14959/

For Vercel production, serving the 77.7 MB model from a **public Vercel Blob URL** is recommended instead of committing it to Git. Set `NEXT_PUBLIC_LUNEX_MOON_MODEL_URL` to the complete public URL in the appropriate Vercel project environment and redeploy. The browser scene uses that URL directly. The host must permit browser GET and byte-range requests. Documentation: https://vercel.com/docs/vercel-blob/public-storage and https://vercel.com/docs/limits.

Default model paths:
- Standalone: `/models/Moon_NASA_LRO_8k_Topo_Small.glb`
- Host: `/website/models/Moon_NASA_LRO_8k_Topo_Small.glb`

## Dependencies

Runtime dependencies required by the page:
- `three@0.187.0`
- Next.js, React and React DOM are the host framework.

No Tailwind, Framer Motion, icon package, UI library or original Node filesystem API route is needed. The `three.d.ts` file carries over the small Three.js declarations from the existing repository. If the host already uses `@types/three`, do not copy that declaration file.

---

# Guide A — Integrate into the existing Mission Explorer App Router project

This assumes the host is a Next.js App Router project. It adds a new page segment; it does not replace the Mission Explorer homepage or its shared files.

### 1. Back up the host project

Make a full copy or commit the current sister project before adding files.

### 2. Copy exactly two files

| Source in this handoff | Destination in the sister project |
|---|---|
| `app/[[...slug]]/page.tsx` | `app/website/[[...slug]]/page.tsx` |
| `app/[[...slug]]/lunex.module.css` | `app/website/[[...slug]]/lunex.module.css` |

If the host uses `src/app/`, the destinations become `src/app/website/[[...slug]]/page.tsx` and `src/app/website/[[...slug]]/lunex.module.css`.

Create the folders if needed. Never overwrite an existing file. If that exact route folder is already taken, choose a different unused path and update the `isWebsiteRoute` and `basePath` logic near the bottom of the copied page file from `/website` to your chosen prefix.

### 3. Copy the two original asset files

From the local original Lunex working folder:

| Source | Host destination |
|---|---|
| `public/favicon.png` | `public/website/favicon.png` |
| `public/models/Moon_NASA_LRO_8k_Topo_Small.glb` | `public/website/models/Moon_NASA_LRO_8k_Topo_Small.glb` |

Create these destination folders. Do not overwrite the Mission Explorer's root favicon or other public assets.

For Vercel, the GLB can instead be kept in public Blob storage; add `NEXT_PUBLIC_LUNEX_MOON_MODEL_URL` to the host project's Vercel environment variables, then redeploy.

### 4. Add Three.js only if missing

From the host project's root:

```powershell
npm ls three
```

If it is not installed:

```powershell
npm install three@0.187.0
```

Do not replace the host `package.json` or lockfile. Use the host's existing package manager.

If the host does not have Three.js type definitions, copy `three.d.ts` from this handoff to a folder included by its TypeScript config, such as `types/lunex-three.d.ts`. If it already includes `@types/three`, do not copy this file because duplicate declarations may conflict.

### 5. Protect existing files

Do **not** replace or modify for this integration:
- `app/page.tsx` / `src/app/page.tsx` (Mission Explorer root page)
- `app/layout.tsx` / `src/app/layout.tsx`
- `app/globals.css` / `src/app/globals.css`
- Existing backend/API routes, authentication, database logic and environment configuration
- Tailwind/PostCSS configuration
- Existing `package.json` and lockfile

Do not copy this package's standalone `app/layout.tsx`, `package.json`, `tsconfig.json` or `next.config.mjs` into the host.

**Layout caveat:** the host's root layout still wraps the new route. If it renders a global sidebar/header/footer, that shell may also appear around `/website`. The isolated page cannot remove a parent layout. Hiding host chrome for just this path would require a host-specific layout change; inspect the actual Mission Explorer project before making that decision. Do not replace the host root layout.

### 6. Run locally

Use the host project's normal commands. For npm:

```powershell
npm install
npm run dev
```

Open:
- `http://localhost:3000/website`
- `http://localhost:3000/website/presentation`
- `http://localhost:3000/website/explorer`

Also open the Mission Explorer's existing root route and test its main features.

### 7. Test and deploy

Run the host's existing TypeScript check and production build. Verify the model and favicon in the browser Network tab. Add the Blob URL environment variable in the host Vercel project's Production environment if using Blob, then redeploy.

---

# Guide B — Run independently from an empty Windows folder

### 1. Install Node.js

Install Node.js 22 LTS from https://nodejs.org/. The project needs Node.js 20.9 or newer; Node 22 matches the original repository's `.nvmrc` and CI version.

### 2. Copy this complete portable folder

Copy the contents of `integration/portable-website/` into your empty folder. Its root should contain `package.json`, `tsconfig.json`, `next.config.mjs`, `three.d.ts`, `README.md` and `app/`.

### 3. Add the original assets

Create:

```text
public/
├── favicon.png
└── models/
    └── Moon_NASA_LRO_8k_Topo_Small.glb
```

Copy both originals from your existing local Lunex project. They are not stored in the current GitHub tree, so this handoff cannot include them.

### 4. Install and run

Open PowerShell in the new folder:

```powershell
npm install
npm run dev
```

Open `http://localhost:3000/`, `http://localhost:3000/presentation` or `http://localhost:3000/explorer`.

### 5. Production check

```powershell
npm run check
npm run start
```

The procedural Moon preview appears immediately. It is upgraded to the detailed model after the original GLB loads. To load the model from Vercel Blob, create `.env.local` before building:

```text
NEXT_PUBLIC_LUNEX_MOON_MODEL_URL=https://your-actual-public-blob-url.glb
```

Replace that example with the URL supplied by your Blob store.

## Scope and validation

The currently active Lunex `/explorer` route in the original app is the Coming Soon design. The inactive Mission Explorer demonstrator source files are not part of the portable package.

The portable page retains the original active homepage, Moon scene, SVG overview, starfield, cursor, reveal behavior, navigation/footer and both active Coming Soon page designs. It removes the original server filesystem model API and uses the same GLB as a public static/Blob URL, making it suitable for a nested route without copying the filesystem API.

A production build and typecheck should be run by the included portable CI. Actual visual comparison and GLB/favicon browser verification require your local original binary assets and the sister project's actual repository; that host repository has not been supplied or modified here.
