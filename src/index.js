// SculptGL Core Library - Main Entry Point
// A WebGL 3D sculpting library without UI dependencies

// Core Scene and Engine
import Scene from './Scene';

// Mesh classes
import Mesh from './mesh/Mesh';
import MeshStatic from './mesh/meshStatic/MeshStatic';
import Multimesh from './mesh/multiresolution/Multimesh';

// Editing tools
import SculptManager from './editing/SculptManager';
import Tools from './editing/tools/Tools';

// Math utilities
import Camera from './math3d/Camera';
import Picking from './math3d/Picking';
import Geometry from './math3d/Geometry';

// File I/O
import Import from './files/Import';
import Export from './files/Export';

// Rendering
import ShaderLib from './render/ShaderLib';
import Background from './drawables/Background';
import Primitives from './drawables/Primitives';

// Utilities
import Enums from './misc/Enums';
import Utils from './misc/Utils';

// State management
import StateManager from './states/StateManager';

/**
 * Main SculptGL Engine class
 * Provides a simplified API for 3D sculpting functionality
 */
class SculptEngine extends Scene {
  constructor(gl, canvas, viewport) {
    super(gl, canvas, viewport);
    this._isInitialized = false;
  }

  /**
   * Initialize the sculpting engine
   * @param {Object} options - Configuration options
   */
  initialize(options = {}) {
    if (this._isInitialized) {
      console.warn('SculptEngine already initialized');
      return;
    }

    // Set default options
    this._showGrid = options.showGrid !== false;
    this._showContour = options.showContour !== false;
    
    // Initialize the engine
    this.start();
    this._isInitialized = true;
  }

  /**
   * Create a new mesh from vertices and faces
   * @param {Float32Array} vertices - Vertex positions (x,y,z)
   * @param {Uint32Array} faces - Face indices
   * @returns {Mesh} Created mesh
   */
  createMesh(vertices, faces) {
    const mesh = new MeshStatic(this._gl);
    mesh.setVertices(vertices);
    mesh.setFaces(faces);
    mesh.init();
    mesh.initRender();
    return mesh;
  }

  /**
   * Add a mesh to the scene
   * @param {Mesh} mesh - Mesh to add
   * @returns {Mesh} Added mesh
   */
  addMesh(mesh) {
    return this.addNewMesh(mesh);
  }

  /**
   * Remove a mesh from the scene
   * @param {Mesh} mesh - Mesh to remove
   */
  removeMesh(mesh) {
    this.removeMeshes([mesh]);
  }

  /**
   * Set the active sculpting tool
   * @param {number} toolIndex - Tool index from Enums.Tools
   */
  setTool(toolIndex) {
    if (this._sculptManager) {
      this._sculptManager.setToolIndex(toolIndex);
    }
  }

  /**
   * Get the current sculpting tool
   * @returns {Object} Current tool
   */
  getCurrentTool() {
    return this._sculptManager ? this._sculptManager.getCurrentTool() : null;
  }

  /**
   * Load a 3D model from file data
   * @param {ArrayBuffer|string} fileData - File data
   * @param {string} fileType - File type ('obj', 'stl', 'ply', 'sgl')
   * @returns {Array} Array of loaded meshes
   */
  loadModel(fileData, fileType) {
    return this.loadScene(fileData, fileType);
  }

  /**
   * Export the current scene
   * @param {string} format - Export format ('obj', 'stl', 'ply')
   * @param {Object} options - Export options
   * @returns {string|ArrayBuffer} Exported data
   */
  exportScene(format, options = {}) {
    const meshes = this.getSelectedMeshes();
    if (meshes.length === 0) return null;

    switch (format.toLowerCase()) {
      case 'obj':
        return Export.exportOBJ(meshes, options);
      case 'stl':
        return Export.exportSTL(meshes, options);
      case 'ply':
        return Export.exportPLY(meshes, options);
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  /**
   * Resize the rendering canvas
   * @param {number} width - New width
   * @param {number} height - New height
   */
  resize(width, height) {
    this.onCanvasResize(width, height);
  }

  /**
   * Render the scene
   */
  render() {
    super.render();
  }

  /**
   * Clean up resources
   */
  dispose() {
    // Clean up WebGL resources
    if (this._gl) {
      // TODO: Implement proper cleanup
    }
  }
}

// Export main classes and utilities
export {
  // Main engine
  SculptEngine,
  Scene,
  
  // Mesh classes
  Mesh,
  MeshStatic,
  Multimesh,
  
  // Tools and editing
  SculptManager,
  Tools,
  
  // Math
  Camera,
  Picking,
  Geometry,
  
  // File I/O
  Import,
  Export,
  
  // Rendering
  ShaderLib,
  Background,
  Primitives,
  
  // Utilities
  Enums,
  Utils,
  
  // State management
  StateManager
};

// Default export
export default SculptEngine;
