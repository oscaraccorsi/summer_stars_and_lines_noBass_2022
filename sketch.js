
	

const osc2 = new Tone.Oscillator();
const rev = new Tone.Reverb().toDestination();

let crickets;
let dec; //decibel
let fr;  //frequency
let mpHeight;   //per il map
let mpWidth;

//----------------------------preLoad
function preload() {
  crickets = new Tone.Player('assets/acuti.mp3').toDestination();
}

//----------------- declare some arrays 
let x = [];
let y = []; 
let colors = []; 
let count = 0;
let arg = 20;
let num; 
let back = [true, false];
let back2 = [true, false];
let back3 = [true, false];
let bck;
let bck2;

let palette = ["#002070","#0AB957","#6054C2","#FFE600","#017958","#003276","#52095E","#FE3C00","#B086D2","#930055","#000000", "#180734","#001D8B","#085790","#0222A9","#634685","#00177D","#341A4E","#4854A0","#920050","#0004A8", "#000000" ];

//--------------------------------------------------------

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  ellipseMode(CENTER);
  frameRate(5);
  num = round(windowWidth/20);
  
//----------------------------------sound player
  crickets.volume.value = 0;
  crickets.loop = true;
  crickets.autostart = true;       
  crickets.mute = random(back);
    
  
//-----------------------------------osc setup
  //osc.connect(rev);
  rev.decay = 10;
  
  
  osc2.type = 'sine';
  osc2.volume.value = -16 ;
  osc2.start();
  osc2.chain(rev);
  osc2.toDestination();
  bck2 = random(back3);
 
//----------------------------initializing the arrays
  x.delete;
  y.delete;
  colors.delete;
  for (i=0; i < num; i++) {
    x[i] = round(random(width/arg, width-width/arg));
    y[i] = round(random(height/arg, height-height/arg));     
    colors[i] = random(palette); 
    crickets.mute = random(back);
    bck = random(back2);
    
  } 
  //-----------------------------setInterval
  
  //setInterval(inter, 1000*180);
  
}

//--------------------------------------------------------screen size

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//--------------------------------------------------------draw

function draw() {
  background(0, 25);
//-------------------------osc
  
  if (bck2 === false) {
    osc2.stop();
  }
  else {
    osc2.start();
  }
  
//-----------------------------------osc2
   
  mpHeight = map(y[count], 0, height, 6500, 13000);
  osc2.frequency.value = mpHeight;
  
//-------------------------------stars  
  
  
  let rnd = round(random(0, 20));
  fill(255);
  noStroke();
  circle(x[count], y[count], 5);
  count = count+1;
//----------------------conditional  
  if (rnd >= 19) {
    ln();
    plOsc2();
  }
  else {
    noLn();
    //noPlOsc();
    noPlOsc2();
  }
  if (count >= num) {
    count = 0;
  }   
}

//--------------------------------------------------------lines drawing

function ln() {
  strokeWeight(1);
  stroke(random(colors));
  line(x[count-1], y[count-1], x[count], y[count]);
  console.log(colors[count]);
  
  if (colors[count] == "#000000") {
    inter();
  }
}
function noLn() {
}

//---------------------playing osc2
function plOsc2() {
  osc2.mute = false;
}
function noPlOsc2() {
  osc2.mute = true;
}

//--------------------------------------------------------setInterval
function inter() {
  background(0);
  setup();    
}


