"use client";

/**
 * LUNEX — consolidated TSX handoff component.
 * Source snapshot: ProMBZ/Lunex main @ 833a3fd4e6372995c4bdd9a15930ea6191e089d4.
 *
 * Copy this single file as a reusable page component, or import its default
 * export from a destination app's app/page.tsx. It contains the visible page
 * components, Moon scene, shared header/footer, starfield, cursor and reveals.
 *
 * REQUIRED SUPPORT FILES (Next.js cannot combine these concerns into page.tsx):
 * - app/globals.css (all original styling)
 * - app/layout.tsx (global font setup: Inter, Public Sans and DM Mono)
 * - app/api/moon-model/route.ts (streams the local NASA GLB model)
 * - types/three.d.ts (Three.js TypeScript declarations used by this repo)
 *
 * EXACT ASSET REFERENCES:
 * - Favicon: /favicon.png (source code references this, but the file is absent
 *   from the current GitHub main branch; restore the original asset separately)
 * - Moon API: /api/moon-model
 * - Primary model: public/models/Moon_NASA_LRO_8k_Topo_Small.glb (~77.7 MB)
 * - Alternative model: public/models/Moon_NASA_LRO_8k_Topo.glb
 * - Model env var: LUNEX_MOON_MODEL (legacy LUNAPATH_MOON_MODEL also works)
 * - NASA source: https://svs.gsfc.nasa.gov/14959/
 *
 * The NASA binary is intentionally not stored in Git. Run:
 *   npm run model:download
 *   npm run model:verify
 *
 * The TSX file is a component module, not a replacement for Next.js routing,
 * the global stylesheet, root layout, or the server-only Moon-model API route.
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export const LUNEX_HOME_METADATA = {
  title: "Lunex — Explore the Moon",
  description: "Explore lunar south-polar locations, choose an observation time, and compare the questions that shape a lunar landing mission.",
};

export const LUNEX_ASSETS = {
  favicon: "/favicon.png",
  moonModelApi: "/api/moon-model",
  moonModelFile: "public/models/Moon_NASA_LRO_8k_Topo_Small.glb",
  moonModelAlternative: "public/models/Moon_NASA_LRO_8k_Topo.glb",
  modelEnvironmentVariable: "LUNEX_MOON_MODEL",
  legacyModelEnvironmentVariable: "LUNAPATH_MOON_MODEL",
  nasaSource: "https://svs.gsfc.nasa.gov/14959/",
};

export const LUNEX_REQUIRED_FILES = {
  globalStyles: "app/globals.css",
  rootLayout: "app/layout.tsx",
  moonModelApi: "app/api/moon-model/route.ts",
  threeTypeDeclarations: "types/three.d.ts",
  faviconAsset: "public/favicon.png",
  moonModelAsset: "public/models/Moon_NASA_LRO_8k_Topo_Small.glb",
};


function disposeNodeTree(root: THREE.Object3D): void {
  root.traverse((object: THREE.Object3D) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry.dispose();
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material: THREE.Material) => {
      Object.values(material).forEach((value: unknown) => {
        if (value instanceof THREE.Texture) value.dispose();
      });
      material.dispose();
    });
  });
}

function createPreviewMoon(): THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("A 2D canvas is unavailable for the Moon preview.");

  context.fillStyle = "#aeb4bb";
  context.fillRect(0, 0, canvas.width, canvas.height);

  let seed = 14959;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let index = 0; index < 520; index += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const radius = 5 + random() * 35;
    const gradient = context.createRadialGradient(
      x - radius * 0.22,
      y - radius * 0.22,
      radius * 0.08,
      x,
      y,
      radius
    );
    gradient.addColorStop(0, "rgba(76,82,91,.18)");
    gradient.addColorStop(.58, "rgba(115,122,132,.1)");
    gradient.addColorStop(.83, "rgba(225,228,232,.22)");
    gradient.addColorStop(1, "rgba(78,85,94,.05)");
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = gradient;
    context.fill();
  }

  for (let index = 0; index < 190; index += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const radius = 2 + random() * 11;
    context.beginPath();
    context.ellipse(x, y, radius * 1.35, radius, random() * Math.PI, 0, Math.PI * 2);
    context.strokeStyle = "rgba(72,78,87," + (0.07 + random() * 0.12) + ")";
    context.lineWidth = 1 + random() * 2;
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.16, 56, 40),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 1, metalness: 0 })
  );
  mesh.rotation.set(0.018, 0.16, -0.018);
  mesh.userData.isPreview = true;
  return mesh;
}

type SceneStatus = "checking" | "loading" | "ready" | "missing" | "load-error" | "webgl-error";
type MoonSceneProps = { compact?: boolean };
type ModelAvailability = { available: boolean };

export function MoonScene({ compact = false }: MoonSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<SceneStatus>("checking");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let resizeObserver: ResizeObserver;
    let intersectionObserver: IntersectionObserver;
    let disposed = false;
    let visible = true;
    let modelRoot: THREE.Group | null = null;
    let previewMoon: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> | null = null;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 4.45);

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        premultipliedAlpha: true
      });
    } catch {
      setStatus("webgl-error");
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.45));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.16;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "moon-canvas";
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute("aria-label", "Interactive three-dimensional Moon preview, upgraded to the NASA LRO and LOLA global Moon model when it finishes loading. Drag to rotate and use the scroll wheel or pinch to zoom. The global model is for orientation, not a local landing-site elevation model.");
    renderer.domElement.setAttribute("tabindex", "0");
    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x0B3D91, 1.08));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.05);
    keyLight.position.set(-4.3, 2.8, 4.5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x0B3D91, 0.24);
    fillLight.position.set(3.2, -1.8, -3.7);
    scene.add(fillLight);

    try {
      previewMoon = createPreviewMoon();
      scene.add(previewMoon);
    } catch {
      // The detailed model can still load if the lightweight preview cannot be created.
    }

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.045;
    controls.enablePan = false;
    controls.minDistance = 3.1;
    controls.maxDistance = 6;
    controls.rotateSpeed = 0.42;
    controls.zoomSpeed = 0.42;
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = 0.18;

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const draw = () => {
      if (disposed || !visible || document.visibilityState === "hidden") return;
      controls.update();
      renderer.render(scene, camera);
    };
    const resume = () => renderer.setAnimationLoop(draw);
    const pause = () => renderer.setAnimationLoop(null);
    intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && document.visibilityState === "visible") resume();
      else pause();
    }, { threshold: 0.01 });
    intersectionObserver.observe(host);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      controls.autoRotate = !reducedMotion;
    };
    motionQuery.addEventListener?.("change", onMotionChange);
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") pause();
      else if (visible) resume();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    resume();

    async function loadModel() {
      try {
        const check = await fetch("/api/moon-model?status=1", { cache: "no-store" });
        if (!check.ok) throw new Error("The local Moon model status check failed.");
        const availability = await check.json() as ModelAvailability;
        if (disposed) return;
        if (!availability.available) {
          setMessage("The NASA topographic model is not available in this runtime. The lightweight Moon preview remains available.");
          setStatus("missing");
          return;
        }

        setStatus("loading");
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync("/api/moon-model", (event: ProgressEvent) => {
          if (!disposed && event.total > 0) {
            setProgress(Math.min(99, Math.round(event.loaded / event.total * 100)));
          }
        });
        if (disposed) {
          disposeNodeTree(gltf.scene);
          return;
        }

        modelRoot = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(modelRoot);
        const center = bounds.getCenter(new THREE.Vector3());
        const size = bounds.getSize(new THREE.Vector3());
        const maxAxis = Math.max(size.x, size.y, size.z) || 1;
        modelRoot.position.sub(center);
        modelRoot.scale.setScalar(2.32 / maxAxis);
        modelRoot.rotation.set(0.018, 0.16, -0.018);
        modelRoot.traverse((object: THREE.Object3D) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.frustumCulled = true;
          object.castShadow = false;
          object.receiveShadow = false;
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material: THREE.Material) => {
            const surface = material as THREE.Material & { roughness?: number; metalness?: number };
            if (typeof surface.roughness === "number") surface.roughness = Math.max(surface.roughness, 0.84);
            if (typeof surface.metalness === "number") surface.metalness = 0;
            material.needsUpdate = true;
          });
        });
        scene.add(modelRoot);

        if (previewMoon) {
          scene.remove(previewMoon);
          previewMoon.geometry.dispose();
          previewMoon.material.map?.dispose();
          previewMoon.material.dispose();
          previewMoon = null;
        }

        setProgress(100);
        setStatus("ready");
      } catch (error) {
        if (!disposed) {
          setMessage(error instanceof Error ? error.message : "The browser could not load the local NASA GLB.");
          setStatus("load-error");
        }
      }
    }
    loadModel();

    return () => {
      disposed = true;
      pause();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      motionQuery.removeEventListener?.("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      controls?.dispose();
      disposeNodeTree(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [compact]);

  const hasError = status === "missing" || status === "load-error" || status === "webgl-error";
  const isLoading = status === "checking" || status === "loading";

  return (
    <div className={compact ? "moon-scene moon-scene-compact" : "moon-scene"} ref={hostRef}>
      {isLoading && (
        <div className="moon-load-indicator" role="status" aria-live="polite">
          <span className="scene-spinner" />
          <span className="moon-load-copy">
            <b>{status === "checking" ? "Moon preview ready" : "Loading NASA LRO / LOLA"}</b>
            <small>{status === "checking" ? "Preparing detailed surface data" : progress > 0 ? progress + "% transferred" : "Refining the global surface"}</small>
          </span>
          {status === "loading" && <span className="moon-load-progress"><i style={{ width: progress + "%" }} /></span>}
        </div>
      )}
      {hasError && (
        <div className={"moon-scene-state state-" + status} role="status">
          {status === "missing" ? (
            <>
              <b>Preview mode</b>
              <p>{message}</p>
              <code>public/models/Moon_NASA_LRO_8k_Topo_Small.glb</code>
            </>
          ) : (
            <>
              <b>3D scene unavailable</b>
              <p>{message}</p>
              <small>Check WebGL support and the local NASA GLB file.</small>
            </>
          )}
        </div>
      )}
    </div>
  );
}

type MoonPortalProps = { compact?: boolean; label?: string };

export function MoonPortal({ compact = false, label }: MoonPortalProps) {
  return (
    <div className={compact ? "moon-portal moon-portal-compact" : "moon-portal"}>
      {label && <span className="moon-portal-label">{label}</span>}
      <MoonScene compact={compact} />
    </div>
  );
}

const steps = [
  { number: "01", title: "Explore a region", description: "Inspect lunar south-polar locations and the coordinates that identify them." },
  { number: "02", title: "Set the observation time", description: "Choose a date and UTC hour to define the mission scenario you want to examine." },
  { number: "03", title: "Compare the conditions", description: "Review different places and times, and understand the factors a mission team must evaluate." },
];

function MissionSchematic() {
  return (
    <div className="mission-visual" role="img" aria-label="Illustrative lunar mission planning diagram showing a south-polar site in relation to the Sun, Earth, terrain and observation time.">
      <div className="mission-visual-top">
        <span><i aria-hidden="true" /> LUNEX / MISSION CONTEXT</span>
        <span>FIELD VIEW 01</span>
      </div>
      <div className="mission-visual-heading">
        <div><span>THE LUNAR SOUTH POLE</span><h3>One location. Many mission factors.</h3></div>
        <span className="mission-visual-index">01 — 03</span>
      </div>
      <svg className="mission-schematic" viewBox="0 0 720 430" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="lunex-moon-fill" x1="360" y1="210" x2="360" y2="430" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity=".2" /><stop offset="1" stopColor="#FFFFFF" stopOpacity=".035" />
          </linearGradient>
          <radialGradient id="lunex-earth-glow" cx="0" cy="0" r="1" gradientTransform="translate(552 112) rotate(90) scale(70)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity=".2" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <clipPath id="lunex-moon-clip"><circle cx="360" cy="432" r="205" /></clipPath>
        </defs>
        <g className="schematic-stars">
          <circle cx="76" cy="82" r="2.3" /><circle cx="200" cy="46" r="1.4" /><circle cx="310" cy="104" r="1.8" />
          <circle cx="440" cy="53" r="1.4" /><circle cx="640" cy="72" r="2" /><circle cx="674" cy="214" r="1.4" />
          <circle cx="106" cy="220" r="1.3" /><circle cx="237" cy="179" r="1.2" /><circle cx="596" cy="268" r="1.2" /><circle cx="493" cy="185" r="1.5" />
        </g>
        <path className="schematic-orbit schematic-orbit-white" d="M74 252C158 45 505 18 647 183C707 252 620 316 533 320" />
        <path className="schematic-orbit schematic-orbit-red" d="M112 290C159 117 443 46 592 174C650 225 600 282 538 306" />
        <path className="schematic-orbit-dash" d="M104 168C220 25 490 25 622 148" />
        <g className="schematic-sun" transform="translate(142 130)">
          <circle r="32" fill="#FC3D21" fillOpacity=".08" stroke="#FC3D21" strokeOpacity=".75" />
          <circle r="15" fill="#FC3D21" />
          <path d="M0 -26V-40M0 26V40M-26 0H-40M26 0H40M-18.4 -18.4L-28 -28M18.4 18.4L28 28M18.4 -18.4L28 -28M-18.4 18.4L-28 28" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <text x="142" y="190" textAnchor="middle" className="schematic-label">SUNLIGHT</text>
        <g className="schematic-earth" transform="translate(552 112)">
          <circle r="68" fill="url(#lunex-earth-glow)" />
          <circle r="39" fill="#0B3D91" stroke="#FFFFFF" strokeOpacity=".9" strokeWidth="1.5" />
          <path d="M-23 -11L-11 -28L2 -24L7 -12L20 -9L25 5L13 12L7 27L-9 25L-17 10L-28 4L-23 -11Z" fill="#FFFFFF" fillOpacity=".72" />
          <path d="M-31 -22C-15 -43 15 -48 33 -32M-35 17C-19 38 13 47 35 28" stroke="#FFFFFF" strokeOpacity=".55" strokeWidth="1" />
          <circle r="50" stroke="#FFFFFF" strokeOpacity=".2" strokeDasharray="2 7" />
        </g>
        <text x="552" y="173" textAnchor="middle" className="schematic-label">EARTH VIEW</text>
        <g clipPath="url(#lunex-moon-clip)">
          <circle cx="360" cy="432" r="205" fill="url(#lunex-moon-fill)" stroke="#FFFFFF" strokeOpacity=".88" strokeWidth="1.5" />
          <path d="M143 350L182 335L216 345L250 313L287 329L319 300L354 316L388 291L425 309L461 295L500 321L536 309L574 338" stroke="#FFFFFF" strokeOpacity=".34" strokeWidth="1.3" />
          <path d="M142 366L180 351L216 362L251 331L287 345L319 320L354 333L388 310L425 326L461 312L500 337L536 327L575 353V500H142V366Z" fill="#FFFFFF" fillOpacity=".09" />
          <path d="M145 366L183 351L218 362L252 331L288 345L320 320L354 333L389 310L425 326L461 312L500 337L536 327L575 353" stroke="#FFFFFF" strokeOpacity=".76" strokeWidth="1.7" />
          <path d="M210 391C274 366 434 364 510 394" stroke="#FC3D21" strokeOpacity=".8" strokeWidth="1.2" strokeDasharray="4 7" />
          <path d="M277 356L302 341L323 348L343 331M412 365L431 349L452 355L475 339" stroke="#FFFFFF" strokeOpacity=".3" strokeWidth="1" />
        </g>
        <path d="M360 270V309" stroke="#FC3D21" strokeWidth="1.4" strokeDasharray="3 5" />
        <circle cx="360" cy="315" r="7" fill="#FC3D21" stroke="#FFFFFF" strokeWidth="2" className="schematic-site-pulse" />
        <circle cx="360" cy="315" r="18" stroke="#FC3D21" strokeOpacity=".7" className="schematic-site-ring" />
        <path d="M371 309L414 286H488" stroke="#FC3D21" strokeWidth="1.2" />
        <text x="420" y="277" className="schematic-site-label">CANDIDATE SITE</text>
        <text x="420" y="294" className="schematic-small-label">SOUTH-POLAR REGION</text>
        <text x="360" y="417" textAnchor="middle" className="schematic-moon-label">LUNAR SURFACE</text>
      </svg>
      <div className="mission-factor-row">
        <div><span>01 / LOCATION</span><b>Site coordinates</b></div>
        <div><span>02 / TIME</span><b>Observation window</b></div>
        <div><span>03 / ENVIRONMENT</span><b>Terrain · Sun · Earth</b></div>
      </div>
      <div className="mission-visual-foot">
        <span>EXPLORE THE VARIABLES BEHIND A MISSION</span>
        <span>ILLUSTRATIVE CONTEXT · NOT A LANDING VERDICT</span>
      </div>
    </div>
  );
}

export function ProjectOverview() {
  return (
    <section className="overview-section" id="project-overview" aria-labelledby="overview-title">
      <div className="overview-shell">
        <div className="overview-copy" data-reveal="left">
          <p className="section-eyebrow"><span aria-hidden="true" />WHAT IS LUNEX?</p>
          <h2 id="overview-title">A clearer view of<br /><em>lunar mission planning.</em></h2>
          <p className="overview-lede">
            Lunex is an interactive mission-planning platform focused on the Moon’s south pole. It brings a 3D view of the lunar surface together with location data and observation-time controls, helping researchers and space explorers examine how place, terrain, sunlight and Earth visibility shape a mission scenario.
          </p>
          <p className="overview-supporting">
            Explore a region, set a time, and compare different scenarios. Lunex helps teams organize the questions behind a landing plan; mission decisions still depend on validated scientific and engineering analysis.
          </p>
          <div className="overview-steps">
            {steps.map((step, index) => (
              <article className="overview-step" key={step.number} data-reveal="up" style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}>
                <span className="overview-step-number">{step.number}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </article>
            ))}
          </div>
          <Link className="overview-link" href="/explorer"><span>Open Mission Explorer</span><span aria-hidden="true">↗</span></Link>
        </div>
        <div data-reveal="scale"><MissionSchematic /></div>
      </div>
    </section>
  );
}

export default function LunexPage() {
  return (
    <main id="main-content" className="home-page">
      <section className="hero-main" aria-labelledby="hero-title">
        <div className="hero-layout">
          <div className="hero-copy" data-reveal="left">
            <p className="hero-eyebrow">
              <span className="eyebrow-mark" aria-hidden="true" />
              LUNAR LANDING SITE NAVIGATOR
            </p>
            <h1 id="hero-title">
              Explore the Moon.
              <br />
              <span>Think beyond the landing.</span>
            </h1>
            <p className="hero-description">
              Lunex helps you explore places near the Moon’s south pole.
              Look around the Moon in 3D, choose a place and a time, and compare
              the details that matter when planning a mission.
            </p>

            <div className="hero-actions">
              <Link className="action-button action-button-primary" href="/explorer">
                <span>Open Mission Explorer</span>
                <span className="button-arrow" aria-hidden="true">↗</span>
              </Link>
              <Link className="action-button action-button-secondary" href="/presentation">
                <span className="button-play" aria-hidden="true">▶</span>
                <span>Watch 30 Seconds</span>
              </Link>
            </div>

            <div className="hero-proofline" aria-label="What Lunex brings together">
              <span>MOON IN 3D</span>
              <i aria-hidden="true" />
              <span>PLACE & TIME</span>
              <i aria-hidden="true" />
              <span>SCENARIO COMPARISON</span>
            </div>
            <p className="hero-footnote">
              One place to explore the surface, the sunlight and the view of Earth.
            </p>
          </div>

          <div className="moon-column" data-reveal="scale" aria-label="Interactive three-dimensional Moon model">
            <div className="moon-aura" aria-hidden="true" />
            <div className="moon-orbit moon-orbit-one" aria-hidden="true" />
            <div className="moon-orbit moon-orbit-two" aria-hidden="true" />
            <div className="moon-object">
              <MoonPortal compact />
            </div>
            <div className="moon-caption">
              <span>NASA LRO / LOLA</span>
              <i aria-hidden="true" />
              <span>GLOBAL MOON MODEL</span>
            </div>
          </div>
        </div>

        <a className="hero-scroll-cue" href="#project-overview">
          <span>DISCOVER LUNEX</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <ProjectOverview />
    </main>
  );
}

function PresentationVisual() {
  return (
    <div className="destination-art destination-art-presentation" aria-hidden="true">
      <div className="destination-planet" />
      <div className="destination-orbit destination-orbit-one" />
      <div className="destination-orbit destination-orbit-two" />
      <div className="destination-orbit destination-orbit-three" />
      <span className="destination-star destination-star-one" />
      <span className="destination-star destination-star-two" />
      <span className="destination-star destination-star-three" />
      <span className="destination-art-caption">LUNEX / 30 SECOND OVERVIEW</span>
    </div>
  );
}

function ExplorerVisual() {
  return (
    <div className="destination-art destination-art-explorer" aria-hidden="true">
      <div className="polar-visual-heading">
        <span>MISSION EXPLORER / 01</span>
        <span>POLAR REFERENCE GRID</span>
      </div>
      <div className="polar-radar">
        <div className="polar-radar-ring polar-radar-ring-outer" />
        <div className="polar-radar-ring polar-radar-ring-middle" />
        <div className="polar-radar-ring polar-radar-ring-inner" />
        <div className="polar-radar-cross polar-radar-cross-horizontal" />
        <div className="polar-radar-cross polar-radar-cross-vertical" />
        <div className="polar-radar-sweep" />
        <svg className="polar-terrain-lines" viewBox="0 0 420 420" fill="none">
          <path d="M37 219C66 168 84 172 111 190C132 204 145 155 181 162C218 170 227 120 262 128C296 137 315 179 342 164C364 152 381 164 394 188" />
          <path d="M28 244C59 201 83 202 111 215C143 229 154 183 185 188C221 194 232 145 269 152C302 158 317 199 349 184C368 175 384 185 397 204" />
          <path d="M49 274C81 241 93 236 124 245C151 253 166 218 194 222C227 226 244 184 273 187C306 190 327 221 350 210C369 201 384 210 392 225" />
          <path d="M73 302C99 275 125 270 145 278C171 287 183 257 207 259C240 261 252 228 282 229C308 230 328 249 348 240" />
          <path d="M105 329C127 310 145 304 163 310C189 319 201 290 226 290C249 290 270 268 291 271C313 274 327 286 342 280" />
          <path d="M38 145C69 125 89 126 111 139C139 156 154 122 184 122C216 122 226 91 260 95C286 98 301 126 328 117C352 109 374 119 391 139" />
        </svg>
        <div className="polar-site-marker"><span /><i /></div>
        <div className="polar-coordinate polar-coordinate-north">90° N</div>
        <div className="polar-coordinate polar-coordinate-west">90° W</div>
        <div className="polar-coordinate polar-coordinate-east">90° E</div>
        <div className="polar-coordinate polar-coordinate-south">90° S</div>
      </div>
      <div className="polar-visual-readout">
        <div><span>REFERENCE REGION</span><b>LUNAR SOUTH POLE</b></div>
        <div><span>LOCATION INPUT</span><b>LAT / LON</b></div>
        <div><span>SCENARIO</span><b>PLACE + TIME</b></div>
      </div>
      <span className="destination-art-caption">SITE CONTEXT / NOT A LIVE MAP</span>
    </div>
  );
}

type ComingSoonPageProps = { eyebrow: string; title: string; description: string; variant?: "presentation" | "explorer" };

export function ComingSoonPage({ eyebrow, title, description, variant = "presentation" }: ComingSoonPageProps) {
  const isExplorer = variant === "explorer";
  return (
    <main id="main-content" className="destination-page">
      <section className={isExplorer ? "destination-card destination-card-explorer" : "destination-card"} aria-labelledby="destination-title">
        <div className="destination-copy">
          <p className="destination-eyebrow"><span aria-hidden="true" />{eyebrow}</p>
          <div className="destination-status"><i aria-hidden="true" />COMING SOON</div>
          <h1 id="destination-title">{title}</h1>
          <p className="destination-description">{description}</p>
          <Link className="destination-back" href="/"><span aria-hidden="true">←</span>Back to Project Information</Link>
        </div>
        {isExplorer ? <ExplorerVisual /> : <PresentationVisual />}
      </section>
    </main>
  );
}


/** Tiny route exports for the two existing Coming Soon destinations. */
export function LunexExplorerPage() {
  return (
    <ComingSoonPage
      eyebrow="LUNEX / MISSION EXPLORER"
      title="Your next stop: the Moon."
      description="Explore lunar south-polar locations, define an observation scenario and compare the factors that mission teams need to study."
      variant="explorer"
    />
  );
}

export function LunexPresentationPage() {
  return (
    <ComingSoonPage
      eyebrow="LUNEX / QUICK INTRODUCTION"
      title="See the idea in 30 seconds."
      description="The short walkthrough is coming soon. It will show how Lunex brings lunar places, observation times and mission questions together."
    />
  );
}

/** Optional shell. Do not use when the host app's layout already renders it. */
export function LunexSiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Starfield />
      <CustomCursor />
      <RevealObserver />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}


export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="site-header">
      <div className="site-nav">
        <Link className="brand" href="/" aria-label="Lunex — Back to project information">
          <Image
            className="brand-logo"
            src="/favicon.png"
            alt=""
            width={44}
            height={44}
            priority
          />
          <span className="brand-name">LUNEX</span>
        </Link>

        <nav className="nav-actions" aria-label="Main navigation">
          {isHome ? (
            <>
              <Link className="nav-button nav-button-secondary" href="/presentation">
                <span className="nav-play" aria-hidden="true">▶</span>
                <span>Watch 30 Seconds</span>
              </Link>
              <Link className="nav-button nav-button-primary" href="/explorer">
                <span>Open Mission Explorer</span>
                <span className="nav-arrow" aria-hidden="true">↗</span>
              </Link>
            </>
          ) : (
            <Link className="nav-button nav-button-return" href="/">
              <span className="nav-return-arrow" aria-hidden="true">←</span>
              <span>Back to Project Information</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-identity">
          <Link className="footer-brand" href="/" aria-label="Lunex home">
            <Image src="/favicon.png" alt="" width={36} height={36} />
            <span>LUNEX</span>
          </Link>
          <p className="footer-credit">An interactive lunar mission-planning experience focused on the Moon’s south pole.</p>
        </div>
        <div className="footer-project-note">
          <span>NASA SPACE APPS CHALLENGE · 2026</span>
          <b>Built by AI Family, inspired by lunar exploration.</b>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/presentation">Watch 30 Seconds</Link>
          <Link href="/explorer">Mission Explorer</Link>
          <a href="https://github.com/ProMBZ/Lunex" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </nav>
        <span className="footer-copyright">© 2026 LUNEX</span>
      </div>
    </footer>
  );
}

type Star = { x: number; y: number; radius: number; alpha: number; depth: number; phase: number; twinkle: number; bright: boolean; accent: boolean; cross: boolean };
type Meteor = { x: number; y: number; vx: number; vy: number; age: number; duration: number };

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, pixelRatio = 1, frame = 0, lastFrame = 0;
    let running = false, mouseX = 0.5, mouseY = 0.5;
    let stars: Star[] = [], meteors: Meteor[] = [];
    let nextMeteorAt = 5000;

    const randomSource = (initialSeed: number) => {
      let seed = initialSeed;
      return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    };

    const makeStars = () => {
      const random = randomSource(481516);
      const count = window.innerWidth < 680 ? 230 : 460;
      stars = Array.from({ length: count }, () => {
        const bright = random() > 0.975;
        return {
          x: random() * width, y: random() * height,
          radius: bright ? 0.9 + random() * 1.25 : 0.25 + random() * 0.72,
          alpha: bright ? 0.46 + random() * 0.42 : 0.12 + random() * 0.48,
          depth: 0.08 + random() * 0.92,
          phase: random() * Math.PI * 2, twinkle: 0.3 + random() * 0.9,
          bright, accent: random() > 0.982, cross: bright && random() > 0.68,
        };
      });
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const parallaxX = motionQuery.matches ? 0 : (mouseX - 0.5) * star.depth * 17;
        const parallaxY = motionQuery.matches ? 0 : (mouseY - 0.5) * star.depth * 12;
        const shimmer = motionQuery.matches ? 0 : Math.sin(time * 0.001 * star.twinkle + star.phase) * (star.bright ? 0.2 : 0.11);
        const opacity = Math.max(0.05, Math.min(0.95, star.alpha + shimmer));
        const x = star.x - parallaxX, y = star.y - parallaxY;
        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = star.accent ? "rgba(252,61,33," + opacity + ")" : "rgba(255,255,255," + opacity + ")";
        if (star.bright) {
          context.save();
          context.shadowColor = star.accent ? "rgba(252,61,33," + opacity * 0.58 + ")" : "rgba(255,255,255," + opacity * 0.58 + ")";
          context.shadowBlur = star.cross ? 10 : 6;
          context.fill();
          context.restore();
          if (star.cross) {
            context.beginPath();
            context.moveTo(x - 3.5, y); context.lineTo(x + 3.5, y);
            context.moveTo(x, y - 3.5); context.lineTo(x, y + 3.5);
            context.strokeStyle = "rgba(255,255,255," + opacity * 0.5 + ")";
            context.lineWidth = 0.55; context.stroke();
          }
        } else context.fill();
      }

      if (!motionQuery.matches && width > 680) {
        const elapsed = Math.max(0, Math.min(48, time - lastFrame));
        if (time > nextMeteorAt && meteors.length < 2) {
          meteors.push({
            x: Math.random() * width * 0.75 + width * 0.12,
            y: Math.random() * height * 0.3,
            vx: 7 + Math.random() * 3, vy: 2.8 + Math.random() * 1.7,
            age: 0, duration: 42 + Math.random() * 18,
          });
          nextMeteorAt = time + 8500 + Math.random() * 9000;
        }
        meteors = meteors.filter((meteor) => meteor.age < meteor.duration);
        for (const meteor of meteors) {
          meteor.x += meteor.vx * elapsed * 0.06;
          meteor.y += meteor.vy * elapsed * 0.06;
          meteor.age += elapsed * 0.06;
          const alpha = Math.max(0, 1 - meteor.age / meteor.duration);
          const tail = 54;
          const gradient = context.createLinearGradient(meteor.x - tail, meteor.y - tail * 0.34, meteor.x, meteor.y);
          gradient.addColorStop(0, "rgba(255,255,255,0)");
          gradient.addColorStop(0.72, "rgba(255,255,255," + alpha * 0.16 + ")");
          gradient.addColorStop(1, "rgba(252,61,33," + alpha * 0.78 + ")");
          context.beginPath();
          context.moveTo(meteor.x - tail, meteor.y - tail * 0.34);
          context.lineTo(meteor.x, meteor.y);
          context.strokeStyle = gradient; context.lineWidth = 1.25; context.stroke();
        }
      }
    };

    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = width + "px"; canvas.style.height = height + "px";
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      makeStars(); meteors = []; nextMeteorAt = 5000; draw(0);
    };
    const animate = (time: number) => {
      if (!running) return;
      frame = window.requestAnimationFrame(animate);
      if (time - lastFrame < 32) return;
      draw(time); lastFrame = time;
    };
    const start = () => {
      if (running || motionQuery.matches || document.visibilityState === "hidden") return;
      running = true; frame = window.requestAnimationFrame(animate);
    };
    const stop = () => { running = false; window.cancelAnimationFrame(frame); };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      mouseX = event.clientX / Math.max(width, 1); mouseY = event.clientY / Math.max(height, 1);
    };
    const onPointerLeave = () => { mouseX = 0.5; mouseY = 0.5; };
    const onMotionChange = () => {
      if (motionQuery.matches) { stop(); meteors = []; draw(0); } else start();
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") stop(); else start();
    };

    resize();
    if (!motionQuery.matches) start();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener?.("change", onMotionChange);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener?.("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!pointerQuery.matches || motionQuery.matches) return undefined;

    let frame = 0;
    let lastX = -100;
    let lastY = -100;
    const interactiveSelector = "a, button, input, select, textarea, [role='button']";

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      lastX = event.clientX;
      lastY = event.clientY;
      const target = event.target;
      const interactive = target instanceof Element && Boolean(target.closest(interactiveSelector));
      cursor.classList.toggle("is-interactive", interactive);
      cursor.classList.add("is-visible");
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        cursor.style.transform = "translate3d(" + lastX + "px," + lastY + "px,0) translate(-50%,-50%)";
      });
    };

    const leave = () => cursor.classList.remove("is-visible", "is-interactive", "is-pressed");
    const down = (event: PointerEvent) => { if (event.pointerType === "mouse") cursor.classList.add("is-pressed"); };
    const up = () => cursor.classList.remove("is-pressed");
    const motionChanged = () => { if (motionQuery.matches) leave(); };
    const visibilityChanged = () => { if (document.visibilityState === "hidden") leave(); };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibilityChanged);
    motionQuery.addEventListener?.("change", motionChanged);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibilityChanged);
      motionQuery.removeEventListener?.("change", motionChanged);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span className="custom-cursor-ring" /><span className="custom-cursor-point" /></div>;
}

/** Adds restrained, one-time scroll reveals to marked sections. Content remains visible without JS. */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-enabled");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionPreference.matches || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
