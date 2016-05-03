// JavaScript Document
var currentTime = 0;
var loop32Frame = 0;
var lastTime = 0;
var yRot = 0;

function animate() {
  var millis = new Date().getTime();
  var timeNow = new Date().getTime();
  if (lastTime != 0) {
    var elapsed = timeNow - lastTime;
    currentTime = millis%100000000 / 1000;
		yRot += (2 * elapsed) / 1000.0;
  }
  lastTime = timeNow;
  loop32Frame = parseInt(currentTime*30 % 32 + 1);
  $("#current-time").text(parseInt(currentTime));
  $("#frameRate").text(parseInt(1000.0/elapsed));
}

function tick() {
  animate();
  setTimeUniform();
  updateLighing();
  drawScene();
}