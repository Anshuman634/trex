var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var cloud
var obstacleGroup
var CloudsGroup
var gameState
var gameOver,gameover
var reset,restart
var sounddie,soundjump,soundcheckpoint
function preload(){
  trex_running =      loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
  sounddie=loadSound("die.mp3");
  soundjump=loadSound("jump.mp3");
  soundcheckpoint=loadSound("checkpoint.mp3");
 
  cloud=loadImage("cloud.png");
  gameover=loadImage("gameOver.png");
  
  restart=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
   
  gameOver=createSprite(300,120,20,20);
  reset=createSprite(310,160,20,20);
  
  
  obstacleGroup=new Group(); 
  CloudsGroup=new Group();
 
  gameState="play";
  
  gameOver.addImage("game",gameover);
  gameOver.scale=0.5
  
  reset.addImage("rest",restart);
  reset.scale=0.5;
}

function draw() {
  background(180);
  
  
  if(gameState==="play"){
  if(keyDown("space")&&trex.y>150) {
    trex.velocityY = -10;
    soundjump.play();
    }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  trex.changeAnimation("running",trex_running);
  
  gameOver.visible=false;
  reset.visible=false;
    spawnObstacles();
  spawnClouds();
  }
  trex.collide(invisibleGround);
  
  drawSprites();
  if(obstacleGroup.isTouching(trex)){
      sounddie.play();
      gameState="end";
  }
  
  
  if(gameState==="end"){
      
     ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collide",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
   gameOver.visible=true;
   reset.visible=true;
  if(mousePressedOver(reset)){
  
    res();  
  }
  
  
  }
    }
function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6; 
    
    //generate random obstacles
    var rand=Math.round(random(1,6));
    switch(rand){
    
        case 1:obstacle.addAnimation("o1",obstacle1);
        break;
        case 2:obstacle.addAnimation("o2",obstacle2);
        break;
        case 3:obstacle.addAnimation("o3",obstacle3);
        break;
        case 4:obstacle.addAnimation("o4",obstacle4);
        break;
        case 5:obstacle.addAnimation("o5",obstacle5);
        break;
        case 6:obstacle.addAnimation("o6",obstacle6);
        break;
    
    }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 110;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}



function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud1 = createSprite(600,120,40,10);
    cloud1.y = Math.round(random(80,120));
    cloud1.addImage(cloud);
    cloud1.scale = 0.5;
    cloud1.velocityX = -3;
    
     //assign lifetime to the variable
    cloud1.lifetime = 210;
    
    //adjust the depth
    cloud1.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud1);
  }
  
}
function res(){
  gameState = "play";
  
  gameOver.visible = false;
  reset.visible = false;
  
  obstacleGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("trex");
  
  count = 0;
  
}
