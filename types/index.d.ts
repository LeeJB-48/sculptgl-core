// Type definitions for sculptgl-core
// Project: https://github.com/LeeJB-48/sculptgl-core

declare module 'sculptgl-core' {
  // Main Engine Class
  export default class SculptEngine {
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, canvas: HTMLCanvasElement, viewport?: HTMLElement);
    
    initialize(options?: SculptEngineOptions): void;
    render(): void;
    resize(width?: number, height?: number): void;
    
    // Mesh management
    createMesh(vertices: Float32Array, faces: Uint32Array): Mesh;
    addMesh(mesh: Mesh): Mesh;
    removeMesh(mesh: Mesh): void;
    getMeshes(): Mesh[];
    getSelectedMesh(): Mesh | null;
    selectMesh(mesh: Mesh | null): void;
    clearScene(): void;
    
    // File operations
    loadModel(fileData: ArrayBuffer, fileType: 'obj' | 'stl' | 'ply' | 'sgl'): Mesh[];
    exportScene(format: 'obj' | 'stl' | 'ply', options?: ExportOptions): string | ArrayBuffer | null;
    
    // Sculpting
    setTool(toolIndex: number): void;
    getCurrentTool(): any;
    
    // Camera
    getCamera(): Camera;
    getPicking(): Picking;
    getSculptManager(): SculptManager;
    getStateManager(): StateManager;
  }

  // Core Scene Class
  export class Scene {
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, canvas: HTMLCanvasElement, viewport?: HTMLElement);
    
    start(): void;
    render(): void;
    onCanvasResize(width?: number, height?: number): void;
    
    getMeshes(): Mesh[];
    getMesh(): Mesh | null;
    setMesh(mesh: Mesh | null): void;
    addNewMesh(mesh: Mesh): Mesh;
    removeMeshes(meshes: Mesh[]): void;
    clearScene(): void;
    
    loadScene(fileData: ArrayBuffer, fileType: string): Mesh[];
    
    getCamera(): Camera;
    getPicking(): Picking;
    getSculptManager(): SculptManager;
    getStateManager(): StateManager;
  }

  // Mesh Classes
  export class Mesh {
    constructor();
    init(): void;
    initRender(): void;
    
    getVertices(): Float32Array;
    getFaces(): Uint32Array;
    getNormals(): Float32Array;
    getColors(): Float32Array | null;
    getUVs(): Float32Array | null;
    
    updateGeometry(): void;
    updateRender(): void;
    computeNormals(): void;
  }

  export class MeshStatic extends Mesh {
    constructor(gl?: WebGLRenderingContext | WebGL2RenderingContext);
    setVertices(vertices: Float32Array): void;
    setFaces(faces: Uint32Array): void;
  }

  export class Multimesh extends Mesh {
    constructor(mesh?: Mesh);
    addLevel(): void;
    selectLevel(level: number): void;
    getCurrentLevel(): number;
    getLevels(): number;
  }

  // Editing Tools
  export class SculptManager {
    constructor(scene: Scene);
    
    setToolIndex(toolIndex: number): void;
    getCurrentTool(): any;
    
    setRadius(radius: number): void;
    setIntensity(intensity: number): void;
    setNegative(negative: boolean): void;
    setClay(clay: boolean): void;
    setCulling(culling: boolean): void;
  }

  export const Tools: any;

  // Math Classes
  export class Camera {
    constructor(scene: Scene);
    
    rotate(dx: number, dy: number): void;
    zoom(delta: number): void;
    pan(dx: number, dy: number): void;
    resetView(): void;
    
    setProjectionType(type: number): void;
    getProjectionMatrix(): Float32Array;
    getViewMatrix(): Float32Array;
    getPosition(): Float32Array;
    getTarget(): Float32Array;
  }

  export class Picking {
    constructor(scene: Scene, symmetry?: boolean);
    
    intersectionRayMesh(mesh: Mesh, x: number, y: number): boolean;
    getIntersectionPoint(): Float32Array;
    getPickedFace(): number;
    getLocalRadius2(): number;
  }

  export const Geometry: {
    distance2(a: Float32Array, b: Float32Array): number;
    normalize(vec: Float32Array): Float32Array;
    cross(a: Float32Array, b: Float32Array): Float32Array;
    dot(a: Float32Array, b: Float32Array): number;
  };

  // File I/O
  export const Import: {
    importOBJ(buffer: ArrayBuffer, gl: WebGLRenderingContext): Mesh[];
    importSTL(buffer: ArrayBuffer, gl: WebGLRenderingContext): Mesh[];
    importPLY(buffer: ArrayBuffer, gl: WebGLRenderingContext): Mesh[];
    importSGL(buffer: ArrayBuffer, gl: WebGLRenderingContext, scene: Scene): Mesh[];
  };

  export const Export: {
    exportOBJ(meshes: Mesh[], options?: ExportOptions): string;
    exportAsciiSTL(meshes: Mesh[]): string;
    exportBinarySTL(meshes: Mesh[]): ArrayBuffer;
    exportAsciiPLY(meshes: Mesh[]): string;
    exportBinaryPLY(meshes: Mesh[]): ArrayBuffer;
    exportSGL(scene: Scene): ArrayBuffer;
  };

  // Enums
  export const Enums: {
    Action: {
      NOTHING: 0;
      MASK_EDIT: 1;
      SCULPT_EDIT: 2;
      CAMERA_ZOOM: 3;
      CAMERA_ROTATE: 4;
      CAMERA_PAN: 5;
      CAMERA_PAN_ZOOM_ALT: 6;
    };
    
    Tools: {
      BRUSH: 0;
      INFLATE: 1;
      TWIST: 2;
      SMOOTH: 3;
      FLATTEN: 4;
      PINCH: 5;
      CREASE: 6;
      DRAG: 7;
      PAINT: 8;
      MOVE: 9;
      MASKING: 10;
      LOCALSCALE: 11;
      TRANSFORM: 12;
    };
    
    Shader: {
      PBR: 0;
      FLAT: 1;
      NORMAL: 2;
      WIREFRAME: 3;
      UV: 4;
      MATCAP: 5;
      SELECTION: 6;
      BACKGROUND: 7;
      MERGE: 8;
      FXAA: 9;
      CONTOUR: 10;
      PAINTUV: 11;
      BLUR: 12;
    };
    
    Projection: {
      PERSPECTIVE: 0;
      ORTHOGRAPHIC: 1;
    };
  };

  // Other exports
  export const ShaderLib: any;
  export class Background {
    constructor(gl: WebGLRenderingContext, scene: Scene);
  }
  export const Primitives: any;
  export const Utils: any;
  export class StateManager {
    constructor(scene: Scene);
    undo(): void;
    redo(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    reset(): void;
  }

  // Type definitions
  export interface SculptEngineOptions {
    autoMatrix?: boolean;
    vertexSRGB?: boolean;
    showGrid?: boolean;
    showContour?: boolean;
    cameraSpeed?: number;
  }

  export interface ExportOptions {
    binary?: boolean;
    colors?: boolean;
    uvs?: boolean;
    normals?: boolean;
  }

  export interface MeshData {
    vertices: Float32Array;
    faces: Uint32Array;
    normals?: Float32Array;
    colors?: Float32Array;
    uvs?: Float32Array;
  }
}
