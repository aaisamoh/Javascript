  var myGameMario;

    var myGameDragon;
    var mario = 1;
    var dragon = 1;
    var isPaused = true;
    var canvWith = 1200;
    var canvHeight = 500;
    var squer = 100;
    var bool = true;

    function startGame() {

      myGameMario = new component(squer, squer, "red", 0, canvHeight - squer, false);
      myGameDragon = new component(squer, squer, "green", canvWith, canvHeight - squer, true);

      myGameArea.start();
    }

    var myGameArea = {
      canvas: document.createElement("canvas"),
      start: function() {

        this.canvas.width = canvWith;
        this.canvas.height = canvHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 300);
        document.body.onkeydown = function() {
          Keyboard(event)
        };
        document.body.onkeyup = function() {
          if (bool) clearmove();

        };
        
      },
      clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
      pause: function() {
        isPaused = false;
        setTimeout(function() {
          isPaused = true;
        }, 500);
      },
      stop: function() {
        clearInterval(this.interval);

      }
    }

    function component(width, height, color, x, y, direction) {

      this.width = width;
      this.height = height;
      this.speedX = 0;
      this.speedY = 0;
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.gravity = 0.01;
      this.gravitySpeed = 0;
      this.bounce = 0.6;
      this.logic = false;
      this.update = function() {
        ctx = myGameArea.context;

      
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

      this.newPos = function() {

        this.x += this.speedX;
        this.y += -this.speedY + this.gravitySpeed;

        if (this.logic) {
          this.gravitySpeed += this.gravity;
          // move to ground
          this.hitBottom();
        } else {
          // click up
          this.logic = true;

        }


        // Dragon/up
        if (this.y <= 0)
          this.y = this.height;


        //down dragn
        if (this.y > myGameArea.canvas.height - this.height) {
          this.y = -this.height;

        }

      }
            // Mario go down
      this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
          this.y = rockbottom;
          this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
      }

      this.crashWith = function(otherobj) {

        // dragon/coordenat
        var marioleft = this.x;
        var marioright = this.x + (this.width);
        var mariotop = this.y;
        var mariobottom = this.y + (this.height);
        // MARIO
        var dragonleft = otherobj.x;
        var dragonright = otherobj.x + (otherobj.width);
        var dragontop = otherobj.y;
        var dragonbottom = otherobj.y + (otherobj.height);

        console.log(dragonbottom + "(bottom)mario" + mariobottom);
        console.log(dragontop + "(top) mario" + mariotop);
        console.log(dragonright + "(RIGHT)mario" + marioright);
        console.log(dragonleft + "(LEFT) mario" + marioleft);



        if ((mariobottom == dragontop && !myGameMario.direction) ||
          (dragontop == mariotop && dragonleft == marioright && !myGameMario.direction)) {

          document.getElementById("mario").innerHTML = mario++;
          myGameArea.pause();
        } else
        if (
          (dragontop == mariotop && dragonright == marioleft && !myGameDragon.direction) ||
          (dragonbottom == mariotop && !myGameDragon.direction)) {

          document.getElementById("drogan").innerHTML = dragon++;
          myGameArea.pause();
        }


        if (dragon > 10 || mario > 10) {
          if (dragon > mario) document.getElementById("result").innerHTML = "Game over!. Dragon win the game."
          else document.getElementById("result").innerHTML = "Game over!. Mario win the game."
          myGameArea.stop();
        }
      }
    }

    function updateGameArea() {

      if (isPaused) {

        myGameArea.clear();
        // moveMario();
        dragonmove();
       
        // go to left then dragon/ right
        if (myGameDragon.direction == false && myGameDragon.x < myGameArea.canvas.width - myGameDragon.width) {
          myGameDragon.x = myGameDragon.x + myGameDragon.width;
        } else
          myGameDragon.direction = true;

        if (myGameDragon.direction == true && myGameDragon.x > 0) {
          myGameDragon.x = myGameDragon.x - myGameDragon.width;
        } else
          myGameDragon.direction = false;


        // left mario
        if (myGameMario.x <= 0)
          myGameMario.x = myGameMario.width;
        else

          // right mario
          if (myGameMario.x >= myGameArea.canvas.width - myGameMario.width) {
            myGameMario.x = myGameArea.canvas.width - 2 * myGameMario.width;
          }

        myGameDragon.newPos();
        myGameDragon.update();
        myGameMario.newPos();
        myGameMario.update();
        myGameMario.crashWith(myGameDragon);
      }
    }

    // keyboard events
    function Keyboard(event) {
      var char = event.which || event.keyCode;
      document.getElementById("demo").innerHTML = "The Unicode CHARACTER code is: " + char;
      switch (char) {

        case 38:
          {
            myGameMario.logic = false;bool = false;
            moveup();

          } break;
        case 37:
          {
            moveleft();bool = true;
          }  break;
        case 39:
          {
            moveright();bool = true;
          }  break;

      }

    }

    function moveMario() {

      switch (Math.floor(Math.random() * 3) + 1) {
        case 1:
          {
            moveup();
            break;
          }
        case 2:
          {
            movedown();
            break;
          }

      }
    }

    function dragonmove() {

      switch (Math.floor(Math.random() * 4) + 1) {
        case 1:
          {
            dragonmoveup();
            break;
          }
        case 2:
          {
            dragonmovedown();
            break;
          }
      }

    }

    function dragonmoveup() {
      myGameDragon.speedY = -myGameDragon.height;

    }

    function dragonmovedown() {
      myGameDragon.speedY = myGameDragon.height;

    }

    function moveup() {
      myGameMario.speedY = -myGameMario.height;

    }

    function movedown() {
      myGameMario.speedY = myGameMario.height;

    }

    function moveleft() {
      myGameMario.speedX = -myGameMario.width;

    }

    function moveright() {
      myGameMario.speedX = myGameMario.width;

    }

    function clearmove() {
      myGameMario.speedX = 0;
      myGameMario.speedY = 0;
    }

 