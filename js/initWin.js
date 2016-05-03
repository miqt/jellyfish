// JavaScript Document<script type="text/javascript">
var gl;
var canvas;

function initWin(){
    docWidth = $(document).width();
    docHeight = $(document).height();
    $("#webgl-canvas").width(docWidth);
    $("#webgl-canvas").height(docHeight);    
   }
  
function initCanvas() {
  canvas.width = docWidth;
  canvas.height = docHeight;
  try {
      gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = docWidth;
      gl.viewportHeight = docHeight;
    } catch(e) {
    }
    if (!gl) {
      alert("Your browser doesn't appear to support WebGL");
    }
}
function webGLStart() {
  canvas = document.getElementById("webgl-canvas");
  initWin();
  initCanvas();
  initShaders();
  initTextures();
  initBuffers();
  setMatrixUniforms();

  gl.clearColor(0., 0., 0., 0.);
  gl.clearDepth(1.);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  gl.enable(gl.BLEND);
  gl.enable(gl.DEPTH_TEST);

  gl.depthFunc(gl.LEQUAL);

  setInterval(tick, 10);
}
  