//letters on keyboard in ASCII, bottom to top row, left to right
var soundskey = [90,88,67,86,66,78,77,188,65,83,68,70,71,72,74,75,81,87,69,82,84,89,85,73,49,50,51,52,53,54,55];
var midiNums = [60,62,63,64,65,66,67,69,70,71,72,74,75,76,77,79];
var trumpetFiles = {};
var d = new Date(); // getTime() returns time of when the date object was made
var first = true;
var second = false;
// var starthr = d.getHours();
// var startmin = d.getMinutes();
// var startsec = d.getSeconds();
// var startmil = d.getMilliseconds();
var startTime = 0; //defined in init
var currTime = 0;

// shim layer with setTimeout fallback
// pick one based on which browser you have;
// callback: pass in another function as one of the parameters to the function to specify which function you want to use at that time
// if a method calls this function, do that method 60 times per second
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
var light_blue = "#e6ffff";

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

// Katherine would use a map/dictionary to map the notes to the color, and use a 2-D array.
// possibly use divs, with ids/classes, and use getElementByID to change the div's color upon a keypress?
function draw() {
    c.clearRect(0,0,canvas.width, canvas.height); 
    var text;
    for (var j=0; j<5; j++) {
        for (var i=0; i<9; i++) { //i = x, j = y
            if ((i==4 && j==0) || (i==5 && j==1) || (i==1 && j==2) || (i==8 && j==2) || (i==1 && j==4) || (i==7 && j==4)) {
                c.fillStyle = red;
                text="C";
            }
            else if ((i==5 && j==0) || (i==6 && j==1) || (i==2 && j==2)) {
                c.fillStyle = orange;
                text="D";
            }
            else if ((i==7 && j==1) || (i==2 && j==4)) {
                c.fillStyle = dark_green;
                text="E\u1d47";
            }
            else if ((i==6 && j==0) || (i==3 && j==2)) {
                c.fillStyle = light_green;
                text="E";
            }
            else if ((i==7 && j==0) || (i==1 && j==1) || (i==8 && j==1) || (i==4 && j==2) || (i==3 && j==4)) {
                c.fillStyle = yellow;
                text="F";
            }
            else if ((i==1 && j==0) || (i==8 && j==0) || (i==2 && j==1) || (i==5 && j==2) || (i==5 && j==4)) {
                c.fillStyle = blue;
                text="G";
            }
            else if (i==4 && j==4) {
                c.fillStyle = light_yellow;
                text="F#"
            }
            else if ((i==2 && j==0) || (i==3 && j==1) || (i==6 && j==2)) {
                c.fillStyle = purple;
                text="A";
            }
            else if ((i==4 && j==1) || (i==7 && j==2) || (i==6 && j==4) || (i==6 && j==4)) {
                c.fillStyle = dark_grey;
                text="B\u1d47";
            }
            else if (i==3 && j==0) {
                c.fillStyle = light_grey;
                text="B"
            }
            else {
            // c.fillStyle = "hsl( " + Math.round((360*(j*4+i))/16) + ", 100%, 50%)";
            c.fillStyle = blue;
            }

            if (!((i==0 || j==3) || (i==8 && j==4))) {
                for(var k = 0; k < soundskey.length; k++) {
                    var soundsentry = sounds[soundskey[k]];
                    if (soundsentry[2] == i && soundsentry[3] == j && soundsentry[1]) {
                        c.fillStyle = light_blue;
                    }
                }
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

    fontratio = 30/705;
    fontsize = canvas.height * fontratio;
    // c.fillText("C", canvas.width*0.04, (canvas.height/8)*7);

    // for(var i=0; i<touches.length; i++)
    // {
    //   var touch = touches[i]; 
    //   c.beginPath(); 
    //   c.fillStyle = "white";
    //   c.fillText( " id : "+touch.pointerId+" x:"+touch.x+" y:"+touch.y, touch.x+30, touch.y-30); 

    //   c.beginPath(); 
    //   c.strokeStyle = "cyan";
    //   c.lineWidth = "6";
    //   c.arc(touch.x, touch.y, 40, 0, Math.PI*2, true); 
    //   c.stroke();
    // }
    // //c.fillText("hello", 0,0); 
    fontratio = 90 / 1277;
    fontsize = canvas.width * fontratio;
    
    d = new Date(); 
    currTime = d.getTime();
    if(second) {
        currTime -= 2210;
    }
    

    console.log("draw");
    

    // if (currTime-startTime == 2210) {
    //   startTime = currTime;
    // }

    // if (startTime === 0)
    // {
    //     console.log("jksdlafjklsajfklsajfjdsalfaslk");
    // }

    if (currTime-startTime < 2210) {

    }
    else if((currTime-startTime) > 2210 && (currTime-startTime)< 10228) {
        if(!first && !second) {
            second = true;
        }
        c.fillStyle = black;
        c.fillRect(canvas.width * 0/9, canvas.height*2/5,canvas.width/9,canvas.height/5);
        c.fillStyle = white;
        c.font = fontsize.toString() + "px Ariel";
        c.fillText("C\u2077", 100*fontratio, (canvas.height/10)*5+30);
    }
    else if ((currTime-startTime) < 14237) {
        c.fillStyle = black;
        c.fillRect(canvas.width * 0/9, canvas.height*1/5,canvas.width/9,canvas.height/5);
        c.fillStyle = white;
        c.font = fontsize.toString() + "px Ariel";
        c.fillText("F\u2077", 100*fontratio, (canvas.height/10)*3+30);
    }
    else if ((currTime-startTime) < 18213) {
        c.fillStyle = black;
        c.fillRect(canvas.width * 0/9, canvas.height*2/5,canvas.width/9,canvas.height/5);
        c.fillStyle = white;
        c.font = fontsize.toString() + "px Ariel";
        c.fillText("C\u2077", 100*fontratio, (canvas.height/10)*5+30);
    }
    else if ((currTime-startTime) < 20209) {
        c.fillStyle = black;
        c.fillRect(canvas.width * 0/9, canvas.height*0/5,canvas.width/9,canvas.height/5);
        c.fillStyle = white;
        c.font = fontsize.toString() + "px Ariel";
        c.fillText("G\u2077", 100*fontratio, (canvas.height/10)+30);
    }
    else if ((currTime-startTime) < 22220) {
        c.fillStyle = black;
        c.fillRect(canvas.width * 0/9, canvas.height*1/5,canvas.width/9,canvas.height/5);
        c.fillStyle = white;
        c.font = fontsize.toString() + "px Ariel";
        c.fillText("F\u2077", 100*fontratio, (canvas.height/10)*3+30);
    }
    else if ((currTime-startTime) < 24387) {
        c.fillStyle = black;
        c.fillRect(canvas.width * 0/9, canvas.height*2/5,canvas.width/9,canvas.height/5);
        c.fillStyle = white;
        c.font = fontsize.toString() + "px Ariel";
        c.fillText("C\u2077", 100*fontratio, (canvas.height/10)*5+30);
    }
    else if ((currTime-startTime) < 26186) {
        c.fillStyle = black;
        c.fillRect(canvas.width * 0/9, canvas.height*0/5,canvas.width/9,canvas.height/5);
        c.fillStyle = white;
        c.font = fontsize.toString() + "px Ariel";
        c.fillText("G\u2077", 100*fontratio, (canvas.height/10)+30);
        if(first) {
            first = false;
        }
    }
    else {
        d = new Date();
        startTime = d.getTime()-2210-2210;
    }


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

//somebody will pass in mininums to this
function load_recur(audionums, cb) {
    if (audionums.length === 0) {
        cb();
    }
    else {
        var n = audionums.shift();
        var filepath = './trumpetsounds/' + String(n) + '.wav';
        console.log(filepath);
        var tempAudio = new Audio(filepath);
        trumpetFiles[n] = tempAudio;
        tempAudio.addEventListener('canplaythrough', load_recur(audionums, cb), false);
    }
}

function audioCallback() {
    //play background 12-bar blues
    var audio = new Audio('./sounds/blues.wav');
    audio.addEventListener('canplaythrough', function() {
        d = new Date();
        startTime = d.getTime();
        audio.play();
        requestAnimFrame(draw);
    }, false);
}

function init(){
    setupCanvas();
    setupAudio();

    window.onorientationchange = resetCanvas;
    window.onresize = resetCanvas;

    load_recur(midiNums, audioCallback);

    console.log("init, start time: " + startTime);
}

confirm("Welcome to an introduction to improvsing on the 12-bar blues! Soon, a track with the 12-bar blues in the key of C will play.\n "
    + "A little about the 12-bar blues: it begins with 4 bars of the I chord, 2 bars of the IV chord, 2 bars of the I chord, then V-IV-I-V with one bar each.\n"
    + "Check the instructions in the README for more detail!");
confirm("Your keyboard is your instrument! Each row pertains to a certain scale under the given harmony, and we'll highlight which harmony is playing at the time.\n"
    + "The row of numbers is the C blues scale, which can be played at any time during the blues, regardless of harmony.\n"
    + "Once you hit OK, get familiar to the timing of the 12-bar blues, and hear what sounds good. Have fun improvising!");

window.addEventListener("load", init );