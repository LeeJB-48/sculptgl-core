# SculptGL Core

A WebGL 3D sculpting library - core functionality without UI dependencies.

This is a library version of [SculptGL](http://stephaneginier.com/sculptgl) that provides the core 3D sculpting functionality without the user interface, making it suitable for integration into other applications.

## Features

- 🎨 **3D Sculpting Tools**: Brush, inflate, smooth, flatten, pinch, and more
- 🔧 **Mesh Operations**: Dynamic subdivision, decimation, remeshing
- 📁 **File I/O**: Support for OBJ, STL, PLY, and SGL formats
- 🎯 **WebGL Rendering**: Optimized rendering with multiple shader types
- 📐 **Math Utilities**: 3D math, camera controls, picking
- 🔄 **State Management**: Undo/redo functionality
- 📦 **No UI Dependencies**: Pure sculpting engine without DOM dependencies

## Installation

### From GitHub (recommended)
```bash
pnpm add git+https://github.com/LeeJB-48/sculptgl-core.git
```

### From npm (if published)
```bash
pnpm add sculptgl-core
```

## Quick Start

```javascript
import SculptEngine from 'sculptgl-core';

// Get WebGL context
const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

// Create sculpting engine
const engine = new SculptEngine(gl, canvas);
engine.initialize({
  showGrid: true,
  showContour: true
});

// Create a simple cube mesh
const vertices = new Float32Array([/* vertex data */]);
const faces = new Uint32Array([/* face indices */]);
const mesh = engine.createMesh(vertices, faces);
engine.addMesh(mesh);

// Set sculpting tool
import { Enums } from 'sculptgl-core';
engine.setTool(Enums.Tools.BRUSH);

// Render
engine.render();
```

## API Reference

### SculptEngine

Main engine class that provides a simplified API for 3D sculpting.

```javascript
const engine = new SculptEngine(gl, canvas, viewport);
engine.initialize(options);
```

#### Methods

- `initialize(options)` - Initialize the sculpting engine
- `createMesh(vertices, faces)` - Create a new mesh from vertex data
- `addMesh(mesh)` - Add a mesh to the scene
- `removeMesh(mesh)` - Remove a mesh from the scene
- `setTool(toolIndex)` - Set the active sculpting tool
- `loadModel(fileData, fileType)` - Load a 3D model from file data
- `exportScene(format, options)` - Export the current scene
- `resize(width, height)` - Resize the rendering canvas
- `render()` - Render the scene

### Available Tools

```javascript
import { Enums } from 'sculptgl-core';

// Sculpting tools
Enums.Tools.BRUSH      // Basic brush
Enums.Tools.INFLATE    // Inflate/deflate
Enums.Tools.SMOOTH     // Smooth surface
Enums.Tools.FLATTEN    // Flatten surface
Enums.Tools.PINCH      // Pinch vertices
Enums.Tools.CREASE     // Create creases
Enums.Tools.DRAG       // Drag vertices
Enums.Tools.PAINT      // Paint colors
```

### File Formats

Supported import/export formats:
- **OBJ** - Wavefront OBJ format
- **STL** - Stereolithography format
- **PLY** - Polygon File Format
- **SGL** - SculptGL native format (import only)

## Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/LeeJB-48/sculptgl-core.git
cd sculptgl

# Install dependencies
pnpm install

# Build the library
pnpm build

# Watch for changes during development
pnpm build:watch

# Start development server
pnpm dev
```

### Project Structure

```
src/
├── index.js          # Main entry point
├── Scene.js          # Core scene management
├── drawables/        # Rendering objects
├── editing/          # Sculpting tools and algorithms
├── files/            # File import/export
├── math3d/           # 3D mathematics
├── mesh/             # Mesh data structures
├── misc/             # Utilities and enums
├── render/           # WebGL rendering
└── states/           # State management
```

## Examples

### Loading a Model

```javascript
// Load from file input
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const arrayBuffer = await file.arrayBuffer();
  const fileType = file.name.split('.').pop().toLowerCase();

  const meshes = engine.loadModel(arrayBuffer, fileType);
  console.log(`Loaded ${meshes.length} meshes`);
});
```

### Exporting a Model

```javascript
// Export as STL
const stlData = engine.exportScene('stl', { binary: true });
if (stlData) {
  const blob = new Blob([stlData], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  // Download or use the URL
}
```

### Custom Mesh Creation

```javascript
// Create a simple triangle
const vertices = new Float32Array([
  0.0,  1.0, 0.0,  // Top vertex
 -1.0, -1.0, 0.0,  // Bottom left
  1.0, -1.0, 0.0   // Bottom right
]);

const faces = new Uint32Array([
  0, 1, 2  // Triangle face
]);

const mesh = engine.createMesh(vertices, faces);
engine.addMesh(mesh);
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

- Original SculptGL by Stéphane GINIER
- Environment maps from [HDRI Haven](https://hdrihaven.com/hdris)
- Built with WebGL and gl-matrix
