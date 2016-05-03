// JavaScript Document
var crateTextures = Array();
var texture = {};
var textureOK = {};

function initTextures() {
	//loadTexture('jellyfish0', 'images/jellyfish128.png');
	loadTexture('jellyfish1', 'images/jellyfish256.png');
	//loadTexture('jellyfish2', 'images/jellyfish512.png');
	//loadTexture('jellyfish3', 'images/jellyfish512.png');
	
	for (var i=1; i <= 32; i++) {
		loadTexture('caustics'+i, 'images/caus/save.'+pad2(i)+'.png');
	}
}

function loadTexture(label, path) {
	textureOK[label] = 0;
	var imageFile = new Image();
	imageFile.src = path;
	
	texture[label] = gl.createTexture();
	texture[label].image = imageFile;

	imageFile.onload = function() {
		  handleLoadedTexture(texture[label], label);
	}
}

function handleLoadedTexture(textures, label) {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	
	gl.bindTexture(gl.TEXTURE_2D, textures);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);
	textureOK[label] = 1;
}

function bindTexture(name) {
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture[name]);
	gl.uniform1i(shaderProgram.sampler, 0);
}
function bindTexture1(name) {
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, texture[name]);
	gl.uniform1i(shaderProgram.sampler1, 1);
}
function pad2(number) {
     return (number < 10 ? '0' : '') + number
}