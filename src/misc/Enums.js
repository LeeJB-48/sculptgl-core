import Utils from 'misc/Utils';

/**
 * @fileoverview Enums and constants for SculptGL
 * Note: Enums marked with /!\ shouldn't change (serialized in sgl file)
 */

/**
 * Collection of all enums and constants
 * @namespace Enums
 */
var Enums = {};

/**
 * User interaction actions
 * @enum {number}
 */
Enums.Action = {
  /** No action */
  NOTHING: 0,
  /** Mask editing */
  MASK_EDIT: 1,
  /** Sculpting operation */
  SCULPT_EDIT: 2,
  /** Camera zoom */
  CAMERA_ZOOM: 3,
  /** Camera rotation */
  CAMERA_ROTATE: 4,
  /** Camera panning */
  CAMERA_PAN: 5,
  /** Alternative camera pan/zoom */
  CAMERA_PAN_ZOOM_ALT: 6
};

/**
 * Sculpting tools
 * @enum {number}
 */
Enums.Tools = {
  /** Basic brush tool */
  BRUSH: 0,
  /** Inflate/deflate tool */
  INFLATE: 1,
  /** Twist tool */
  TWIST: 2,
  /** Smooth surface tool */
  SMOOTH: 3,
  /** Flatten surface tool */
  FLATTEN: 4,
  /** Pinch vertices tool */
  PINCH: 5,
  /** Create creases tool */
  CREASE: 6,
  /** Drag vertices tool */
  DRAG: 7,
  /** Paint colors tool */
  PAINT: 8,
  /** Move mesh tool */
  MOVE: 9,
  /** Masking tool */
  MASKING: 10,
  /** Local scale tool */
  LOCALSCALE: 11,
  /** Transform tool */
  TRANSFORM: 12
};

// display shader type
Enums.Shader = {
  PBR: 0, // /!\ 
  FLAT: 1,
  NORMAL: 2, // /!\ 
  WIREFRAME: 3,
  UV: 4, // /!\ 
  MATCAP: 5, // /!\ 
  SELECTION: 6,
  BACKGROUND: 7,
  MERGE: 8,
  FXAA: 9,
  CONTOUR: 10,
  PAINTUV: 11,
  BLUR: 12
};

// camera projection
Enums.Projection = {
  PERSPECTIVE: 0, // /!\ 
  ORTHOGRAPHIC: 1 // /!\ 
};

// camera mode
Enums.CameraMode = {
  ORBIT: 0, // /!\ 
  SPHERICAL: 1, // /!\ 
  PLANE: 2 // /!\ 
};

// used by multiresolution to choose which multi res level to render
Enums.MultiState = {
  NONE: 0,
  SCULPT: 1,
  CAMERA: 2,
  PICKING: 3
};

// actions linked to shortcuts
// tools index must match
var acc = Object.keys(Enums.Tools).length;
Enums.KeyAction = Utils.extend({
  INTENSITY: acc++,
  RADIUS: acc++,
  NEGATIVE: acc++,
  PICKER: acc++,
  DELETE: acc++,
  CAMERA_FRONT: acc++,
  CAMERA_TOP: acc++,
  CAMERA_LEFT: acc++,
  CAMERA_RESET: acc++,
  STRIFE_LEFT: acc++,
  STRIFE_RIGHT: acc++,
  STRIFE_UP: acc++,
  STRIFE_DOWN: acc++,
  WIREFRAME: acc++,
  REMESH: acc++
}, Enums.Tools);

export default Enums;
