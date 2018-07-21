
//Background Variables
var stage;
var context;
var queue;
var WIDTH = 800;
var HEIGHT = 600;

//Player Variables
var mouseXPosition;
var mouseYPosition;
var instructions;

//Enemy Variables
var batImage;
var animation;
var deathAnimation;
var spriteSheet;
var spriteSheet1;
var spriteSheet2;
var level1ComponentFlag=0;
var level2ComponentFlag=0;
var level3ComponentFlag=0;
var Boss1Flag=0;
var Boss1SpeedFlag=0;
var Boss1DeathFlag=0;
var Boss1ShotCount=0;
var enemyXPos=100;
var enemyYPos=100;
var enemyXSpeed = 2;
var enemyYSpeed = 2;

//Scoring Variables
var score = 0;
var scoreText;
var killPoints = 100;
var missPoints = 35;
var gameTimer;
var gameTime = 60;
var timerText;

window.onload = function(){
	
    //Setup Canvas
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;
    stage = new createjs.Stage("myCanvas");

    //Setup Asset Queue
    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);
    createjs.Sound.alternateExtensions = ["ogg"];

    //Create Load Manifest
    queue.loadManifest([
        {id: 'backgroundImage', src: 'assets/background.png'},
        {id: 'backgroundImageL2', src: 'assets/backbgroungl2.png'},
        {id: 'backgroundImageL3', src: 'assets/backbgroungl3.png'},
        {id: 'crossHair', src: 'assets/crosshair.png'},
        {id: 'shot', src: 'assets/ExplosionBomb.mp3'},
        {id: 'background', src: 'assets/ambient.wav'},
        {id: 'gameOverSound', src: 'assets/gameOver.mp3'},
        {id: 'BossPain', src: 'assets/BossPain.mp3'},
        {id: 'tick', src: 'assets/tick.mp3'},
        {id: 'deathSound', src: 'assets/die.mp3'},
        {id: 'batSpritesheet', src: 'assets/dragon.png'},
        {id: 'batDeath', src: 'assets/batDeath.png'},
        {id: 'batSpritesheet1', src: 'assets/dragon1.png'},
        {id: 'batSpritesheet2', src: 'assets/dragon2.png'},
        {id: 'Boss1Spritesheet', src: 'assets/Boss1.png'},

    ]);
    queue.load();

    //Create Timer
    gameTimer = setInterval(updateTime, 1000);

}

function queueLoaded(event){
	
    createjs.Sound.play("background", {loop: -1});
 
    //Create Enemy Sprite
    spriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('batSpritesheet')],
        "frames": {"width": 95, "height": 95},
        "animations": { "flap": [0,1] }
    });

    spriteSheet1 = new createjs.SpriteSheet({
        "images": [queue.getResult('batSpritesheet1')],
        "frames": {"width": 95, "height": 55},
        "animations": { "flap": [0,1] }
    });

    spriteSheet2 = new createjs.SpriteSheet({
        "images": [queue.getResult('batSpritesheet2')],
        "frames": {"width": 95, "height": 55},
        "animations": { "flap": [0,1] }
    });
    Boss1spriteSheetob = new createjs.SpriteSheet({
        "images": [queue.getResult('Boss1Spritesheet')],
        "frames": {"width": 120, "height": 120},
        "animations": { "flap": [0,1] }
    });


    //Create Death Enemy Sprite
    batDeathSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('batDeath')],
        "frames": {"width": 198, "height" : 148},
        "animations": {"die": [2,7, false,1 ] }
    });

    //CreateStageElement();
   //Spawn an Enemy
   createEnemy();

   //Add ticker
   createjs.Ticker.setFPS(15);
   createjs.Ticker.addEventListener('tick', stage);
   createjs.Ticker.addEventListener('tick', tickEvent);
 
   //Player Control
   window.onmousedown = handleMouseDown;
}

function createEnemy(){
	
    //Creates our Enemy based on the levels and changing the scores 
    if (score<=300)
    { 
        if(level1ComponentFlag==0)
        {
        var backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage"))
         //Add Score
         stage.addChild(backgroundImage);
         scoreText = new createjs.Text("SCORE: " + score.toString(), "36px Arial", "#FFF");
         scoreText.x = 10;
         scoreText.y = 10;
         stage.addChild(scoreText);

         LevelText = new createjs.Text("Level: 1" , "36px Arial", "#FFF");
         LevelText.x = 550;
         LevelText.y = 10;
         stage.addChild(LevelText);
      
         //Add Timer
         /*timerText = new createjs.Text("Time Left: " + gameTime.toString(), "36px Arial", "#FFF");
         timerText.x = 550;
         timerText.y = 10;
         stage.addChild(timerText);*/
         
         //instructions
         instructions = new createjs.Text("Shoot with your mouse!", "48px Arial", "#FFF");
         instructions.x = 120;
         instructions.y = 250;
         stage.addChild(instructions); 
         //Background Audio
         level1ComponentFlag=1; 
    }
    animation = new createjs.Sprite(spriteSheet, "flap");
    animation.regX = 99;
    animation.regY = 58;
    animation.x = enemyXPos;
    animation.y = enemyYPos;
    animation.gotoAndPlay("flap");
    stage.addChildAt(animation,1);
    //LevelText.text = "Level: 1";

   // CreateStageElement();
    }else if ((score = 400)&&(Boss1Flag==0))//adding boss level1
    {
        animation = new createjs.Sprite(Boss1spriteSheetob, "flap");
        animation.regX = 99;
        animation.regY = 58;
        animation.x = enemyXPos;
        animation.y = enemyYPos;
        animation.gotoAndPlay("flap");
        stage.addChildAt(animation,1);
        Boss1Flag=1;

    }
    else if((score>400)&&(score<=600))
    {
        if (level2ComponentFlag==0) 
        {  stage.removeAllChildren();
            var backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImageL2"))
            stage.addChild(backgroundImage);

            scoreText = new createjs.Text("SCORE: " + score.toString(), "36px Arial", "#FFF");
            scoreText.x = 10;
            scoreText.y = 10;
           // scoreText.text = "SCORE: " + score.toString();
            stage.addChild(scoreText);
    
            LevelText = new createjs.Text("Level: 2" , "36px Arial", "#FFF");
            LevelText.x = 550;
            LevelText.y = 10;
            stage.addChild(LevelText);
        }
        
    animation = new createjs.Sprite(spriteSheet1, "flap");
    animation.regX = 99;
    animation.regY = 58;
    animation.x = enemyXPos;
    animation.y = enemyYPos;
    animation.gotoAndPlay("flap");
    stage.addChildAt(animation,1);
    }
    else
    {
        if (level3ComponentFlag==0) 
        {  stage.removeAllChildren();
            var backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImageL3"))
            stage.addChild(backgroundImage);

            scoreText = new createjs.Text("SCORE: " + score.toString(), "36px Arial", "#FFF");
            scoreText.x = 10;
            scoreText.y = 10;
           // scoreText.text = "SCORE: " + score.toString();
            stage.addChild(scoreText);
    
            LevelText = new createjs.Text("Level: 3" , "36px Arial", "#FFF");
            LevelText.x = 550;
            LevelText.y = 10;
            stage.addChild(LevelText);
        }
    animation = new createjs.Sprite(spriteSheet2, "flap");
    
  //  CreateStageElement();
    LevelText.text = "Level: 3";
    animation.regX = 99;
    animation.regY = 58;
    animation.x = enemyXPos;
    animation.y = enemyYPos;
    animation.gotoAndPlay("flap");
    stage.addChildAt(animation,1);
    }
   
   // second enemy
  /*  animation1 = new createjs.Sprite(spriteSheet2, "flap");
    animation1.regX = 99;
    animation1.regY = 58;
    animation1.x = enemyXPos;
    animation1.y = enemyYPos;
    animation1.gotoAndPlay("flap");*/
    
   

   // stage.addChildAt(animation1,1);
}

function batDeath(){
	
	//Destroy the Enemy
	deathAnimation = new createjs.Sprite(batDeathSpriteSheet, "die");
	deathAnimation.regX = 99;
	deathAnimation.regY = 58;
	deathAnimation.x = enemyXPos;
	deathAnimation.y = enemyYPos;
	deathAnimation.gotoAndPlay("die");
	stage.addChild(deathAnimation);
}

function tickEvent(){
	
	//Make sure enemy bat is within game boundaries
	if(enemyXPos < WIDTH-10 && enemyXPos > 70 )
	{
		enemyXPos += enemyXSpeed;
	} else {
		enemyXSpeed = enemyXSpeed * (-1);
		enemyXPos += enemyXSpeed;
	}
	if(enemyYPos < HEIGHT-10 && enemyYPos > 70)
	{
		enemyYPos += enemyYSpeed;
	} else {
		enemyYSpeed = enemyYSpeed * (-1);
		enemyYPos += enemyYSpeed;
	}


   /* if (enemyXPos < WIDTH-40 && enemyXPos > 40)
    {enemyXPos=enemyXPos}
    else{
        enemyXPos=enemyXPos+30
    }
    if(enemyYPos < HEIGHT-40 && enemyYPos > 40)
	{
		enemyYPos = enemyYPos;
	} else {
    
        enemyYPos = enemyYPos + 30}*/
	animation.x = enemyXPos;
	animation.y = enemyYPos;
}


function handleMouseDown(event){
    
    //Display CrossHair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    crossHair.x = event.clientX-45;
    crossHair.y = event.clientY-45;
    stage.addChild(crossHair);
    createjs.Tween.get(crossHair).to({alpha: 0},1000);
    
    //Play Gunshot sound
    createjs.Sound.play("shot");
	
    //Obtain Shot position 1
    var shotX = Math.round(event.clientX);
    var shotY = Math.round(event.clientY);
    var spriteX = Math.round(animation.x);
    var spriteY = Math.round(animation.y);

    //Compute the X and Y distance
    var distX = Math.abs(shotX - spriteX);
    var distY = Math.abs(shotY - spriteY);

    //Anywhere in the body or head is a hit - but not the wings
   if((Boss1Flag==1) && (Boss1DeathFlag==0) && (distX < 60 && distY < 59 ))
   {        
       if(Boss1ShotCount<5)
       {
       Boss1ShotCount++;
       createjs.Sound.play("BossPain");
       }
      else {
                Boss1DeathFlag=1;
            }
           
   }
else if(distX < 60 && distY < 59 )
    {     
    	//Hit
    	stage.removeChild(animation);
    	batDeath();
    	score += killPoints;
    	scoreText.text = "SCORE: " + score.toString();
    	createjs.Sound.play("deathSound");
    	
		//Increase difficulty as you progress through game
		//Making the Enemy Speed faster
		if(score > 3000){     
			enemyYSpeed = 30;
			enemyXSpeed = 30;
		}else if (score> 2000){
			enemyYSpeed = 20;
			enemyXSpeed = 20;
		}else if (score > 1000){
			enemyYSpeed = 10;
			enemyXSpeed = 10;
		} else {
			enemyYSpeed = 5;
			enemyXSpeed = 5;
		}
       
    	//Create new enemy
    	var timeToCreate = Math.floor((Math.random()*500));
		enemyXPos = Math.floor((Math.random()*700)+50);
		enemyYPos = Math.floor((Math.random()*500)+50);
		enemyXSpeed = enemyXSpeed * (-1);
		enemyYSpeed = enemyYSpeed * (-1);
	    setTimeout(createEnemy,timeToCreate);
        
    } else {
		
    	//Miss
    //	score -= missPoints;
    	scoreText.text = "SCORE: " + score.toString();
    }
}

function updateTime()
{
	gameTime += 1;
	if(gameTime < 0)
	{
		//End Game
		//timerText.text = "GAME OVER";
		stage.removeChild(animation);
		stage.removeChild(crossHair);
        createjs.Sound.removeSound("background");
        var si =createjs.Sound.play("gameOverSound");
		clearInterval(gameTimer);
	}
	else
	{
		//Continue Playing
		//timerText.text = "Time Left: " + gameTime;
		//createjs.Sound.play("tick");
	}
	
	//Remove instructions
	if (score < 57){
		stage.removeChild(instructions);
	}
}
