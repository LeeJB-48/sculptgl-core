import ExportOBJ from 'files/ExportOBJ';
import ExportSGL from 'files/ExportSGL';
import ExportPLY from 'files/ExportPLY';
import ExportSTL from 'files/ExportSTL';
// External service exports removed for library version
// import ExportSketchfab from 'files/ExportSketchfab';
// import ExportSculpteo from 'files/ExportSculpteo';
// import ExportMaterialise from 'files/ExportMaterialise';

var Export = {};
Export.exportOBJ = ExportOBJ.exportOBJ;
Export.exportSGL = ExportSGL.exportSGL;
Export.exportAsciiPLY = ExportPLY.exportAsciiPLY;
Export.exportBinaryPLY = ExportPLY.exportBinaryPLY;
Export.exportAsciiSTL = ExportSTL.exportAsciiSTL;
Export.exportBinarySTL = ExportSTL.exportBinarySTL;
// External service exports removed for library version
// Export.exportSketchfab = ExportSketchfab.exportSketchfab;
// Export.exportSculpteo = ExportSculpteo.exportSculpteo;
// Export.exportMaterialise = ExportMaterialise.exportMaterialise;

export default Export;
