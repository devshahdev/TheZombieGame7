var bg,bgImg;
var player1_img, player1,shooterImg, shooter_shooting, ammoPu, A, eD, nAs, nA, S;
var running, zombieImg,zombie, knifeA, shoot, bullet, energyDrinkI, ammoI, bgS, wS, bg1;
var score = 0; 
var zombieLife =100;
var life = 100;
var bullets =5;
var START = 0;
var PLAY = 1;
var gameState = 0;
var END = 2;


function preload(){
bg = loadImage("assets/bg.jpg") 
player1_img=loadAnimation("Player1/png/Idle (1).png","Player1/png/Idle (2).png","Player1/png/Idle (3).png","Player1/png/Idle (4).png","Player1/png/Idle (5).png","Player1/png/Idle (6).png","Player1/png/Idle (7).png","Player1/png/Idle (8).png","Player1/png/Idle (9).png","Player1/png/Idle (10).png");
running = loadAnimation("Player1/png/Run (1).png","Player1/png/Run (2).png","Player1/png/Run (3).png","Player1/png/Run (4).png","Player1/png/Run (5).png","Player1/png/Run (6).png","Player1/png/Run (7).png","Player1/png/Run (8).png");
zombieImg= loadAnimation("zombiefiles/png/male/Attack (1).png","zombiefiles/png/male/Attack (2).png","zombiefiles/png/male/Attack (3).png","zombiefiles/png/male/Attack (4).png","zombiefiles/png/male/Attack (5).png","zombiefiles/png/male/Attack (6).png","zombiefiles/png/male/Attack (7).png","zombiefiles/png/male/Attack (8).png");
knifeA =loadAnimation("Player1/png/Melee (1).png","Player1/png/Melee (2).png","Player1/png/Melee (3).png","Player1/png/Melee (4).png","Player1/png/Melee (5).png","Player1/png/Melee (6).png","Player1/png/Melee (7).png");
shoot =loadAnimation("Player1/png/Shoot (1).png","Player1/png/Shoot (2).png","Player1/png/Shoot (3).png",);
bullet = loadImage("assets/download.jpg");
energyDrinkI = loadImage("assets/energyDrink.jpg");
ammoI = loadImage("assets/ammo.jpg");
ammoPu = loadSound("assets/ammoPickUp.mp3");
A = loadSound("assets/attack.mp3");
eD = loadSound("assets/energy.wav");
nAs= loadSound("assets/noAmmoS.mp3");
nA= loadSound("assets/noAmmo.mp3");
S= loadSound("assets/shoot.mp3");
wS = loadSound("assets/welcomeS.mp3");
bg1 = loadImage("assets/bg1.jpg");


}

function setup() {
  createCanvas(windowWidth, windowHeight);

  player1 = createSprite(200,200,20,20);
  player1.addAnimation("idle",player1_img);
  player1.addAnimation("run",running);
  player1.addAnimation("attack",knifeA);
  player1.addAnimation("shoot",shoot);
  player1.scale=0.4;
  edges = createEdgeSprites();

  bulletG = new Group();
  zombieG = new Group();
  knifeG = new Group();
  energyDrinkG = new Group();
  ammoG = new Group();

  player1.setCollider("rectangle",0,20,150,250)
  player1.debug=true;

}

function draw() {
  if(gameState===START)
  {
    background(bg1);
    textSize(60);
    fill("black")
text("𝖜𝖊𝖑𝖈𝖔𝖒𝖊 𝖙𝖔 𝖙𝖍𝖊 𝖟𝖔𝖒𝖇𝖎𝖊 𝖌𝖆𝖒𝖊",100,100);
text("🅷🅴🆁🅴 🅰🆁🅴 🆃🅷🅴 🆁🆄🅻🅴🆂 🅾🅵 🆃🅷🅴 🅶🅰🅼🅴",100,200);
textSize(20);
text("The basic idea of this game is this, that you are in a ",100,250);
text("city full of zombies. You have to save the city.",100,280);
text("The is survival mode you have to last as long as you can",100,310);
text("If a zombie touches you, your life is dereased by 20.",100,340);
text("If the bullet touches the zombie,it dies. ",100,370);
text("If you kill a zombie your score is increased by 50.",100,400);
text("No score limit to win the game",100,430);
text("If your life is 0 you lose the game.",100,460);
text("Press the up arrow to move up, left to move left.",100,490);
text(", right to move rightand down to move down.",100,520);
text("Press space to shoot, you have 5 bullets.",100,550);
text("If you kill any one zombie the whole group of zombies is destroyed.",100,580);
text("energy drink will increment energy by 20 and ammo box will give you 5 bullets .",100,610);
textSize(50);
text("press enter to start, good luck",100,650);
textSize(60);
text("Game by Dev.",100,700);


 
 if(keyDown("ENTER"))
 {
   gameState=PLAY;
   
 }
 

}

  if(gameState===PLAY){
  background(bg);

  if(keyDown("UP_ARROW"))
  {
  player1.changeAnimation("run",running);
  player1.y-=10;
  }

  if(keyWentUp("UP_ARROW"))
  {
  player1.changeAnimation("idle",player1_img);
  }

  if(keyDown("DOWN_ARROW"))
  {
  player1.changeAnimation("run",running);
  player1.y+=10;
  }

  if(keyWentUp("DOWN_ARROW"))
  {
  player1.changeAnimation("idle",player1_img);
  }

  if(keyDown("LEFT_ARROW"))
  {
  player1.changeAnimation("run",running);
  player1.x-=10;
  }

  if(keyWentUp("LEFT_ARROW"))
  {
  player1.changeAnimation("idle",player1_img);
  }

  if(keyDown("RIGHT_ARROW"))
  {
  player1.changeAnimation("run",running);
  player1.x+=10;
  }

  if(keyWentUp("RIGHT_ARROW"))
  {
  player1.changeAnimation("idle",player1_img);
  }

  if(keyDown("SPACE") && bullets>0)
  {
    player1.changeAnimation("shoot",shoot) ;
    createBullets();
    S.play();
  }
  if(keyWentUp("SPACE") && bullets>0)
  {
  player1.changeAnimation("idle",player1_img);
  knifeK();
  bullets-=1;
  }
  if(bullets===0 && keyDown("SPACE"))
  {
    textSize(20);
    fill("black")
   text("No ammo",player1.x-50,player1.y+125);
   textSize(10);
   nA.play();
  }

  if(bulletG.isTouching(zombieG))
  {
   zombieLife-=50
   A.play();
   
  }
  
  if(zombieLife<=0)
  {
    zombieG.destroyEach();
    zombieLife=100;
    score=score+50;
    
  }
  if(zombieG.isTouching(player1))
  {
    life= life-20;
    player1.x=200;
    player1.y=200;
    A.play();
  }
  if(player1.isTouching(zombieG))
  {
    life= life-20;
    player1.x=200;
    player1.y=200;
    player1.visibility=false;
    A.play();
  }

  if(player1.isTouching(energyDrinkG))
  {
  life+=20;
  energyDrinkG.destroyEach();
  eD.play();
  }
  if(player1.isTouching(ammoG))
  {
  bullets+=5
  ammoG.destroyEach();
  ammoPu.play();
  }

  if(life<=0)
  {
gameState=END;
  }
 

textSize(20);
fill("orange");
text("SCORE: "+ score,100,30) 

textSize(20);
fill("orange");
text("zombie life: "+ zombieLife,100,100) 

textSize(20);
fill("orange");
text("life: "+ life,100,80)

textSize(20);
fill("orange");
text("ammo: "+ bullets,100,50)

  spawnEnergydrink();
  spawnZombies();
  spawnAmmo();
  player1.collide(edges);
  drawSprites();
  }

  if(gameState===END)
  {
  background(bg1)
  textSize(50); 
  fill("black")
  text("Your Score Is: "+ score,500,300); 
  text("better luck next time",500,400);
  text("Press enter to play again",500,500);
  if(keyDown("ENTER"))
  {
    location.reload();
  }
  }
  

}

function spawnZombies()
{
if (World.frameCount % 30 === 0) 
{
zombie = createSprite(0,Math.round(random(windowWidth, -370)), 10, 10);
zombie.addAnimation("running", zombieImg);
zombie.scale = 0.4;
zombie.velocityX = 4;
zombie.lifetime=800;
zombieG.add(zombie);
}
}

/*function spawnmZombies()
{
if (frameCount % 70 === 0) 
{
zombie = createSprite(0,Math.round(random(windowWidth, -370)), 10, 10);
zombie.addAnimation("running", zombieImg);
zombie.scale = 0.4;
zombie.velocityX = 4;
zombie.lifetime=800;
zombieG.add(zombie);
}
}*/

function createBullets()
{
var bulet = createSprite(player1.x, player1.y);
bulet.addImage(bullet);
bulet.velocityX=100;
bulet.scale = 0.2;
bulletG.add(bulet);
}

function knifeK()
{
  var knife = createSprite(player1.x+50, player1.y);
  knife.scale=1;
  knife.visible=false;
  knife.lifetime=50;
if(knife.isTouching(zombieG))
{
zombieLife=zombieLife-20;
}
knifeG.add(knife);
}

function spawnEnergydrink()
{
  if (frameCount % 500 === 0) 
  {
  var energyDrink = createSprite(0,Math.round(random(windowWidth, -370)), 10, 10);
  energyDrink.addImage(energyDrinkI)
  energyDrink.scale = 0.2;
  energyDrink.velocityX = 4;
  energyDrink.lifetime=800;
  energyDrinkG.add(energyDrink);
  }
}

function spawnAmmo()
{
if (frameCount % 500 === 0)
{
var ammo = createSprite(0,Math.round(random(windowWidth, -370)), 10, 10);
ammo.addImage(ammoI);
ammo.scale = 0.2;
ammo.velocityX = 4;
ammo.lifetime=800;
ammoG.add(ammo);
}
}

