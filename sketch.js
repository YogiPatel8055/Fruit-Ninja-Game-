var knife,knifeImage,knifesound,gameoverimage,gameoversound;
var fruit,fruit1,fruit2,fruit3,fruit4,fruitGroup;
var alien,alien,alienGroup,alienImage;
var PLAY = 1;
var END =0 ;
var gamestate = PLAY;
function preload(){
   knifeImage = loadImage("sword.png");
   fruit1Image = loadImage("fruit1.png");
   fruit2Image = loadImage("fruit2.png");
   fruit3Image = loadImage("fruit3.png");
   fruit4Image = loadImage("fruit4.png");
   alienImage = loadAnimation("alien1.png","alien2.png");
   gameoverimage = loadImage("gameover.png");
   knifesound = loadSound("knifeSwoosh.mp3");
   gameoversound = loadSound("gameover.mp3");
}

function setup() {
    createCanvas(600,400);
    knife = createSprite(50,250,20,20);
  knife.scale=0.7;
    score = 0;
    
    fruitGroup = createGroup();
    alienGroup = createGroup();
}

function draw(){
  background("lightblue");
  fruits();
  alien();
  if(gamestate===PLAY){ 
     knife.x = World.mouseX;
     knife.y = World.mouseY;
     knife.addImage(knifeImage);
    
     
    
    if(knife.isTouching(fruitGroup)){
      fruitGroup.destroyEach();
      
      knifesound.play();
      score = score +2;
    }
    if(knife.isTouching(alienGroup)){
       gamestate=END;
       knife.addImage(gameoverimage);
       gameoversound.play();
       }
  } 
  if(gamestate===END){
     fruitGroup.setVelocityXEach(0);
     alienGroup.setVelocityXEach(0);
     fruitGroup.destroyEach();
     alienGroup.destroyEach();
    
     knife.x=250;
     knife.y=250;
    
  }
  drawSprites();
  text("Score : "+ score,300,30);
}


function fruits () {
  if (World.frameCount%100===0) {
     position = Math.round(random(1,2));
     fruit = createSprite(600,200,20,20);
     fruit.scale=0.25;
     
     r = Math.round(random(1,4))
     if (r===1){
      fruit.addImage(fruit1Image);
     }
     else if(r===2){
      fruit.addImage(fruit2Image);
     }
     else if(r===3){
      fruit.addImage(fruit3Image);
     }
     else if(r===4){
      fruit.addImage(fruit4Image); 
     }
     if(position==1){
      fruit.x=600;
      fruit.velocityX = -(7+(score/4));       
     }
      else if (position==2){
      fruit.x=0;
      fruit.velocityX = 7+(score/4); 
      } 
    fruit.y= Math.round(random(50,400));
    
   // fruit.velocityX=-6;
    fruit.lifetime=100;
    
    fruitGroup.add(fruit);
  }
}

function alien() {
 if(World.frameCount%200===0){
    position=Math.round(random(1,2))
  var alien=createSprite(600,200,20,20);
    alien.addAnimation("moving", alienImage);
    alien.y=Math.round(random(100,300));
    if (position===1){
      alien.x=600;
       alien.velocityX=-(8+(score/10));
    }
    else
      {
    if (position===2){
      alien.x=0;
       alien.velocityX=(8+(score/10));
    }}
    alien.setLifetime=50;
    
    alienGroup.add(alien);
  }

}