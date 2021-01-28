//Creating Variables
var sword,swordimg,fruit,enemy,enemyimg;
var fruitimg1,fruitimg2,fruitimg3,fruitimg4;
var gameoverimg,gameover;
var gameoversound,knifesound;
var PLAY=1;
var END=0;
var gameState=PLAY;
var fruitgrp,enemygrp;
var score=0;


//Loading Images and sounds
function preload()
{
  swordimg=loadImage("sword.png") 
  fruitimg1=loadImage("fruit1.png")
  fruitimg2=loadImage("fruit2.png")
  fruitimg3=loadImage("fruit3.png")
  fruitimg4=loadImage("fruit4.png")
  enemyimg=loadImage("alien1.png")
  gameoverimg=loadImage("gameover.png")
  gameoversound=loadSound("gameover.mp3");
  knifesound=loadSound("knifeSwooshSound.mp3");
}

function setup()
{
  createCanvas(600,400)
  //Creating Sword/Knife
  sword=createSprite(50,200,20,20)
  sword.addImage(swordimg)
  sword.scale=0.7
  //Creating Groups for fruits and enemies
  fruitgrp=createGroup();
  enemygrp=createGroup();
  //Creating gameover image
  gameover=createSprite(300,200)
  gameover.addImage(gameoverimg)
}

function draw()
{
  background("pink")
  drawSprites();
  //Calling Fruits and Enemy functionns
  Fruits();
  Enemy();
  
  //Moving sword with mouse
  if(gameState===PLAY)
    {
      gameover.visible=false;
      sword.y=mouseY;
      sword.x=mouseX;
    }
  
  //if sword touches any fruit then score will be added by two and knife sound plays.
  if(fruitgrp.isTouching(sword))
    {
    fruitgrp.destroyEach();
    score=score+2;
    knifesound.play();
    }
  
  //if sword touches any enemy then game will over
  if(enemygrp.isTouching(sword))
    {
    enemygrp.destroyEach();
    fruitgrp.destroyEach();
    gameoversound.play();
    gameState=END;  
    }
  if(gameState===END)
    {
    gameover.visible=true;  
    enemygrp.setVelocityXEach(0);
    fruitgrp.setVelocityXEach(0);
    enemygrp.setLifetimeEach(-1);
    fruitgrp.setLifetimeEach(-1);
    sword.x=200;
    sword.y=300;         
    }
    text("Score:"+ score, 500,50);
}

function Fruits()
{
  //Creating fruits after every 80 Frames
  if(World.frameCount%80===0)
    {
    fruit=createSprite(650,40,20,20);
    fruit.scale=0.17;   
      
    // Creating four different types of Fruits
    var r=Math.round(random(1,4))
    if(r===1)
    {
      fruit.addImage(fruitimg1)
    }
    if(r===2)
    {
      fruit.addImage(fruitimg2)
    }
    if(r===3)
    {
      fruit.addImage(fruitimg3)
    }
    if(r===4)
    {
      fruit.addImage(fruitimg4)
    }
    
    //Displaying fruit on different positions on canvas
    fruit.y=Math.round(random(100,240))
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    fruitgrp.add(fruit)
    }
}
function Enemy()
{
  
  // Creating enemy after every 200 Frames
   if(World.frameCount%200===0)
   {
  enemy=createSprite(650,40,20,20);
  enemy.addAnimation("moving",enemyimg)
  enemy.scale=0.7
  enemy.y=Math.round(random(100,300))
  enemygrp.add(enemy);
  enemy.velocityX=-8
  enemy.setLifetime=100;  
  }
}
