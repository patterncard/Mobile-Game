window.addEventListener('load', function(){

    //constants
    var GAME_WIDTH = 640;
    var GAME_HEIGHT = 360;

    let gameLife = true;

    //enemies
    var enemies = [
      {
        x: 100, //x coordinate
        y: 100, //y coordinate
        speedY: 1, //speed in Y
        w: 40, //width
        h: 40 //heght
      },
      {
        x: 220,
        y: 100,
        speedY: 2,
        w: 40,
        h: 40
      },
      {
        x: 320,
        y: 100,
        speedY: 3,
        w: 40,
        h: 40
      },
      {
        x: 450,
        y: 100,
        speedY: 4,
        w: 40,
        h: 40
      }
    ];

    let player = {
      x: 10,
      y: 160,
      speedX: 2,
      w: 40,
      h:40,
      isMoving: false
    }

    let goal = {
      x: 580,
      y: 160,
      w: 50,
      h: 36
    }

    // let sprites = {enemies, player, goal};
    let sprites = {};

    let movePlayer = function(){
      player.isMoving = true;
    }

    let stopPlayer = function(){
      player.isMoving = false;
    }

    //grab the canvas and context
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", movePlayer);
    canvas.addEventListener("mouseup", stopPlayer);
    canvas.addEventListener("touchstart", movePlayer);
    canvas.addEventListener("touchend", stopPlayer);

    let load = function(){
      sprites.player = new Image();
      sprites.player.src = 'images/hero.png';

      sprites.background = new Image();
      sprites.background.src = 'images/floor.png';

      sprites.enemy = new Image();
      sprites.enemy.src = 'images/enemy.png';

      sprites.goal = new Image
      sprites.goal.src = 'images/chest.png';
    }

    //update the logic
    var update = function() {
      if(checkCollision(player, goal)){
        gameLife = false;
        alert('You won the game');
        window.location = " ";
      }

      if(player.isMoving){
        player.x += player.speedX;  
      }
      var i = 0;
      var n = enemies.length;

      //update the position of all enemies
      enemies.forEach(function(element){

        if(checkCollision(player, element)){
          gameLife = false;
        alert('Game Over');
        window.location = " ";
        }

        element.y += element.speedY;

        if(element.y <= 10){
          element.y = 10;
          element.speedY *= -1;
        }
        else if(element.y >= GAME_HEIGHT - 50){
          element.y = GAME_HEIGHT - 50;
          element.speedY *= -1;
        }
      });
    };

    //show the game on the screen
    var draw = function() {
      //clear the canvas
      ctx.clearRect(0, 0, GAME_WIDTH,GAME_HEIGHT);

      ctx.drawImage(sprites.background, 0, 0);

      ctx.drawImage(sprites.player, player.x, player.y);

      enemies.forEach(function(element, index){
        ctx.drawImage(sprites.enemy, element.x, element.y);
      })

      ctx.drawImage(sprites.goal, goal.x, goal.y);
    };

    //gets executed multiple times per second
    var step = function() {

      update();
      draw();

      if(gameLife){
        window.requestAnimationFrame(step);
      }
    };

    let checkCollision = function(rect1, rect2){
      let closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
      let closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);

      return closeOnHeight && closeOnWidth;
    }

    //initial kick
    load();
    step();
    });