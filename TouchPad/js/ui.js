
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
var yellow = "#e6e600";
var light_yellow = "#ffff99"
var blue = "#0033cc";
var purple = "#cc33ff";
var dark_grey = "#666666";
var light_grey = "#cccccc"
var black = "#000000";

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
  var text
  for (var j=0; j<5; j++) {
    for (var i=0; i<9; i++) { //i = x, j = y
      if ((i==4 && j==0) || (i==5 && j==1) || (i==1 && j==2) || (i==8 && j==2) || (i==1 && j==4) || (i==7 && j==4)) {
        c.fillStyle = red;
        text="C";
      } else if ((i==5 && j==0) || (i==6 && j==1) || (i==2 && j==2)) {
        c.fillStyle = orange;
        text="D";
      } else if ((i==7 && j==1) || (i==2 && j==4)) {
        c.fillStyle = dark_green;
        text="E\u1d47";
      } else if ((i==6 && j==0) || (i==3 && j==2)) {
        c.fillStyle = light_green;
        text="E";
      } else if ((i==7 && j==0) || (i==1 && j==1) || (i==8 && j==1) || (i==4 && j==2) || (i==3 && j==4)) {
        c.fillStyle = yellow;
        text="F";
      } else if ((i==1 && j==0) || (i==8 && j==0) || (i==2 && j==1) || (i==5 && j==2) || (i==5 && j==4)) {
        c.fillStyle = blue;
        text="G";
      } else if (i==4 && j==4) {
        c.fillStyle = light_yellow;
        text="F#"
      } else if ((i==2 && j==0) || (i==3 && j==1) || (i==6 && j==2)) {
        c.fillStyle = purple;
        text="A";
      } else if ((i==4 && j==1) || (i==7 && j==2) || (i==6 && j==4) || (i==6 && j==4)) {
        c.fillStyle = dark_grey;
        text="B\u1d47";
      } else if (i==3 && j==0) {
        c.fillStyle = light_grey;
        text="B"
      }

      else {
      // c.fillStyle = "hsl( " + Math.round((360*(j*4+i))/16) + ", 100%, 50%)";
      c.fillStyle = blue;
      }

      if (!((i==0 || j==3) || (i==8 && j==4))) {
        c.fillRect( canvas.width * i / 9, canvas.height * j / 5, canvas.width/9, canvas.height/5 );
        c.font = "80px Ariel";
        c.fillStyle = black;
        c.fillText(text, canvas.width*i/9+40, canvas.height*j/5+110)
      }
    }
  }

  fontratio = 90 / 1277;
  fontsize = canvas.width * fontratio;
  c.font = fontsize.toString() + "px Ariel";
  c.fillStyle = black;
  c.fillText("G\u2077", 100*fontratio, (canvas.height/10)+30);
  c.fillText("F\u2077", 100*fontratio, (canvas.height/10)*3+30);
  c.fillText("C\u2077", 100*fontratio, (canvas.height/10)*5+30);
  c.font = "20px Ariel";
  c.fillText("C Blues Scale", 100*fontratio, (canvas.height/10)*9);
  c.fillText("12-bar Blues",(canvas.width/9)*8+canvas.width*0.01, (canvas.height/10)*9-10);
  c.fillText("in C",(canvas.width/9)*8+canvas.width*0.04, (canvas.height/10)*9+10);
  c.font = fontsize.toString() + "px Ariel";
  //c.fillText("       1    2    3   4    5    6   7    1", 100*fontratio, (canvas.height/8)*7);
  fontratio = 55/705
  fontsize = canvas.height * fontratio;
  c.fillText("1", (canvas.width/9)+canvas.width*0.04, (canvas.height/10)*8-30);
  c.fillText("2", (canvas.width/9)*2+canvas.width*0.04, (canvas.height/10)*8-30);
  c.fillText("3", (canvas.width/9)*3+canvas.width*0.04, (canvas.height/10)*8-30);
  c.fillText("4", (canvas.width/9)*4+canvas.width*0.04, (canvas.height/10)*8-30);
  c.fillText("5", (canvas.width/9)*5+canvas.width*0.04, (canvas.height/10)*8-30);
  c.fillText("6", (canvas.width/9)*6+canvas.width*0.04, (canvas.height/10)*8-30);
  c.fillText("7", (canvas.width/9)*7+canvas.width*0.04, (canvas.height/10)*8-30);
  c.fillText("1", (canvas.width/9)*8+canvas.width*0.04, (canvas.height/10)*8-30);

  fontratio = 30/705
  fontsize = canvas.height * fontratio;
  // c.fillText("C", canvas.width*0.04, (canvas.height/8)*7);

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
