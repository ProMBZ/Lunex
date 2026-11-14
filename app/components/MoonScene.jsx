"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function disposeNodeTree(root) {
  root.traverse((object) => {
    object.geometry?.dispose?.();
    if (!object.material) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value?.isTexture) value.dispose();
      });
      material.dispose?.();
    });
  });
}

export default function MoonScene({ compact = false }) {
  const hostRef = useRef(null);
  const [status, setStatus] = useState("checking");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    let controls;
    let resizeObserver;
    let intersectionObserver;
    let disposed = false;
    let visible = true;
    let modelRoot = null;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, compact ? 4.45 : 4.45);

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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.35 : 1.55));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.16;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "moon-canvas";
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute("aria-label", "Interactive NASA LRO and LOLA global Moon model. Drag to rotate and use the scroll wheel or pinch to zoom. The global model is not a local landing-site elevation model.");
    renderer.domElement.setAttribute("tabindex", "0");
    host.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x0B3D91, 1.08));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.05);
    keyLight.position.set(-4.3, 2.8, 4.5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x0B3D91, 0.24);
    fillLight.position.set(3.2, -1.8, -3.7);
    scene.add(fillLight);

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
    const onMotionChange = (event) => {
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
        const availability = await check.json();
        if (disposed) return;
        if (!availability.available) {
          setMessage("The NASA GLB is not available to this runtime. Add Moon_NASA_LRO_8k_Topo_Small.glb to public/models and restart the app.");
          setStatus("missing");
          return;
        }

        setStatus("loading");
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync("/api/moon-model", (event) => {
          if (!disposed && event.total > 0) setProgress(Math.min(99, Math.round(event.loaded / event.total * 100)));
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
        modelRoot.traverse((object) => {
          if (!object.isMesh) return;
          object.frustumCulled = true;
          object.castShadow = false;
          object.receiveShadow = false;
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if ("roughness" in material) material.roughness = Math.max(material.roughness ?? 0.84, 0.84);
            if ("metalness" in material) material.metalness = 0;
            material.needsUpdate = true;
          });
        });
        scene.add(modelRoot);
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

  return (
    <div className={compact ? "moon-scene moon-scene-compact" : "moon-scene"} ref={hostRef}>
      {status !== "ready" && (
        <div className={"moon-scene-state state-" + status}>
          {status === "checking" || status === "loading" ? (
            <>
              <span className="scene-spinner" />
              <b>{status === "checking" ? "Checking the local Moon model" : "Loading NASA LRO / LOLA model"}</b>
              <span className="scene-state-detail">{status === "checking" ? "Looking for the 77.7 MB global orientation asset" : progress > 0 ? progress + "% transferred" : "Preparing 3D geometry"}</span>
              <div className="scene-progress"><i style={{ width: progress + "%" }} /></div>
            </>
          ) : status === "missing" ? (
            <>
              <b>Global Moon model not found</b>
              <p>{message}</p>
              <code>public/models/Moon_NASA_LRO_8k_Topo_Small.glb</code>
              <small>Run npm run model:verify after placing the file in this folder.</small>
            </>
          ) : (
            <>
              <b>3D scene unavailable</b>
              <p>{message}</p>
              <small>Check that the browser supports WebGL and that the GLB is a valid glTF 2.0 binary.</small>
            </>
          )}
        </div>
      )}
    </div>
  );
}
