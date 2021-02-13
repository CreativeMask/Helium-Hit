// I after a variable name means it is a image variable
// T after a variable name means it is a tutorial variable
// B after a variable name means it is a background variable
// S after a variable name means it is a sound variable
// b after a variable name means it is a balloon variable
var PLAY, END;
var backscreen, backscreenI;
var backscreen3, backscreen3I;
var backscreen2, backscreen2I;
var gameState = PLAY;
var score = 0;
var diffuculty = "normal";
var tree, treeI;
var treeTop, treeTopI;
var dune, duneI;
var duneTop, duneTopI;
var glacier, glacierI;
var glacierTop, glacierTopI;
var cloud, cloudI;
var cursor, cursorI;
var rb, rbI, rbGroup;
var bb, bbI, bbGroup;
var gb, gI, gbGroup;
var pb, pI, pbGroup;
var yb, yI, ybGroup;
var balloonGroup;
var ground, groundI;
var clickTimer = 0;
var bHealth = 3;


var arrow, arrowI;
var arrowMode = "hold";


var rightEdge;
var testing = false;
var timer = 0;
var testingTimer = 0;
var level = 1;
var momentum = 0;
var arrowGroup;







function preload(){
  
  treeI = loadImage("tree.png");
  treeTopI = loadImage("tree.png");
  cloudI = loadImage("cloud.png");
  cursorI = loadImage("cursor.png");
  rbI = loadImage("red_balloon.png");
  bbI = loadImage("blue_balloon.png");
  gbI = loadImage("green_balloon.png");
  pbI = loadImage("pink_balloon.png");
  ybI = loadImage("yellow_balloon.png");
  backscreenI = loadImage("backscreen.png");
  backscreen2I = loadImage('backscreen2.png');
  backscreen3I = loadImage("backscreen3.png");
  groundI = loadImage("ground.png");
  arrowI = loadImage("arrow.png");
  duneI = loadImage("dune.png");
  duneTopI = loadImage("duneTop.png");
  glacierI = loadImage("glacier.png");
  glacierTopI = loadImage("glacierTop.png");
  
 
}

function setup() {
  createCanvas(1536,720);
  //768,360 is middle of the screen
  
  backscreen = createSprite(768,360,1536,720);
  backscreen.addImage("bac", backscreenI);
  backscreen.velocityX = 10;
  backscreen.visible = true;

  backscreen3 = createSprite(768,360,1536,720);
  backscreen3.addImage("bac3", backscreen3I);
  backscreen3.velocityX = 10;
  backscreen3.visible = false;
  
  backscreen2 = createSprite(768,360,1536,720);
  backscreen2.addImage("bac2", backscreen2I);
  backscreen2.velocityX = 10;
  backscreen2.visible = false;

  ground = createSprite(768,360,1536,720);
  ground.addImage("gro", groundI);
  ground.depth = -100;

  cursor = createSprite(200,200,20,20);
  cursor.addImage("cur", cursorI);
  cursor.scale = 0.25;
  cursor.depth = 20;

  arrow = createSprite(1500,475,200,200);
  arrow.addImage("arr", arrowI);
  arrow.scale = 0.55;
  arrow.visible = false;


  
  rightEdge = createSprite(1536,475,20,950);
  rightEdge.visible = false;

  //console.log("clickTimer:" + clickTimer);


  treeGroup = createGroup();
  duneGroup = createGroup();
  rbGroup = createGroup();
  bbGroup = createGroup();
  gbGroup = createGroup();
  pbGroup = createGroup();
  ybGroup = createGroup();
  arrowGroup = createGroup();
  balloonGroup = createGroup();
  glacierGroup = createGroup();
  arrowGroup.add(arrow);
}

function draw() {
  background(color(100,69,30));
  
  // to make the cursor follow the mouse
  cursor.x = World.mouseX;
  cursor.y = World.mouseY;
  cursor.depth = 100+1;
  console.log(level);
  //console.log("testingTimer:" + testingTimer);
  if(gameState === PLAY){
    // spawning things
    spawnTrees();
    spawnTreesTop();
    spawnCloud();
    spawnBalloon();
    spawnDunes();
    spawnDunesTop();
    spawnGlacier();
    spawnGlacierTop();
    
   
    
    
    // TO MAKE BACKGROUND INFINITE

    if(backscreen.x > 1536){
      backscreen.x = 0;
    }

    if(backscreen3.x > 1536){
      backscreen3.x = 0;
    }

    if(backscreen2.x > 1536){
      backscreen2.x = 0;
    }
    
    //to make the balloons pop when touching arrows
    
    if(arrowGroup.isTouching(rbGroup)){
      rbGroup.destroyEach();
      score = score+1;
      arrowMode = "hold";
      
     
      
    } else if(arrowGroup.isTouching(bbGroup)){
      score = score+3;
      bHealth = bHealth-1;
      arrowMode = "hold";
      

      
    } else if(arrowGroup.isTouching(gbGroup)){
      gbGroup.destroyEach();
      score = score-3;
      arrowMode = "hold";
     
     
   
    } else if(arrowGroup.isTouching(pbGroup)){
      pbGroup.destroyEach();
      score = score+2;
      arrowMode = "hold";
    
      
    } else if(arrowGroup.isTouching(ybGroup)){
      ybGroup.destroyEach();
      score = score+5;
      arrowMode = "hold";

    }

    if(bHealth === 0){
      bbGroup.destroyEach();
      bHealth = 2;
    }
    //to control the arrows
    if(arrowMode === "hold"){
      arrow.x = 1600;
      arrow.y = -5;
      momentum = 0;
    }
    
    if(arrowMode === "shoot"){
      momentum = momentum+1;
    }
    
    if(mouseIsPressed === true && arrowMode === "hold"){
      arrow.y = cursor.y;
      arrowMode = "shoot";
      if(level === 1){
        arrow.velocityX = -25 - momentum;
      } else if(level === 2){
        arrow.velocityX = -30 - momentum;
      } else if(level === 3){
        arrow.velocityX = -40 - momentum;
      }
      arrow.visible = true;
      }

     

     




    if(arrow.x < 0){
      arrow.x = 1540;
      arrow.visible = false;
      arrow.velocityX = 0;
      arrowMode = "hold";
      momentum = 0;
    }

    

    //to make you lose points when balloons go off the screen
    if(rightEdge.isTouching(rbGroup)){
      rbGroup.destroyEach();
      score = score-1;
    }

    if(rightEdge.isTouching(bbGroup)){
      bbGroup.destroyEach();
      score = score-2;
    }

    if(rightEdge.isTouching(gbGroup)){
      gbGroup.destroyEach();
    }

    if(rightEdge.isTouching(pbGroup)){
      pbGroup.destroyEach();
      score = score-2;
    }

    if(rightEdge.isTouching(ybGroup)){
      ybGroup.destroyEach();
      score = score-5;
    }

    //to make sure the balloons dont touch eachother
    if(rbGroup.isTouching(bbGroup)){
      rbGroup.destroyEach();
      
    }

    if(rbGroup.isTouching(gbGroup)){
      rbGroup.destroyEach();
    }

    if(rbGroup.isTouching(pbGroup)){
      rbGroup.destroyEach();
    }

    if(rbGroup.isTouching(ybGroup)){
      rbGroup.destroyEach();
    }

    if(bbGroup.isTouching(gbGroup)){
      bbGroup.destroyEach();
    }

    if(bbGroup.isTouching(pbGroup)){
      bbGroup.destroyEach();
    }

    if(bbGroup.isTouching(ybGroup)){
      bbGroup.destroyEach();
    }

    if(gbGroup.isTouching(pbGroup)){
      gbGroup.destroyEach();
    }

    if(gbGroup.isTouching(ybGroup)){
      gbGroup.destroyEach();
    }

    if(pbGroup.isTouching(ybGroup)){
      pbGroup.destroyEach();
    }

    //testing mode
    testingTimer = testingTimer+0.25;
    if(keyDown("t") && testing === false && testingTimer > 2){
      testing = true;
      testingTimer = 0;
    } else if(keyDown("t") && testing === true && testingTimer > 2){
      testing = false;
      testingTimer = 0;
    }
    if(testing === true){
      timer = timer+0.25;
      if(keyDown("UP_ARROW") && timer > 10){
        score = score+1;
        timer = 0;
      }
    }
    //ammo system
    if(arrow.isTouching(balloonGroup)){
      arrowMode = "hold";
    }

    //level system
    if(score > 20 && score < 50){
      level = 2;
    }

    if(score < 20){
      level = 1;
    }

    if(score > 49){
      level = 3;
    }

    if(level === 1){
      backscreen3.visible = false;
      backscreen.visible = true;
      backscreen2.visible = false;
      duneGroup.destroyEach();
      glacierGroup.destroyEach();
    }

    if(level === 2){
      backscreen3.visible = false;
      backscreen.visible = false;
      backscreen2.visible = true;
      treeGroup.destroyEach();
      duneGroup.destroyEach();
    }

    if(level === 3){
      backscreen3.visible = true;
      backscreen.visible = false;
      backscreen2.visible = false;
      glacierGroup.destroyEach();
      treeGroup.destroyEach();
    }

  


  } else if(gameState === END){

  }
    
    
    
  drawSprites();
//to make the score constanly update
  textSize(25);
    fill("white");
    text("Score:" + score, 768, 40);

    if(gameState === PLAY){
      if(testing === true){
        text("testingModeActive",1320, 710);
      }
    }

}


function spawnTrees(){
  if(frameCount % Math.round(random(40,60)) === 0 && level === 1){
    treeSize = 0.06 + random(0.15,0.25);
    tree = createSprite(-5,378,20,20);
    tree.addImage("tre", treeI);
    tree.scale = treeSize;
    tree.velocityX = 10;
    if(level === 1){
      tree.visible = true;
    }

    if(level === 2){
      tree.visible = false;
    }


    tree.depth = 6;
    treeGroup.add(tree);
    tree.lifetime = 600;

  }
}

function spawnTreesTop(){
  if(frameCount % Math.round(random(40,60)) === 0 && level === 1){
    treeTopSize = random(0.15,0.25)
    treeTop = createSprite(-5,232,20,20);
    treeTop.addImage("treTop", treeTopI);
    treeTop.scale = treeTopSize;
    treeTop.velocityX = 10;
    treeTop.depth = 5;
    if(level === 1){
      treeTop.visible = true;
    }

    if(level === 2){
      treeTop.visible = false;
    }

    treeTop.depth = 5;
    if(treeTop.isTouching(treeTop)){
      treeTop.destroy();
    }
    treeTop.lifetime = 600;
    treeGroup.add(treeTop);

  }
}

function spawnCloud(){
  if(frameCount % Math.round(random(50,80)) === 0){
    qa = Math.round(random(40, 150));
    cloudSize = random(0.15,0.25)
    cloud = createSprite(-5,0,20,20);
    cloud.addImage("clo", cloudI);
    cloud.scale = cloudSize;
    cloud.velocityX = 10;

    cloud.y = qa;
    cloud.depth = 5;
    cloud.lifetime = 600;

  }
}

function spawnDunes(){
  if(frameCount % Math.round(random(40,60)) === 0 && level === 3){
    duneSize = 0.06 + random(0.15,0.25);
    dune = createSprite(-5,378,20,20);
    dune.addImage("dun", duneI);
    dune.scale = duneSize;
    dune.velocityX = 10;
   


    dune.depth = 10;
    duneGroup.add(dune);
    dune.lifetime = 600;

  }
}

function spawnDunesTop(){
  if(frameCount % Math.round(random(40,60)) === 0 && level === 3){
    duneTopSize = random(0.15,0.25)
    duneTop = createSprite(-5,232,20,20);
    duneTop.addImage("dunTop", duneTopI);
    duneTop.scale = duneTopSize;
    duneTop.velocityX = 10;
    duneTop.depth = 9;
  

    if(duneTop.isTouching(duneTop)){
      duneTop.destroy();
    }
    duneTop.lifetime = 600;
    duneGroup.add(duneTop);

  }
}

function spawnGlacier(){
  if(frameCount % Math.round(random(60,80)) === 0 && level === 2){
    glacierSize = 0.06 + random(0.15,0.25);
    glacier = createSprite(-5,378,20,20);
    glacier.addImage("gla", glacierI);
    glacier.scale = glacierSize;
    glacier.velocityX = 10;
   


    glacier.depth = 10;
    glacierGroup.add(glacier);
    glacier.lifetime = 600;

  }
}

function spawnGlacierTop(){
  if(frameCount % Math.round(random(60,80)) === 0 && level === 2){
    glacierTopSize = random(0.15,0.25)
    glacierTop = createSprite(-5,232,20,20);
    glacierTop.addImage("glacierTop", glacierTopI);
    glacierTop.scale = glacierTopSize;
    glacierTop.velocityX = 10;
    glacierTop.depth = 9;
  

    if(glacierTop.isTouching(glacierTop)){
      glacierTop.destroy();
    }
    glacierTop.lifetime = 600;
    glacierGroup.add(glacierTop);

  }
}


function spawnBalloon(){
  if(frameCount %  120 === 0 && level === 1 || frameCount %  120 === 0 && level === 2 ){
    rb = createSprite(-5, 0, 20,20);
    rb.addImage("rbL", rbI);
    rb.scale = 0.45;
    rb.setCollider("rectangle", 0, -100, 200, 250);
    
    if (diffuculty === "normal") {
      rb.velocityX = 15;
    } else if (diffuculty === "easy") {
      rb.velocityX = 8
    } else if (diffuculty === "hard") {
      rb.velocityX = 20
    }
    rb.depth = 10;
    rb.y = Math.round(random(60,400));
    rb.lifetime = 600;
    rbGroup.add(rb);
    balloonGroup.add(rb);
  }

  if(frameCount % 150 === 0 && level === 2){
    bb = createSprite(-5, 0, 20,20);
    bb.addImage("bbL", bbI);
    bb.scale = 0.40;
    bb.setCollider("rectangle", 0, -100, 200, 230);
    
    if (diffuculty === "normal") {
      bb.velocityX = 10;
    } else if (diffuculty === "easy") {
      bb.velocityX = (8 + (3*score / 10));
    } else if (diffuculty === "hard") {
      bb.velocityX = (20 + (3*score / 2));
    }
    bb.depth = 10;
    bb.y = Math.round(random(60,400));
    bb.lifetime = 600;
    bbGroup.add(bb);
    balloonGroup.add(bb);
  }

  if(frameCount % 120 === 0 && level === 3){
    gb = createSprite(-5, 0, 20,20);
    gb.addImage("gbL", gbI);
    gb.scale = 0.35;
    gb.setCollider("rectangle", 0, -100, 200, 210);
    
    if (diffuculty === "normal") {
      gb.velocityX = 30;
    } else if (diffuculty === "easy") {
      gb.velocityX = (8 + (3*score / 10));
    } else if (diffuculty === "hard") {
      gb.velocityX = (20 + (3*score / 2));
    }
    gb.depth = 10;
    gb.y = Math.round(random(60,400));
    gb.lifetime = 600;
    gbGroup.add(gb);
    balloonGroup.add(gb);
  }

  if(frameCount % 140 === 0 && level === 1){
    pb = createSprite(-5, 0, 20,20);
    pb.addImage("pbL", pbI);
    pb.scale = 0.50;
    pb.setCollider("rectangle", 0, -100, 200, 195);
   
    if (diffuculty === "normal") {
      pb.velocityX = 18;
    } else if (diffuculty === "easy") {
      pb.velocityX = 3;
    } else if (diffuculty === "hard") {
      pb.velocityX = 3;
    }
    pb.depth = 10;
    pb.y = Math.round(random(60,400));
    pb.lifetime = 600;
    pbGroup.add(pb);
    balloonGroup.add(pb);
  }

  if(frameCount % 120 === 0 && level === 3){
    yb = createSprite(-5, 0, 20,20);
    yb.addImage("ybL", ybI);
    yb.scale = 0.35;
    yb.setCollider("rectangle", 0, -100, 200, 175);

    if (diffuculty === "normal") {
      yb.velocityX = 35;
    } else if (diffuculty === "easy") {
      yb.velocityX = (8 + (3*score / 10));
    } else if (diffuculty === "hard") {
      yb.velocityX = (20 + (3*score / 2));
    }
    yb.depth = 10;
    yb.y = Math.round(random(60,400));
    yb.lifetime = 600;
    ybGroup.add(yb);
    balloonGroup.add(yb);
  }
}





