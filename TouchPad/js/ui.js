
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var white = "#ffffff";
var red = "#ff0000";
var orange = "#ff5500";
var dark_green = "#00802b";
var light_green = "#33ff77";
var yellow = "#ffff00";
var blue = "#0033cc";
var purple = "#cc33ff";
var dark_grey = "#666666";
var light_grey = "#cccccc"

var canvas,
  c, // c is the canvas' context 2D
  container;
var touches = [];

function resetCanvas (e) {
  // resize the canvas - but remember - this clears the canvas too.
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //make sure we scroll to the top left.
  window.scrollTo(0,0); 
}


function draw() {
  c.clearRect(0,0,canvas.width, canvas.height); 
  for (var j=0; j<4; j++) {
    for (var i=0; i<9; i++) { //i = x, j = y
      if(i==0 || j==3) {
        c.fillStyle = white;
      } else if ((i==4 && j==0) || (i==5 && j==1) || (i==1 && j==2) || (i==8 && j==2)) {
        c.fillStyle = red;
      
      } else if ((i==5 && j==0) || (i==6 && j==1) || (i==2 && j==2)) {
        c.fillStyle = orange;
      } else if (i==7 && j==1) {
        c.fillStyle = dark_green;
      } else if ((i==6 && j==0) || (i==3 && j==2)) {
        c.fillStyle = light_green;
      } else if ((i==7 && j==0) || (i==1 && j==1) || (i==8 && j==1) || (i==4 && j==2)) {
        c.fillStyle = yellow;
      } else if ((i==1 && j==0) || (i==8 && j==0) || (i==2 && j==1) || (i==5 && j==2)) {
        c.fillStyle = blue;
      } else if ((i==2 && j==0) || (i==3 && j==1) || (i==6 && j==2)) {
        c.fillStyle = purple;
      } else if ((i==4 && j==1) || (i==7 && j==2)) {
        c.fillStyle = dark_grey;
      } else if (i==3 && j==0) {
        c.fillStyle = light_grey;
      } else {
      // c.fillStyle = "hsl( " + Math.round((360*(j*4+i))/16) + ", 100%, 50%)";
      c.fillStyle = blue;
      
      }
      c.fillRect( canvas.width * i / 9, canvas.height * j / 4, canvas.width/9, canvas.height/4 );
    }
  }

  for(var i=0; i<touches.length; i++)
  {
    var touch = touches[i]; 
    c.beginPath(); 
    c.fillStyle = "white";
    c.fillText( " id : "+touch.pointerId+" x:"+touch.x+" y:"+touch.y, touch.x+30, touch.y-30); 

    c.beginPath(); 
    c.strokeStyle = "cyan";
    c.lineWidth = "6";
    c.arc(touch.x, touch.y, 40, 0, Math.PI*2, true); 
    c.stroke();
  }
  //c.fillText("hello", 0,0); 

  requestAnimFrame(draw);
}

function onPointerDown(e) {
//  e.preventDefault();
  appendOutput(e.type + ' [' + e.pointerId + '] ' + e.clientX + ", " + e.clientY );

  for (var i=0; i<touches.length; i++) {
    if (touches[i].pointerId == e.pointerId) {
      touches[i].stopSound();
      touches.splice(i, 1);
    }
  }

  touches.push( new SoundEvent( e ) );

}

function onPointerMove(e) {
  // Prevent the browser from doing its default thing (scroll, zoom)
  e.preventDefault();

  for (var i=0; i<touches.length; i++) {
    if (touches[i].pointerId == e.pointerId) {
      appendOutput(e.type + ' [' + e.pointerId + '] ' + e.clientX + ", " + e.clientY );
      touches[i].x = e.clientX;
      touches[i].y = e.clientY;
      touches[i].setFilter();
      return;      
    }
  }
} 

function onPointerUp(e) { 
  // Prevent the browser from doing its default thing (scroll, zoom)
//  e.preventDefault();

  appendOutput(e.type + ' [' + e.pointerId + '] ' + e.clientX + ", " + e.clientY );

  for (var i=0; i<touches.length; i++) {
    if (touches[i].pointerId == e.pointerId) {
      touches[i].stopSound();
      touches.splice(i, 1);
      return;      
    }
  }
}


function setupCanvas() {

  canvas = document.createElement( 'canvas' );
  c = canvas.getContext( '2d' );
  container = document.createElement( 'div' );
  container.className = "container";

  canvas.width = window.innerWidth; 
  canvas.height = window.innerHeight; 
  document.body.appendChild( container );
  container.appendChild(canvas);	

  canvas.setAttribute("touch-action","none");
  c.strokeStyle = "#ffffff";
  c.lineWidth =2;
  canvas.addEventListener( 'down', onPointerDown, false );

  PolymerGestures.addEventListener(canvas, "track", onPointerMove);

  canvas.addEventListener( 'track', onPointerMove, false );
//  canvas.addEventListener( 'mousemove', onPointerMove, false );
  canvas.addEventListener( 'up', onPointerUp, false );
//  canvas.addEventListener( 'pointerleave', onPointerUp, false );

}

function init(){
  setupCanvas();
  setupAudio();

  window.onorientationchange = resetCanvas;
  window.onresize = resetCanvas;

  requestAnimFrame(draw);
}

window.addEventListener("load", init );
