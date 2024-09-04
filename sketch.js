// global variables
// player
var p1x = 300; // p1 stands for player 1
var p1y = 475;
var pWidth = 50;
var pHeight = 30;
var pSpeed = 3;

// rocket
var r1x = p1x; // r1 for rocket 1, rocket begins w/ player
var r1y = p1y; // ^^
var r1Position = 0; // keep track of6788tuyn  where rocket currently is
var rWidth = 7;
var rHeight = 20;
var rSpeed = 5;
var fire = false; // am I firing the rocket?

// aliens
var aWidth = 40;
var aHeight = 40;
// row 1, all have the same y-coordinate
var a1x = 50; // alien 1
var a1y = 150;
var a2x = 110; // alien 2
var a2y = 150;
var a3x = 170; // alien 3
var a3y = 150;
var a4x = 230; // alien 4
var a4y = 150;
var a5x = 290; // alien 5
var a5y = 150;
var a6x = 350; // alien 6
var a6y = 150;
var a7x = 410; // alien 7
var a7y = 150;
var a8x = 470; // alien 8
var a8y = 150;
var a9x = 530; // alien 9
var a9y = 150;

// row 2
var a10x = 50; // alien 10
var a10y = 210;
var a11x = 110; // alien 11
var a11y = 210;
var a12x = 170; // alien 12
var a12y = 210;
var a13x = 230; // alien 13
var a13y = 210;
var a14x = 290; // alien 14
var a14y = 210;
var a15x = 350; // alien 15
var a15y = 210;
var a16x = 410; // alien 16
var a16y = 210;
var a17x = 470; // alien 17
var a17y = 210;
var a18x = 530; // alien 18
var a18y = 210;

// meteors, shrink as we hit them
var m1x = 100; // m1 for meteor 1
var m1y = 400; 
var m1Size = 50; // square, one size for width and height
var m2x = 300; // m2 for meteor 2
var m2y = 400; 
var m2Size = 50; // square, one size for width and height
var m3x = 500; // m3 for meteor 3
var m3y = 400; 
var m3Size = 50; // square, one size for width and height

// counters
var score = 0;
var stage = 0; // which function should be running rn?
var totalTime;
var welcomeTime; // time spent on welcome screen
var gameTime; // time spent playing actual game
var timeLimit = 30; // how long until player loses

// background audio
var osc;
var pitch;
var pitchArray = [60, 63, 67, 70, 72]; 
var whichNote = 0;

// sound effects
var volume = 0.35;// made it a variable so it can easily be changed

function preload() {
  // load in sound effects
  launchRocket = loadSound("mixkit-arcade-retro-jump-223.wav");
  alienExplosion = loadSound("mixkit-fast-game-explosion-1688.wav");
  
}
function setup() {
  createCanvas(600, 500);
  
  // set modes
  rectMode(CENTER); // sets rectangle mode to center
  textAlign(CENTER); // centers text
  
  // background music
  osc = new p5.SawOsc();
  osc.amp(0.075);
  mySoundLoop = new p5.SoundLoop(onSoundLoop, 0.125);
} // close setup

function draw() {
  // start clock
  totalTime = millis(); // internal clock function
  
  // welcome screen
  if (stage == 0) {
    welcome();
  }
  
  // the actual game
  if (stage == 1) {
    game();
  }
  
  // win screen
  if (stage == 2) {
    win();
  }
  
  // lose screen
  if (stage == 3) {
    lose();
  }
  
  if (mouseIsPressed == true) {
    stage = 1;
  } // close, start game on click
} // close draw

function welcome() {
  // start clock
  welcomeTime = totalTime; // keeps track of how long you're on welcome screen
  
  background(0); // black
  
  // appearance of world
  stroke(0, 255, 0); // green
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height); // center of screen
  noStroke();
  
  // words for welcome
  fill(0,255,0); // green
  textSize(60);
  text('SPACE INVADERZ', width/2, 100); // title
  textSize(15);
  text('PROGRAMMED BY JESSICA UGWOKE', width/2, 130); // credits
  
  textSize(60);
  text('HOW TO PLAY', width/2, 250); // instructions title
  
  // instructions
  textSize(15);
  text('PRESS LEFT AND RIGHT ARROWS TO MOVE', width/2, 290);
  text('PRESS S TO FIGHT ALIENS', width/2, 320);
  text('OBJECTIVE: BEAT ALL ALIENS', width/2, 350);

  text('CLICK ANYWHERE ON THE SCREEN TO BEGIN!', width/2, 450);
} // close welcome


function win() {
  background(0, 255, 0); // green
  
  // appearance of world
  stroke(0); // black
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height); // center of screen
  noStroke();
  
  // words for win
  fill(0); // black
  textSize(60);
  text('YOU WIN!!!', width/2, 200);
  textSize(15);
  text('Wanna play again? REFRESH!', width/2, 230);
  
  textSize(50);
  text('SCORE: ', width/2-50, 400);
  text(score, width/2+100, 400);
} // close win

function lose() {
  background(255, 0, 0); // red
  
  // appearance of world
  stroke(0); // black
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height); // center of screen
  noStroke();
  
  // words for lose
  fill(0); // black
  textSize(60);
  text('YOU LOSE!!!', width/2, 200);
  textSize(15);
  text('Wanna try again? REFRESH!', width/2, 230);
  textSize(50);
  text('SCORE: ', width/2-50, 400);
  text(score, width/2+100, 400);
} // close lose


function game() {
  // stop welcome screen time, starts game time
  welcomeTime = welcomeTime;
  
  // call looping functions
  keyPressed(); // means when draw happens, keypressed happens (loops)
  keyTyped();
  
  background(0); // black
  
  // appearance of world
  stroke(0, 255, 0); // green
  noFill();
  strokeWeight(3);
  rect(width/2, height/2, width, height); // center of screen
  noStroke();
  fill(0, 255, 0); // green
  rect(width/2, 25, width, 50); // banner
  
  // draw player
  stroke(0, 0, 255); // blue
  fill(173, 216, 255); // light blue
  rect(p1x, p1y, pWidth, pHeight); // rectangle substitute for player
  
  // draw aliens
  strokeWeight(4);
  stroke(0, 255, 0); // light green
  fill(1, 50, 32); // dark green
  rect(a1x, a1y, aWidth, aHeight); // aliens for row 1
  rect(a2x, a2y, aWidth, aHeight);
  rect(a3x, a3y, aWidth, aHeight);
  rect(a4x, a4y, aWidth, aHeight);
  rect(a5x, a5y, aWidth, aHeight);
  rect(a6x, a6y, aWidth, aHeight);
  rect(a7x, a7y, aWidth, aHeight);
  rect(a8x, a8y, aWidth, aHeight);
  rect(a9x, a9y, aWidth, aHeight);
  rect(a10x, a10y, aWidth, aHeight); // aliens for row 2
  rect(a11x, a11y, aWidth, aHeight);
  rect(a12x, a12y, aWidth, aHeight);
  rect(a13x, a13y, aWidth, aHeight);
  rect(a14x, a14y, aWidth, aHeight);
  rect(a15x, a15y, aWidth, aHeight);
  rect(a16x, a16y, aWidth, aHeight);
  rect(a17x, a17y, aWidth, aHeight);
  rect(a18x, a18y, aWidth, aHeight);
  noStroke();
  
  // run rocket function
  rockets();
  
  // collisions b/w rocket and aliens
  aliens(); // function for collisions
  
  // meteor
  meteors();
  
  
  // gametime functions
  welcomeTime = welcomeTime; // stop welcome timer, saves time on welcome screen
  gameTime = int((totalTime-welcomeTime)/1000); // converts milliseconds to seconds, casts to int
  
  // status bar
  // score
  fill(0); // black
  textSize(25);
  text('Score: ', 50, 35);
  text(score, 100, 35);
  
  // timer
  textSize(25);
  text('TIME: ', 510, 35);
  textSize(25);
  text(timeLimit-gameTime, 560, 35);
  
  // exiting stages
  if (score == 18) {
    stage = 2;
  } // close max score, you win!
  
  if (gameTime >= timeLimit && score != 18) {
    stage = 3;
  } // close, if you run out of time you lose
} // close game

function rockets() {
  // rocket positions
    // 0 = w/ player 1, ready to be fired
    // 1 = in motion after firing
    // 2 = collision w object, return to p1
  
  // draw rocket
  fill(26, 175, 255); // light blue
  rect(r1x, r1y, rWidth, rHeight); // rocket, as rectangle
  
  // keep track and fire rockets
  if (fire == true && r1Position == 0) {
    r1Position = 1;
    launchRocket.play();
    launchRocket.setVolume(0.25);
  } // close fire
  
  // fire rockets
  if (r1Position == 1) {
    r1x = r1x; // stop following p1
    r1y = r1y - rSpeed; // move vertically
    
    // if exceeds window or misses
    if (r1y <= 0) {
      r1Position = 2; // reload
    } // close exceed, so send back
  } // close fire if statement
  
  else {
    // when you are not firing, the rocket should be w/ p1
    r1y = p1y;
    r1x = p1x;
  } // close else
  
  // reload on number 2 command
  if (r1Position == 2) {
    r1y = p1y;
    r1x = p1x;
    r1Position = 0; // reset, fire again
  }
} // close rockets

function aliens() {
  // collision w/ alien 1
  if (r1x >= a1x-aWidth/2 && r1x <= a1x+aWidth/2 && r1y >= a1y-aHeight/2 && r1y <= a1y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a1x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision 
  
  // collision w/ alien 2
  if (r1x >= a2x-aWidth/2 && r1x <= a2x+aWidth/2 && r1y >= a2y-aHeight/2 && r1y <= a2y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a2x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 3
  if (r1x >= a3x-aWidth/2 && r1x <= a3x+aWidth/2 && r1y >= a3y-aHeight/2 && r1y <= a3y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a3x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 4
  if (r1x >= a4x-aWidth/2 && r1x <= a4x+aWidth/2 && r1y >= a4y-aHeight/2 && r1y <= a4y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a4x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 5
  if (r1x >= a5x-aWidth/2 && r1x <= a5x+aWidth/2 && r1y >= a5y-aHeight/2 && r1y <= a5y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a5x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 6
  if (r1x >= a6x-aWidth/2 && r1x <= a6x+aWidth/2 && r1y >= a6y-aHeight/2 && r1y <= a6y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a6x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 7
  if (r1x >= a7x-aWidth/2 && r1x <= a7x+aWidth/2 && r1y >= a7y-aHeight/2 && r1y <= a7y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a7x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 8
  if (r1x >= a8x-aWidth/2 && r1x <= a8x+aWidth/2 && r1y >= a8y-aHeight/2 && r1y <= a8y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a8x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 9
  if (r1x >= a9x-aWidth/2 && r1x <= a9x+aWidth/2 && r1y >= a9y-aHeight/2 && r1y <= a9y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a9x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 10
  if (r1x >= a10x-aWidth/2 && r1x <= a10x+aWidth/2 && r1y >= a10y-aHeight/2 && r1y <= a10y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a10x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 11
  if (r1x >= a11x-aWidth/2 && r1x <= a11x+aWidth/2 && r1y >= a11y-aHeight/2 && r1y <= a11y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a11x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 12
  if (r1x >= a12x-aWidth/2 && r1x <= a12x+aWidth/2 && r1y >= a12y-aHeight/2 && r1y <= a12y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a12x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 13
  if (r1x >= a13x-aWidth/2 && r1x <= a13x+aWidth/2 && r1y >= a13y-aHeight/2 && r1y <= a13y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a13x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 14
  if (r1x >= a14x-aWidth/2 && r1x <= a14x+aWidth/2 && r1y >= a14y-aHeight/2 && r1y <= a14y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a14x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 15
  if (r1x >= a15x-aWidth/2 && r1x <= a15x+aWidth/2 && r1y >= a15y-aHeight/2 && r1y <= a15y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a15x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 16
  if (r1x >= a16x-aWidth/2 && r1x <= a16x+aWidth/2 && r1y >= a16y-aHeight/2 && r1y <= a16y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a16x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 17
  if (r1x >= a17x-aWidth/2 && r1x <= a17x+aWidth/2 && r1y >= a17y-aHeight/2 && r1y <= a17y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a17x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
  
   // collision w/ alien 18
  if (r1x >= a18x-aWidth/2 && r1x <= a18x+aWidth/2 && r1y >= a18y-aHeight/2 && r1y <= a18y+aHeight/2) {
    // collision b/w rockets and alien
    score = score+1 // add points 
    a18x = -1000; // alien disappears, sent offscreen
    r1Position = 2; // rocket goes back to player
    alienExplosion.play();
    alienExplosion.setVolume(volume);
  } // close collision
} // close aliens

function meteors() {
  // draw meteors on screen
  strokeWeight(1); 
  stroke(255, 255, 255); // white
  fill(128,128,128); // grey
  rect(m1x, m1y, m1Size, m1Size); // square
  fill(128,128,128); // grey
  rect(m2x, m2y, m2Size, m2Size); // square
  fill(128,128,128); // grey
  rect(m3x, m3y, m3Size, m3Size); // square
  
  // rocket collisons w/ meteors
  //meteor 1
  if(r1x >= m1x-m1Size/2 && r1x <= m1x+m1Size/2 && r1y >= m1y-m1Size/2 && r1y <= m1y+m1Size/2) {
     if (m1Size >= 20) {
       // meteor is still there
       m1Size = m1Size-10; // makes meteor smaller
       r1Position = 2; // rocket goes back to player
     } // if meteor is large
    else {
      m1x = -1000; // meteor disappears from screen
      r1Position = 2; // rocket goes back to player
    } // else meteor is small
     }
  
  //meteor 2
  if(r1x >= m2x-m2Size/2 && r1x <= m2x+m2Size/2 && r1y >= m2y-m2Size/2 && r1y <= m2y+m2Size/2) {
     if (m2Size >= 20) {
       // meteor is still there
       m2Size = m2Size-10; // makes meteor smaller
       r1Position = 2; // rocket goes back to player
     } // if meteor is large
    else {
      m2x = -1000; // meteor disappears from screen
      r1Position = 2; // rocket goes back to player
    } // else meteor is small
     }
  
  //meteor 3
  if(r1x >= m3x-m3Size/2 && r1x <= m3x+m3Size/2 && r1y >= m3y-m3Size/2 && r1y <= m3y+m3Size/2) {
     if (m3Size >= 20) {
       // meteor is still there
       m3Size = m3Size-10; // makes meteor smaller
       r1Position = 2; // rocket goes back to player
     } // if meteor is large
    else {
      m3x = -1000; // meteor disappears from screen
      r1Position = 2; // rocket goes back to player
    } // else meteor is small
     }
  
  
} // close meteors

function keyPressed() {
  // for arrow keys/coded keys
  
  if (keyCode == LEFT_ARROW && keyIsPressed) {
      p1x = p1x - pSpeed;
      } // close left pressed
  
  if (keyCode == RIGHT_ARROW && keyIsPressed) {
      p1x = p1x + pSpeed;
      } // close right pressed
  
} // close keypressed

function keyTyped() {
  // for alphanumeric keys
  
  if (key == 's' && keyIsPressed) {
    fire = true; // fire rocket on key press
  } // close if s is true
  
  else {
    fire = false;
  } // close else not s
} // close keytyped

function onSoundLoop() {
  // sound loop
    pitch = midiToFreq(pitchArray[whichNote]);
    whichNote = (whichNote+1) % 5;
    osc.freq(pitch);
  } // close onsoundloop

function mousePressed() {
  // mousepressed function, starts background music
  osc.start();
  mySoundLoop.start();
} // close mousepressed