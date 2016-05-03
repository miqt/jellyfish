var world = new Matrix4x4();
var view = new Matrix4x4();
var viewInv = new Matrix4x4();
var projection = new Matrix4x4();
var worldView = new Matrix4x4();
var worldViewProj = new Matrix4x4();
var worldInvTranspose = new Matrix4x4();

function setWorldUniform(){
	gl.uniformMatrix4fv(shaderProgram.world, gl.FALSE, new Float32Array(world.elements));
}

function setWorldViewUniform(){
	worldView.loadIdentity();
	worldView.multiply(world);
  worldView.multiply(view);
	gl.uniformMatrix4fv(shaderProgram.worldView, gl.FALSE, new Float32Array(worldView.elements));
}

function setWorldInvTransposeUniform(){
  worldInvTranspose = world.inverse();
  worldInvTranspose.transpose();
  gl.uniformMatrix4fv(shaderProgram.worldInvTranspose, gl.FALSE, new Float32Array(worldInvTranspose.elements));
}

function setWorldViewProjUniform(){
	gl.uniformMatrix4fv(shaderProgram.worldViewProj, gl.FALSE, new Float32Array(worldViewProj.elements));
}

function setViewInvUniform(){
  viewInv = view.inverse();
	gl.uniformMatrix4fv(shaderProgram.viewInv, gl.FALSE, new Float32Array(viewInv.elements));
}

function setTimeUniform(){
	gl.uniform1f(shaderProgram.currentTime, currentTime);
}

function setMatrixUniforms(){
  // Compute necessary matrices
  // worldView
  worldView.loadIdentity();
  worldView.multiply(world);
  worldView.multiply(view);
  // worldViewProj
  worldViewProj.loadIdentity();
  worldViewProj.multiply(world);
  worldViewProj.multiply(view);
  worldViewProj.multiply(projection);
  // WorldInvTranspose
  worldInvTranspose = world.inverse();
  worldInvTranspose.transpose();
  // viewInv
  viewInv = view.inverse();
  // Set Uniforms
  gl.uniformMatrix4fv(shaderProgram.world, gl.FALSE, new Float32Array(world.elements));
  gl.uniformMatrix4fv(shaderProgram.worldView, gl.FALSE, new Float32Array(worldView.elements));
  gl.uniformMatrix4fv(shaderProgram.worldInvTranspose, gl.FALSE, new Float32Array(worldInvTranspose.elements));
  gl.uniformMatrix4fv(shaderProgram.worldViewProj, gl.FALSE, new Float32Array(worldViewProj.elements));
  gl.uniformMatrix4fv(shaderProgram.viewInv, gl.FALSE, new Float32Array(viewInv.elements));
}