var sounds = {
	//C Mixolydian scale; bottom row of letters (and comma) (zxcvbnm,)
	90: '60', // z is C4
	88: '62', // x is D4
	67: '64', // c is E4
	86: '65', // v is F4
	66: '67', // b is G4
	78: '69', // n is A4
	77: '70', // m is Bb4
	188: '72', // , is C5

	//F Mixolydian scale; middle of row of letters (asdfghjk)
	65: '65', // a is F4
	83: '67', // s is G4
	68: '69', // d is A4
	70: '70', // f is Bb4
	71: '72', // g is C5
	72: '74', // h is D5
	74: '75', // j is Eb5
	75: '77', // k is F5

	//G Mixolydian scale, top of row of letters (qwertyui)
	81: '67', // q is G4
	87: '69', // w is A4
	69: '71', // e is B4
	82: '72', // r is C5
	84: '74', // t is D5
	89: '76', // y is E5
	85: '77', // u is F5
	73: '79', // i is G5

	//C Blues scale, row of numbers (1234567)
	49: '60', // 1 is C4
	50: '63', // 2 is Eb4
	51: '65', // 3 is F4
	52: '66', // 4 is F#4
	53: '67', // 5 is G4
	54: '70', // 6 is Bb4
	55: '72' // 7 is C5
}


//play background 12-bar blues
var audio = new Audio('./sounds/blues.wav');
audio.play();



document.onkeydown = function(e) {
    var soundId = sounds[e.keyCode];
    if (soundId) document.getElementById(soundId).play();
    else console.log("key not mapped : code is", e.keyCode);
}

document.onkeyup = function(e) {
    var soundId = sounds[e.keyCode];
    if (soundId) {document.getElementById(soundId).pause();
    	document.getElementById(soundId).currentTime = 0}
    else console.log("key not mapped : code is", e.keyCode);
}



function SoundEvent( e ) {
  this.pointerId = e.pointerId;
  this.x = e.clientX;
  this.y = e.clientY;
  this.initX = this.x;
  this.initY = this.y;
  this.playSound();
}

SoundEvent.prototype.setFilter = function() {
	var factor = 1.0 - ((this.y - this.initY) / (document.body.clientHeight - this.initY));

	if (factor < 0)
		factor = 0.0;
	if (factor > 1)
		factor = 1.0;
	var value = Math.pow(2, 13 * factor);
	this.filter.frequency.value = value;
	this.filter.Q.value = 40 * Math.min(1.0, Math.max(0.0, ((this.x - this.initX)/(document.body.clientWidth - this.initX))));
}

SoundEvent.prototype.playSound = function() {
	var sourceNode = audioContext.createBufferSource();
	sourceNode.buffer = technoBuffer;
	sourceNode.loop = true;
	this.filter = audioContext.createBiquadFilter();
	this.setFilter();

	sourceNode.connect( this.filter );
	this.filter.connect( audioContext.destination );
	sourceNode.start(0);
	this.sound = sourceNode;
}

SoundEvent.prototype.stopSound = function() {
	if (this.sound)
		this.sound.stop(0);
	this.sound = null;
}

function setupAudio() {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	audioContext = new AudioContext();

	var request = new XMLHttpRequest();
	request.open("GET", "sounds/techno.wav", true);
	request.responseType = "arraybuffer";
	request.onload = function() {
	  audioContext.decodeAudioData( request.response, function(buffer) { 
	    	technoBuffer = buffer;
	    	appendOutput( "Sound ready." );
		} );
	}
	request.send();
}