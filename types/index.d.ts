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
    getCurrentTool(): Tool;

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

    // Mesh management
    getMeshes(): Mesh[];
    getMesh(): Mesh | null;
    setMesh(mesh: Mesh | null): void;
    addNewMesh(mesh: Mesh): Mesh;
    removeMeshes(meshes: Mesh[]): void;
    clearScene(): void;
    addSphere(): Mesh;

    // File operations
    loadScene(fileData: ArrayBuffer, fileType: string): Mesh[];
    normalizeAndCenterMeshes(meshes: Mesh[]): void;
    computeBoundingBoxMeshes(meshes: Mesh[]): Float32Array;

    // Core components
    getCamera(): Camera;
    getPicking(): Picking;
    getSculptManager(): SculptManager;
    getStateManager(): StateManager;

    // Properties
    getCanvas(): HTMLCanvasElement;
    getViewport(): HTMLElement | null;
  }

  // Mesh Classes
  export class Mesh {
    constructor();

    // Initialization
    init(): void;
    initRender(): void;
    initTopology(): void;
    initColorsAndMaterials(): void;
    allocateArrays(): void;

    // Getters - Geometry data
    getVertices(): Float32Array;
    getFaces(): Uint32Array;
    getNormals(): Float32Array;
    getColors(): Float32Array | null;
    getUVs(): Float32Array | null;
    getMaterials(): Float32Array | null;
    getTexCoords(): Float32Array | null;

    // Setters - Geometry data
    setVertices(vertices: Float32Array): void;
    setFaces(faces: Uint32Array): void;
    setColors(colors: Float32Array): void;
    setTexCoords(texCoords: Float32Array): void;
    setFacesTexCoord(facesTexCoord: Uint32Array): void;
    setMaterials(materials: Float32Array): void;

    // Counts
    getNbVertices(): number;
    getNbFaces(): number;
    getNbQuads(): number;
    getNbTriangles(): number;
    getNbTexCoords(): number;

    // Updates
    updateGeometry(): void;
    updateCenter(): void;

    // Transform
    getMatrix(): Float32Array;
    getEditMatrix(): Float32Array;
    getScale(): number;
    getScale2(): number;

    // Visibility
    isVisible(): boolean;
    setVisible(visible: boolean): void;

    // Properties
    getID(): number;
    setID(id: number): void;
    hasUV(): boolean;
    isTransparent(): boolean;
    getDepth(): number;

    // Symmetry
    getSymmetryOrigin(): Float32Array;
    getSymmetryOffset(): number;
    getSymmetryNormal(): Float32Array;
    setSymmetryOffset(offset: number): void;

    // Render data
    getRenderData(): any;
    getMeshData(): any;
    getTransformData(): any;

    // GL context
    getGL(): WebGLRenderingContext | WebGL2RenderingContext | null;
  }

  export class MeshStatic extends Mesh {
    constructor(gl?: WebGLRenderingContext | WebGL2RenderingContext);

    // Override setters with proper implementation
    setVertices(vertices: Float32Array): void;
    setFaces(faces: Uint32Array): void;
    setColors(colors: Float32Array): void;
    setTexCoords(texCoords: Float32Array): void;
    setMaterials(materials: Float32Array): void;

    // Texture coordinates
    initTexCoordsDataFromOBJData(uvs: Float32Array, facesUV: Uint32Array): void;
  }

  export class Multimesh extends Mesh {
    constructor(mesh?: Mesh);

    // Multi-resolution levels
    addLevel(): Mesh;
    setSelection(level: number): void;
    getCurrentMesh(): Mesh;

    // Level navigation
    lowerLevel(): Mesh;
    higherLevel(): Mesh;

    // Mesh management
    pushMesh(mesh: Mesh): void;
    popMesh(): void;
    unshiftMesh(mesh: Mesh): void;
    shiftMesh(): void;
    deleteLower(): void;

    // Rendering
    getLowIndexRender(): number;
    updateResolution(): void;

    // Static constants
    static readonly NONE: number;
    static readonly SCULPT: number;
    static readonly CAMERA: number;
    static readonly PICKING: number;
  }

  // Editing Tools
  export class SculptManager {
    constructor(scene: Scene);

    // Tool management
    setToolIndex(toolIndex: number): void;
    getToolIndex(): number;
    getCurrentTool(): Tool;
    getTool(index: number): Tool;

    // Sculpting operations
    start(ctrl: boolean): boolean;
    end(): void;
    preUpdate(): void;
    update(): void;
    postRender(): void;

    // Symmetry
    getSymmetry(): boolean;

    // Continuous sculpting
    canBeContinuous(): boolean;
    isUsingContinuous(): boolean;

    // Selection
    getSelection(): any;

    // Scene integration
    addSculptToScene(scene: Scene): boolean;
  }

  // Base Tool class
  export class Tool {
    constructor(scene: Scene);

    // Tool operations
    start(ctrl: boolean): boolean;
    end(): void;
    update(): void;
    preUpdate(continuous: boolean): void;
    postRender(selection: any): void;

    // Tool properties
    getScreenRadius(): number;

    // Scene integration
    addSculptToScene(scene: Scene): boolean;
  }

  export const Tools: Tool[];

  // Math Classes
  export class Camera {
    constructor(scene: Scene);

    // Camera movement
    rotate(mouseX: number, mouseY: number): void;
    zoom(delta: number): void;
    translate(dx: number, dy: number): void;

    // View presets
    resetView(): void;
    resetViewFront(): void;
    resetViewBack(): void;
    resetViewTop(): void;
    resetViewBottom(): void;
    resetViewLeft(): void;
    resetViewRight(): void;
    toggleViewFront(): void;
    toggleViewTop(): void;
    toggleViewLeft(): void;

    // Projection
    setProjectionType(type: number): void;
    getProjectionType(): number;
    getProjection(): Float32Array;
    getView(): Float32Array;
    updateProjection(): void;
    updateView(): void;
    updateOrtho(): void;

    // Position and orientation
    computePosition(out?: Float32Array): Float32Array;

    // Transform utilities
    project(point: Float32Array): Float32Array;
    unproject(x: number, y: number, z: number): Float32Array;
    computeWorldToScreenMatrix(mat?: Float32Array): Float32Array;

    // Camera properties
    setTrans(trans: Float32Array): void;
    setPivot(pivot: Float32Array): void;
    setAndFocusOnPivot(pivot: Float32Array, zoom: number): void;
    moveToDelay(x: number, y: number, z: number): void;
    getOrthoZoom(): number;

    // Viewport
    onResize(width: number, height: number): void;
  }

  export class Picking {
    constructor(scene: Scene, symmetry?: boolean);

    // Ray intersection
    intersectionRayMesh(mesh: Mesh, vNear: Float32Array, vFar: Float32Array): boolean;
    intersectionMouseMesh(mesh?: Mesh, mouseX?: number, mouseY?: number): boolean;
    intersectionMouseMeshes(meshes?: Mesh[], mouseX?: number, mouseY?: number): boolean;

    // Picking results
    getMesh(): Mesh | null;
    getIntersectionPoint(): Float32Array;
    getPickedFace(): number;
    getPickedVertices(): number[];
    getPickedNormal(): Float32Array;

    // Radius calculations
    getLocalRadius2(): number;
    getWorldRadius2(): number;
    computeWorldRadius2(ignorePressure?: boolean): number;
    updateLocalAndWorldRadius2(): void;

    // Projection utilities
    project(point: Float32Array): Float32Array;
    unproject(x: number, y: number, z: number): Float32Array;

    // Alpha/texture support
    setIdAlpha(id: number): void;
    getAlpha(x?: number, y?: number, z?: number): number;
  }

  export const Geometry: {
    // Mouse utilities
    normalizedMouse(mouseX: number, mouseY: number, width: number, height: number): Float32Array;
    mouseOnUnitSphere(mouseXY: Float32Array): Float32Array;

    // Ray-triangle intersection
    intersectionRayTriangle(rayOrigin: Float32Array, rayDirection: Float32Array,
                           v0: Float32Array, v1: Float32Array, v2: Float32Array, vertInter?: Float32Array): number;
    intersectionRayTriangleEdges(rayOrigin: Float32Array, rayDirection: Float32Array,
                                edge1: Float32Array, edge2: Float32Array, v1: Float32Array, vertInter?: Float32Array): number;

    // Distance calculations
    distance2PointTriangle(point: Float32Array, v1: Float32Array, v2: Float32Array, v3: Float32Array, closest?: Float32Array): number;
    distance2PointTriangleEdges(point: Float32Array, edge1: Float32Array, edge2: Float32Array, v1: Float32Array,
                               a00: number, a01: number, a11: number, closest?: Float32Array): number;
    distanceSqToSegment(point: Float32Array, v1: Float32Array, v2: Float32Array): number;

    // Geometric utilities
    mirrorPoint(point: Float32Array, planePoint: Float32Array, planeNormal: Float32Array): Float32Array;
    pointPlaneDistance(point: Float32Array, planePoint: Float32Array, planeNormal: Float32Array): number;
    vertexOnLine(vertex: Float32Array, vNear: Float32Array, vFar: Float32Array): Float32Array;
    intersectLinePlane(s1: Float32Array, s2: Float32Array, origin: Float32Array, normal: Float32Array, out?: Float32Array): Float32Array;
    getPerpendicularVector(vec: Float32Array): Float32Array;

    // Triangle utilities
    isPointInsideTriangle(point: Float32Array, v1: Float32Array, v2: Float32Array, v3: Float32Array): boolean;
  };

  // File I/O
  export const Import: {
    importOBJ(buffer: ArrayBuffer, gl: WebGLRenderingContext | WebGL2RenderingContext): Mesh[];
    importSTL(buffer: ArrayBuffer, gl: WebGLRenderingContext | WebGL2RenderingContext): Mesh[];
    importPLY(buffer: ArrayBuffer, gl: WebGLRenderingContext | WebGL2RenderingContext): Mesh[];
    importSGL(buffer: ArrayBuffer, gl: WebGLRenderingContext | WebGL2RenderingContext, scene: Scene): Mesh[];
  };

  export const Export: {
    exportOBJ(meshes: Mesh[], options?: ExportOptions): string;
    exportSTL(meshes: Mesh[], binary?: boolean): string | ArrayBuffer;
    exportPLY(meshes: Mesh[], binary?: boolean): string | ArrayBuffer;
    exportSGL(scene: Scene): ArrayBuffer;

    // Individual format methods
    exportAsciiSTL(meshes: Mesh[]): string;
    exportBinarySTL(meshes: Mesh[]): ArrayBuffer;
    exportAsciiPLY(meshes: Mesh[]): string;
    exportBinaryPLY(meshes: Mesh[]): ArrayBuffer;
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

    CameraMode: {
      ORBIT: 0;
      SPHERICAL: 1;
      PLANE: 2;
    };

    MultiState: {
      NONE: 0;
      SCULPT: 1;
      CAMERA: 2;
      PICKING: 3;
    };

    KeyAction: {
      INTENSITY: number;
      RADIUS: number;
      NEGATIVE: number;
      PICKER: number;
      DELETE: number;
      CAMERA_FRONT: number;
      CAMERA_TOP: number;
      CAMERA_LEFT: number;
      CAMERA_RESET: number;
      STRIFE_LEFT: number;
      STRIFE_RIGHT: number;
      STRIFE_UP: number;
      STRIFE_DOWN: number;
      WIREFRAME: number;
      REMESH: number;
    } & typeof Enums.Tools;
  };

  // Other exports
  export const ShaderLib: {
    [key: string]: any;
    getShader(gl: WebGLRenderingContext | WebGL2RenderingContext, type: number): any;
  };

  export class Background {
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext, scene: Scene);
    render(): void;
    onResize(width: number, height: number): void;
  }

  export const Primitives: {
    createSphere(gl: WebGLRenderingContext | WebGL2RenderingContext): Mesh;
    createCube(gl: WebGLRenderingContext | WebGL2RenderingContext): Mesh;
    createCylinder(gl: WebGLRenderingContext | WebGL2RenderingContext): Mesh;
    createTorus(gl: WebGLRenderingContext | WebGL2RenderingContext): Mesh;
    createGrid(gl: WebGLRenderingContext | WebGL2RenderingContext): any;
  };

  export const Utils: {
    SCALE: number;
    TRI_INDEX: number;
    STATE_FLAG: number;

    // Array utilities
    getMemory(): number;
    convertArrayVec3toSRGB(colors: Float32Array): void;
    convertArraySRGBtoVec3(colors: Float32Array): void;

    // Math utilities
    clamp(value: number, min: number, max: number): number;
    lerp(a: number, b: number, t: number): number;

    // Object utilities
    extend(target: any, source: any): any;
  };

  export class StateManager {
    constructor(scene: Scene);

    // Undo/Redo operations
    undo(): void;
    redo(): void;
    canUndo(): boolean;
    canRedo(): boolean;
    reset(): void;

    // State management
    pushState(state: any): void;
    pushStateCustom(undoCallback: () => void, redoCallback: () => void, squash?: boolean): void;
    pushStateAddRemove(addMesh: Mesh[], removeMesh: Mesh[], squash?: boolean): void;
    pushStateAdd(addMesh: Mesh[]): void;
    pushStateRemove(removeMesh: Mesh[]): void;
    pushStateGeometry(mesh: Mesh): void;
    pushStateColorAndMaterial(mesh: Mesh): void;
    pushStateMultiresolution(multimesh: Multimesh, type: number): void;

    // Current state
    getCurrentState(): any;
    pushVertices(vertices: number[]): void;
    pushFaces(faces: number[]): void;

    // Configuration
    setNewMaxStack(maxStack: number): void;
    cleanNoop(): void;

    // Static properties
    static STACK_LENGTH: number;
  }

  // Type definitions
  export interface SculptEngineOptions {
    autoMatrix?: boolean;
    vertexSRGB?: boolean;
    showGrid?: boolean;
    showContour?: boolean;
    cameraSpeed?: number;
    fov?: number;
    near?: number;
    far?: number;
    projection?: number;
    cameraMode?: number;
  }

  export interface ExportOptions {
    binary?: boolean;
    colors?: boolean;
    uvs?: boolean;
    normals?: boolean;
    materials?: boolean;
    textures?: boolean;
  }

  export interface MeshData {
    vertices: Float32Array;
    faces: Uint32Array;
    normals?: Float32Array;
    colors?: Float32Array;
    uvs?: Float32Array;
    materials?: Float32Array;
  }

  export interface PickingResult {
    mesh: Mesh | null;
    face: number;
    point: Float32Array;
    normal: Float32Array;
    distance: number;
  }

  export interface CameraState {
    position: Float32Array;
    target: Float32Array;
    rotation: Float32Array;
    projection: number;
    fov: number;
    zoom: number;
  }

  export interface ToolSettings {
    radius: number;
    intensity: number;
    negative: boolean;
    clay: boolean;
    culling: boolean;
    symmetry: boolean;
    continuous: boolean;
  }
}
