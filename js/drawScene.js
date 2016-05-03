// JavaScript Document
// Uniform variables

var lod = 0;
var near = 20;
var far = 120;
var fov = 30;

function drawScene() {
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
	if (bufferOK['jellyfish'+lod] == 1){
		
		projection.loadIdentity();
		projection.perspective(fov, gl.viewportWidth / gl.viewportHeight, near, far);
		
		if (textureOK['caustics'+loop32Frame] == 1){
			bindTexture1('caustics'+loop32Frame);	
		}

		view.loadIdentity();
		world.loadIdentity();
		
		world.translate(0, 5, -75);
		world.rotate(Math.sin(yRot/10)*30, 0, 1, 0);
		world.rotate(Math.sin(yRot/20)*30, 1, 0, 0);
		world.scale(5,5,5);
		world.translate(0,Math.sin(yRot/10)*2.5,0);
  
		drawJellyfish();
	}
	
  gl.flush();
}

function drawJellyfish(){
  setMatrixUniforms();
  bindTexture('jellyfish'+lod);
  bindBuffers('jellyfish'+lod);
  drawBuffer('jellyfish'+lod);
}