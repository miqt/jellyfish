// JavaScript Document
function getShader(gl, id) {
var shaderScript = document.getElementById(id);
if (!shaderScript) {
    return null;
}

var str = "";
var k = shaderScript.firstChild;
while (k) {
    if (k.nodeType == 3) {
      str += k.textContent;
    }
    k = k.nextSibling;
}

var shader;
if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
} else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
} else {
    return null;
}

gl.shaderSource(shader, str);
gl.compileShader(shader);

if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
}
return shader;
}

var shaderProgram;
function initShaders() {
  var jellyFS = getShader(gl, "jelly-shader-fs");
  var jellyVS = getShader(gl, "jelly-shader-vs");
  
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, jellyVS);
  gl.attachShader(shaderProgram, jellyFS);
  gl.linkProgram(shaderProgram);
	gl.useProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Could not initialise shaders");
  }
    
  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram,   "aVertexPosition");
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

  shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram,     "aVertexNormal");
  gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

  shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram,      "aVertexColor");
  gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    
  shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram,     "aTextureCoord");
  gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
  
  
  shaderProgram.world = gl.getUniformLocation(shaderProgram,              "uWorld");
  shaderProgram.worldView = gl.getUniformLocation(shaderProgram,          "uWorldView");
  shaderProgram.worldViewProj = gl.getUniformLocation(shaderProgram,      "uWorldViewProj");
  shaderProgram.worldInvTranspose = gl.getUniformLocation(shaderProgram,  "uWorldInvTranspose");
  shaderProgram.viewInv = gl.getUniformLocation(shaderProgram,            "uView");
  shaderProgram.viewInv = gl.getUniformLocation(shaderProgram,            "uViewInv");
	
  shaderProgram.sampler = gl.getUniformLocation(shaderProgram,            "uSampler");
  shaderProgram.sampler1 = gl.getUniformLocation(shaderProgram,           "uSampler1");
  
  shaderProgram.currentTime = gl.getUniformLocation(shaderProgram,        "uCurrentTime");
 
  shaderProgram.near = gl.getUniformLocation(shaderProgram,               "uNear");
  shaderProgram.far = gl.getUniformLocation(shaderProgram,                "uFar");
  shaderProgram.lightPos = gl.getUniformLocation(shaderProgram,           "uLightPos");
  shaderProgram.lightCol = gl.getUniformLocation(shaderProgram,           "uLightCol");
  shaderProgram.specCol = gl.getUniformLocation(shaderProgram,            "uLightSpecCol");
  shaderProgram.lightRadius = gl.getUniformLocation(shaderProgram,        "uLightRadius");
  shaderProgram.lightSpecPower = gl.getUniformLocation(shaderProgram,     "uSpecPower");
  shaderProgram.ambientCol = gl.getUniformLocation(shaderProgram,         "uAmbientCol");
  shaderProgram.fogCol = gl.getUniformLocation(shaderProgram,             "uFogCol");
  shaderProgram.fresnelCol = gl.getUniformLocation(shaderProgram,         "uFresnelCol");
  shaderProgram.fresnelPow = gl.getUniformLocation(shaderProgram,         "uFresnelPower");	
  
  shaderProgram.shaderDebug = gl.getUniformLocation(shaderProgram,        "uShaderDebug");
}

function updateLighing(){
	lod = parseInt($('input[name=modelDebug]:checked').val());
	near = parseFloat($("#near").val());
	far = parseFloat($("#far").val());
	fov = parseFloat($("#fov").val());
	lightPos = [parseFloat($("#lightX").val()),parseFloat($("#lightY").val()),parseFloat($("#lightZ").val())];
	lightCol = [parseFloat($("#lightR").val()),parseFloat($("#lightG").val()),parseFloat($("#lightB").val()),parseFloat($("#lightA").val())];
	ambientCol = [parseFloat($("#ambientR").val()),parseFloat($("#ambientG").val()),parseFloat($("#ambientB").val()),parseFloat($("#ambientA").val())];
	specCol = [	parseFloat($("#lightSpecR").val()),parseFloat($("#lightSpecG").val()),parseFloat($("#lightSpecB").val()),parseFloat($("#lightSpecA").val())];
	fogCol = [parseFloat($("#fogR").val()),parseFloat($("#fogG").val()),parseFloat($("#fogB").val()),parseFloat($("#fogA").val())];
	fresnelCol = [parseFloat($("#fresnelR").val()),parseFloat($("#fresnelG").val()),parseFloat($("#fresnelB").val()),parseFloat($("#fresnelA").val())];
	shaderDebug = parseInt($('input[name=shaderDebug]:checked').val());
	lightRadius = parseFloat($("#lightRadius").val());
	lightSpecPower = parseFloat($("#lightSpecPower").val());
	fresnelPower = parseFloat($("#fresnelPower").val());
	
 	gl.uniform3f(shaderProgram.lightPos, lightPos[0],lightPos[1],lightPos[2]);
  gl.uniform4f(shaderProgram.lightCol, lightCol[0], lightCol[1], lightCol[2], lightCol[3]);
	gl.uniform4f(shaderProgram.ambientCol, ambientCol[0], ambientCol[1], ambientCol[2], ambientCol[3]);
	gl.uniform4f(shaderProgram.specCol, specCol[0], specCol[1], specCol[2], specCol[3]);
	gl.uniform4f(shaderProgram.fogCol, fogCol[0], fogCol[1], fogCol[2], fogCol[3]);
	gl.uniform4f(shaderProgram.fresnelCol, fresnelCol[0], fresnelCol[1], fresnelCol[2], fresnelCol[3]);
	gl.uniform1f(shaderProgram.lightRadius, lightRadius);
	gl.uniform1f(shaderProgram.lightSpecPower, lightSpecPower);
	gl.uniform1f(shaderProgram.fresnelPow, fresnelPower);
	gl.uniform1f(shaderProgram.shaderDebug, shaderDebug);
	gl.uniform1f(shaderProgram.near, near);
	gl.uniform1f(shaderProgram.far, far);	
}
