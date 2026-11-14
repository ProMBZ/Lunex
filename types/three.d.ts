// Minimal Three.js types used by the Lunex Moon scene.
declare module "three" {
  export const SRGBColorSpace: string;
  export const ACESFilmicToneMapping: number;

  export class Texture {
    dispose(): void;
  }

  export class CanvasTexture extends Texture {
    constructor(canvas: HTMLCanvasElement);
    colorSpace: string;
    anisotropy: number;
  }

  export class BufferGeometry {
    dispose(): void;
  }

  export class SphereGeometry extends BufferGeometry {
    constructor(radius: number, widthSegments?: number, heightSegments?: number);
  }

  export class Material {
    needsUpdate: boolean;
    dispose(): void;
  }

  export class MeshStandardMaterial extends Material {
    map: Texture | null;
    roughness: number;
    metalness: number;
    constructor(options?: { map?: Texture; roughness?: number; metalness?: number });
  }

  export class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
    set(x: number, y: number, z: number): this;
    setScalar(value: number): this;
    sub(vector: Vector3): this;
  }

  export class Euler {
    set(x: number, y: number, z: number): this;
  }

  export class Object3D {
    position: Vector3;
    scale: Vector3;
    rotation: Euler;
    userData: Record<string, unknown>;
    add(...objects: Object3D[]): this;
    remove(...objects: Object3D[]): this;
    traverse(callback: (object: Object3D) => void): void;
  }

  export class Group extends Object3D {}

  export class Mesh<
    GeometryType extends BufferGeometry = BufferGeometry,
    MaterialType extends Material | Material[] = Material | Material[]
  > extends Object3D {
    geometry: GeometryType;
    material: MaterialType;
    frustumCulled: boolean;
    castShadow: boolean;
    receiveShadow: boolean;
    constructor(geometry: GeometryType, material: MaterialType);
  }

  export class Scene extends Object3D {}

  export class PerspectiveCamera extends Object3D {
    aspect: number;
    constructor(fov: number, aspect: number, near: number, far: number);
    updateProjectionMatrix(): void;
  }

  export class HemisphereLight extends Object3D {
    constructor(skyColor: number, groundColor: number, intensity?: number);
  }

  export class DirectionalLight extends Object3D {
    constructor(color: number, intensity?: number);
  }

  export class Box3 {
    constructor(min?: Vector3, max?: Vector3);
    setFromObject(object: Object3D): this;
    getCenter(target: Vector3): Vector3;
    getSize(target: Vector3): Vector3;
  }

  export class WebGLRenderer {
    constructor(options?: {
      alpha?: boolean;
      antialias?: boolean;
      powerPreference?: string;
      premultipliedAlpha?: boolean;
    });
    domElement: HTMLCanvasElement;
    outputColorSpace: string;
    toneMapping: number;
    toneMappingExposure: number;
    setPixelRatio(value: number): void;
    setSize(width: number, height: number, updateStyle?: boolean): void;
    setClearColor(color: number, alpha?: number): void;
    setAnimationLoop(callback: ((time: number) => void) | null): void;
    render(scene: Scene, camera: PerspectiveCamera): void;
    dispose(): void;
  }
}

declare module "three/addons/loaders/GLTFLoader.js" {
  import type { Group } from "three";
  export class GLTFLoader {
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<{ scene: Group }>;
  }
}

declare module "three/addons/controls/OrbitControls.js" {
  import type { PerspectiveCamera } from "three";
  export class OrbitControls {
    constructor(camera: PerspectiveCamera, domElement: HTMLElement);
    enableDamping: boolean;
    dampingFactor: number;
    enablePan: boolean;
    minDistance: number;
    maxDistance: number;
    rotateSpeed: number;
    zoomSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    update(): void;
    dispose(): void;
  }
}
