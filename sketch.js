var START = 1;
var END = 0;
var gameStates = START;
var car ,carImg;
var backgroundImg;
var obsGroup,obsImg
var bg, backgroundImg;
var leftSideWalk, rightSideWalk;

function preload(){
carImg = loadImage("images/car2.png");
backgroundImg = loadImage("images/track.jpg");
obsImg = loadImage("images/Obstacle.png");
}

function setup() {
  createCanvas(800,800);

  bg = createSprite(400,-1,800,800);
  bg.addImage("track",backgroundImg);
  bg.y = bg.height/2;
  bg.velocityY = 7;

  leftSideWalk = createSprite(170,400,20,800);
  leftSideWalk.visible = false;
  rightSideWalk = createSprite(635,400,20,800);
  rightSideWalk.visible = false;

  car = createSprite(500,700,20,30);
  car.addImage("car2",carImg);
  car.velocityY = 0.0002;
  car.setCollider("circle",0,0,10);
  car.collide(rightSideWalk);
  car.collide(leftSideWalk);

  obsGroup = new Group();
}

function draw() {
  background(255);  
  
  if(bg.y > 800){
    bg.y = -1;
  }

  if (keyDown("Left_Arrow")){
    car.x = car.x -10;
  }
  if (keyDown("Right_Arrow")){
    car.x = car.x +10;
  }

  car.collide(rightSideWalk);
  car.collide(leftSideWalk);
  
  if(obsGroup.isTouching(car)){
    gameStates = END;
    obsGroup.setVelocityYEach(0);
    obsGroup.setLifetimeEach(-7);
    car.velocityY = 0;
    bg.velocityY = 0;
  }

  Obstacle();
  drawSprites();
}

function Obstacle(){
       
  if (frameCount % 35 === 0 ){
  var obs = createSprite(400,-100,20,30);
  obs.addImage("Obstacle",obsImg)
  obs.scale = 0.1;
  
  obs.x = Math.round(random(600,250));
  obs.velocityY = 7;
         
  obs.depth = car.depth;
  obs.depth = car.depth+1;

  obsGroup.add(obs);
  obs.lifeTime = 40;
    
  }
}