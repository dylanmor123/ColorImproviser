var sounds = {
	//C Mixolydian scale; bottom row of letters (and comma) (zxcvbnm,)
	90: ['60',false, 1, 2], // z is C4
	88: ['62',false, 2, 2], // x is D4
	67: ['64',false, 3, 2], // c is E4
	86: ['65',false, 4, 2], // v is F4
	66: ['67',false, 5, 2], // b is G4
	78: ['69',false, 6, 2], // n is A4
	77: ['70',false, 7, 2], // m is Bb4
	188: ['72',false, 8, 2], // , is C5

	//F Mixolydian scale; middle of row of letters (asdfghjk)
	65: ['65',false, 1, 1], // a is F4
	83: ['67',false, 2, 1], // s is G4
	68: ['69',false, 3, 1], // d is A4
	70: ['70',false, 4, 1], // f is Bb4
	71: ['72',false, 5, 1], // g is C5
	72: ['74',false, 6, 1], // h is D5
	74: ['75',false, 7, 1], // j is Eb5
	75: ['77',false, 8, 1], // k is F5

	//G Mixolydian scale, top of row of letters (qwertyui)
	81: ['67',false, 1, 0], // q is G4
	87: ['69',false, 2, 0], // w is A4
	69: ['71',false, 3, 0], // e is B4
	82: ['72',false, 4, 0], // r is C5
	84: ['74',false, 5, 0], // t is D5
	89: ['76',false, 6, 0], // y is E5
	85: ['77',false, 7, 0], // u is F5
	73: ['79',false, 8, 0], // i is G5

	//C Blues scale, row of numbers (1234567)
	49: ['60',false, 1, 4], // 1 is C4
	50: ['63',false, 2, 4], // 2 is Eb4
	51: ['65',false, 3, 4], // 3 is F4
	52: ['66',false, 4, 4], // 4 is F#4
	53: ['67',false, 5, 4], // 5 is G4
	54: ['70',false, 6, 4], // 6 is Bb4
	55: ['72',false, 7, 4] // 7 is C5
}


//play background 12-bar blues
var audio = new Audio('./sounds/blues.wav');
audio.play();

// var flash90 = false;
// var flash88 = false;
// var flash67 = false;
// var flash86 = false;
// var flash66 = false;
// var flash78 = false;
// var flash77 = false;
// var flash188 = false;

// var flash65 = false;
// var flash83 = false;
// var flash68 = false;
// var flash70 = false;
// var flash71 = false;
// var flash72 = false;
// var flash74 = false;
// var flash75 = false;

// var flash81 = false;
// var flash87 = false;
// var flash69 = false;
// var flash82 = false;
// var flash84 = false;
// var flash89 = false;
// var flash85 = false;
// var flash73 = false;



document.onkeydown = function(e) {
    var soundId = sounds[e.keyCode][0];
    if (soundId) document.getElementById(soundId).play();
    else console.log("key not mapped : code is", e.keyCode);
    sounds[e.keyCode][1] = true;
}

document.onkeyup = function(e) {
    var soundId = sounds[e.keyCode][0];
    if (soundId) {document.getElementById(soundId).pause();
    	document.getElementById(soundId).currentTime = 0}
    else console.log("key not mapped : code is", e.keyCode);
    sounds[e.keyCode][1] = false;
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