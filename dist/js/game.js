(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '90s-game');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('characterselect', require('./states/characterselect'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('leo', require('./states/leo'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":8,"./states/characterselect":9,"./states/gameover":10,"./states/leo":11,"./states/menu":12,"./states/play":13,"./states/preload":14}],2:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

  // initialize your prefab here
  this.autoScroll(-200, 0);
  this.game.physics.arcade.enableBody(this);
  this.body.immovable = true;
};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

  // write your prefab's specific update code here
  
};

module.exports = Ground;

},{}],3:[function(require,module,exports){
'use strict';

var Hammer = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'hammer', frame);
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(1.4, 1.4);
  this.game.physics.arcade.enableBody(this);
  this.body.setSize(35, 60, 0, 0);
  this.body.immovable = true;
  this.body.velocity.x = -200;
  var frames = [];
  for (var i = 0; i < 80; i++) {
     frames.push(i);
  }

  this.animations.add('dance', frames, 10, true);
  this.animations.play('dance');
};

Hammer.prototype = Object.create(Phaser.Sprite.prototype);
Hammer.prototype.constructor = Hammer;

Hammer.prototype.update = function() {
  this.lookBounds();
};
Hammer.prototype.lookBounds = function() {
   if(!this.inWorld){
      this.exists = false;
   }
};

module.exports = Hammer;

},{}],4:[function(require,module,exports){
'use strict';

var Obstacle = function(game, x, y, int) {
  Phaser.Sprite.call(this, game, x, y, 'obstacle'+int, 1);
  this.scale.setTo(0.25, 0.25);
  this.anchor.setTo(0.4, 0.4);
  this.game.physics.arcade.enableBody(this);
  this.body.setSize(250, 250, 0, 0);

  this.body.immovable = true;
  this.body.velocity.x = -200;
};

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

Obstacle.prototype.update = function() {
  this.lookBounds();
};

Obstacle.prototype.lookBounds = function() {
   if(!this.inWorld){
      this.exists = false;
   }
};

module.exports = Obstacle;

},{}],5:[function(require,module,exports){
'use strict';

var Pizza = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pizza', frame);
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0.3, 0.3);
  this.game.physics.arcade.enableBody(this);
  this.game.add.tween(this).to({angle: 10}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  this.body.setSize(180, 180, 0, 0);
  this.body.immovable = true;
  this.body.velocity.x = -200;

};

Pizza.prototype = Object.create(Phaser.Sprite.prototype);
Pizza.prototype.constructor = Pizza;

Pizza.prototype.update = function() {
   this.lookBounds();
};

Pizza.prototype.lookBounds = function () {
   if(!this.inWorld){
      this.exists = false;
   }
};

module.exports = Pizza;

},{}],6:[function(require,module,exports){
'use strict';

var Scoreboard = function(game, x, y, frame) {

  var gameover;

  Phaser.Group.call(this, game);

  this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
  this.scoreboard.anchor.setTo(0.5, 0.5);

  gameover = this.create(this.game.width / 2, 100, 'gameover');
  gameover.anchor.setTo(0.5, 0.5);
  gameover.scale.setTo(0.5, 0.5);

  this.textScore = this.game.add.bitmapText(this.scoreboard.width - 325, 175, 'font', 'Score:', 16);
  this.add(this.textScore);

  this.scoreText = this.game.add.bitmapText(this.scoreboard.width - 325, 200, 'font', '', 16);
  this.add(this.scoreText);


  this.startText = this.game.add.bitmapText(this.scoreboard.width - 320 , 275, 'font', 'Click to retry', 12);
  this.add(this.startText);

  this.startButton = this.game.add.button((this.game.width/2) - 125, 325, 'startButton', this.startClick, this);
  this.startButton.anchor.setTo(0.5, 0.5);
  this.add(this.startButton);

  this.pic = this.game.add.sprite(200, 90, 'leoDead');
  this.add(this.pic);
  var frames =[];
  for (var i = 0; i < 23; i++) {
     frames.push(i);
  }
  this.pic.animations.add('play', frames, 12, true);
  this.pic.animations.play('play');

  this.y = this.game.height;
  this.x = 0;
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.update = function() {

};

Scoreboard.prototype.startClick = function(character) {
   this.game.state.start('characterselect');
};

Scoreboard.prototype.show = function(score) {
   this.scoreText.setText(score.toString());
   this.game.add.tween(this).to({y: 50}, 1000, Phaser.Easing.Bounce.Out, true);
};

module.exports = Scoreboard;

},{}],7:[function(require,module,exports){
'use strict';

var Slice = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'slice');
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0.1, 0.1);
  this.game.physics.arcade.enableBody(this);
  this.body.immovable = true;
  this.body.setSize(200, 200, 0, 0);


};

Slice.prototype = Object.create(Phaser.Sprite.prototype);
Slice.prototype.constructor = Slice;

Slice.prototype.update = function() {
   this.lookBounds();
};

Slice.prototype.lookBounds = function () {
   if(!this.inWorld){
      this.exists = false;
   }
};

module.exports = Slice;

},{}],8:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
     this.game.scale.pageAlignHorizontally = true;
     this.game.scale.pageAlignVertically = true;
     this.game.scale.refresh();
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],9:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.style = { font: '20px Arial', fill: '#ffffff', align: 'center'};
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'menubg');
    this.leo = this.game.add.button(this.game.width/2, this.game.height/3, 'leo', this.selectLeo, this);
    this.leo.anchor.setTo(0.5, 0.5);
    this.leo.scale.setTo(0.4, 0.4);
    this.game.add.tween(this.leo).to({angle: 20}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Select your character!', this.style);
    this.instructionsText.setShadow(2, 3, 'black');
    this.instructionsText.anchor.setTo(0.5, 0.5);
   //  this.startButton = this.game.add.button(this.game.width/2, 200, 'logo', this.startClick, this);
   //  this.startButton.anchor.setTo(0.5, 0.5);
   //  this.startButton.scale.setTo(0.75, 0.75);
   //  this.sprite = this.game.add.sprite(this.game.world.centerX, 200, 'logo');
   //  this.sprite.scale.setTo(0.75, 0.75);
   //  this.sprite.anchor.setTo(0.5, 0.5);

   //  this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
   //  this.titleText.anchor.setTo(0.5, 0.5);

   //  this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click the sticker to play!', style);
   //  this.instructionsText.setShadow(2, 3, 'black');
   //  this.instructionsText.anchor.setTo(0.5, 0.5);
   //
   //  this.game.add.tween(this.startButton).to({y: 190}, 500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
  },
  update: function() {

  },
  selectLeo: function () {
     this.selected = 'leo';
     this.leo.kill();
     this.leo = this.game.add.sprite(this.game.width/2, this.game.height/3, 'leo2');
     this.leo.anchor.setTo(0.5, 0.5);
     this.leo.scale.setTo(0.5, 0.5);
     this.game.add.tween(this.leo).to({angle: 20}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

     this.start = this.game.add.button(this.game.width/2, this.game.height - 100, 'pizza', this.startGame, this);
     this.startText = this.game.add.text(this.game.width/2, this.start.game.height - 100, 'START!', this.style);
     this.start.anchor.setTo(0.5, 0.5);
     this.start.scale.setTo(0.5, 0.5);
     this.startText.anchor.setTo(0.5, 0.5);
  },
  startGame: function () {
      if (this.selected === 'leo') {
         this.game.state.start('leo');
      }
   }
};

module.exports = Menu;

},{}],10:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('menu');
    }
  }
};
module.exports = GameOver;

},{}],11:[function(require,module,exports){

'use strict';
function Leo() {}

var Ground = require('../prefabs/ground');
var Obstacle = require('../prefabs/obstacle');
var Hammer = require('../prefabs/hammer');
var Pizza = require('../prefabs/pizza');
var Slice = require('../prefabs/slice');
var Scoreboard = require('../prefabs/scoreboard');

Leo.prototype = {
  preload: function() {

  },
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    var style = { font: '20px Arial', fill: '#ffffff', align: 'center'};
   //  this.background = new Background(this.game, 0, 0, this.game.width, this.game.height);

    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.background.autoScroll(-20, 0);

    this.leo = this.game.add.sprite(100, this.game.height/2, 'leo2');
    this.leo.anchor.setTo(0.5, 0.5);
    this.leo.scale.setTo(0.4, 0.4);
    this.game.physics.arcade.enableBody(this.leo);
    this.leo.body.setSize(180, 180, 0, 0);
    this.game.add.tween(this.leo).to({angle: 20}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.obstacles = this.game.add.group();
    this.hammers = this.game.add.group();
    this.pizzas = this.game.add.group();
    this.slices = this.game.add.group();

    this.ground = new Ground(this.game, 0, this.game.height - 50, this.game.width, 112);
    this.game.add.existing(this.ground);

    this.instructionsText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Use your arrow keys to move!', style);
    this.instructionsText.setShadow(2, 3, 'black');
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.isStarted = false;

    this.BGMusic = this.game.add.audio('leoSong');

    this.score = 0;
    this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'font', this.score.toString(), 24);

    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  update: function() {
     this.game.physics.arcade.collide(this.leo, this.ground, this.deathHandler, null, this);
     this.obstacles.forEach(function (obstacle) {
        this.game.physics.arcade.collide(this.leo, obstacle, this.deathHandler, null, this);
     }, this);
     this.hammers.forEach(function (hammer) {
        this.game.physics.arcade.collide(this.leo, hammer, this.deathHandler, null, this);
     }, this);
     this.pizzas.forEach(function (pizza) {
        this.game.physics.arcade.collide(this.leo, pizza, this.deathHandler, null, this);
     }, this);
     this.slices.forEach(function (slice) {
        this.game.physics.arcade.collide(this.leo, slice, this.deathHandler, null, this);
     }, this);
     this.leo.body.velocity.x = 0;
     this.leo.body.velocity.y = 0;
     var speed = 300;

     if (this.cursors.left.isDown) {
        this.checkStart();
        this.leo.body.velocity.x =  -(speed);
     } else if (this.cursors.right.isDown) {
        this.checkStart();
        this.leo.body.velocity.x = speed;
     }
     if (this.cursors.up.isDown) {
        this.checkStart();
        this.leo.body.velocity.y =  -(speed);
     } else if (this.cursors.down.isDown) {
        this.checkStart();
        this.leo.body.velocity.y = speed;
     }
  },
  // render: function () {
  //   this.game.debug.body(this.leo);
  //   this.obstacles.forEach(function (obstacle) {
  //      this.game.debug.body(obstacle);
  //   }, this);
  //   this.pizzas.forEach(function (pizza) {
  //      this.game.debug.body(pizza);
  //   }, this);
  //   this.hammers.forEach(function (hammer) {
  //      this.game.debug.body(hammer);
  //   }, this);
  //   this.slices.forEach(function (slice) {
  //      this.game.debug.body(slice);
  //   }, this);
  // },
  generateObstacles: function () {
     var y = this.game.rnd.integerInRange(50, 500);
     var int = this.game.rnd.integerInRange(1, 5);
     var obstacleCheck = this.obstacles.getFirstExists(false);
     if(obstacleCheck) {
        obstacleCheck.destroy();
     }
     var obstacle = new Obstacle(this.game, this.game.width, y, int);
     this.obstacles.add(obstacle);
  },
  generateHammers: function () {
     var hammerCheck = this.hammers.getFirstExists(false);
     if (hammerCheck) {
        hammerCheck.destroy();
     }
     var hammer  = new Hammer(this.game, this.game.width, this.game.height - 110);
     this.hammers.add(hammer);
  },
  generatePizzas: function () {
     var y = this.game.rnd.integerInRange(50, 500);
     var pizzaCheck = this.pizzas.getFirstExists(false);
     if (pizzaCheck) {
        pizzaCheck.destroy();
     }
     var pizza  = new Pizza(this.game, this.game.width, y);
     pizza.fireRate = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.fireSlices, this);
     pizza.fireRate.timer.start();
     this.pizzas.add(pizza);
  },
  fireSlices: function () {
     var sliceCheck = this.slices.getFirstExists(false);
     if (sliceCheck) {
        sliceCheck.destroy();
     }
     this.pizzas.forEach(function (pizza) {
        var slice = new Slice(this.game, pizza.world.x, pizza.world.y);
        slice.rotation = this.game.physics.arcade.moveToObject(slice, this.leo, 400);
        this.slices.add(slice);
     }, this);
  },
  scorePoint: function () {
     this.score++;
     this.scoreText.setText(this.score.toString());
  },
  deathHandler: function () {
     this.leo.destroy();
     this.scoreText.destroy();
     this.obstacles.destroy();
     this.pizzas.destroy();
     this.hammers.destroy();
     this.ground.stopScroll();
     this.background.stopScroll();
     this.obstacleGenerator.timer.stop();
     this.hammerGenerator.timer.stop();
     this.pizzaGenerator.timer.stop();
     this.scoring.timer.stop();
     this.BGMusic.stop();
     this.scoreboard = new Scoreboard(this.game);
     this.game.add.existing(this.scoreboard);
     this.scoreboard.show(this.score);
   //   this.game.state.start('gameover');
  },
  checkStart: function () {
     if (!this.isStarted) {
        this.isStarted = true;
        this.obstacleGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateObstacles, this);
        this.hammerGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.generateHammers, this);
        this.pizzaGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 11, this.generatePizzas, this);
        this.scoring = this.game.time.events.loop(Phaser.Timer.SECOND * 0.25, this.scorePoint, this);
        this.obstacleGenerator.timer.start();
        this.hammerGenerator.timer.start();
        this.pizzaGenerator.timer.start();
        this.scoring.timer.start();
        this.instructionsText.destroy();
        this.BGMusic.play();
     }
  },
  shutdown: function () {
     this.leo.destroy();
     this.obstacles.destroy();
     this.pizzas.destroy();
     this.hammers.destroy();
     this.scoreboard.destroy();
  }
};

module.exports = Leo;

},{"../prefabs/ground":2,"../prefabs/hammer":3,"../prefabs/obstacle":4,"../prefabs/pizza":5,"../prefabs/scoreboard":6,"../prefabs/slice":7}],12:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '20px Arial', fill: '#ffffff', align: 'center'};
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'menubg');
    this.startButton = this.game.add.button(this.game.width/2, 200, 'logo', this.startClick, this);
    this.startButton.anchor.setTo(0.5, 0.5);
    this.startButton.scale.setTo(0.75, 0.75);
   //  this.sprite = this.game.add.sprite(this.game.world.centerX, 200, 'logo');
   //  this.sprite.scale.setTo(0.75, 0.75);
   //  this.sprite.anchor.setTo(0.5, 0.5);

   //  this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
   //  this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click the sticker to play!', style);
    this.instructionsText.setShadow(2, 3, 'black');
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.game.add.tween(this.startButton).to({y: 190}, 500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
  },
  update: function() {

  },
  startClick: function () {
     this.game.state.start('characterselect');
  }
};

module.exports = Menu;

},{}],13:[function(require,module,exports){

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
      this.sprite.inputEnabled = true;
      
      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
      this.sprite.body.bounce.setTo(1,1);
      this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
      this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);

      this.sprite.events.onInputDown.add(this.clickListener, this);
    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;
},{}],14:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('logo', 'assets/logo.jpg');
    this.load.image('menubg', 'assets/bg2.jpg');
    this.load.image('leo', 'assets/leo1.png');
    this.load.image('leo2', 'assets/leo2.png');
    this.load.image('pizza', 'assets/pizza.jpg');
    this.load.image('slice', 'assets/pizza-slice.png');
    this.load.image('background', 'assets/bg1.jpg');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('obstacle1', 'assets/apple.png');
    this.load.image('obstacle2', 'assets/microsoft.png');
    this.load.image('obstacle3', 'assets/n64.png');
    this.load.image('obstacle4', 'assets/nick.png');
    this.load.image('obstacle5', 'assets/mtv.jpeg');
    this.load.spritesheet('hammer', 'assets/mchammer.png', 56, 82);
    this.load.spritesheet('leoDead', 'assets/leodead.png', 400, 180);
    this.load.bitmapFont('font', 'assets/font.png', 'assets/font.fnt');
    this.load.image('scoreboard', 'assets/scoreboard.png');
    this.load.image('gameover', 'assets/gameover.png');
    this.load.image('startButton', 'assets/start.png');

    this.load.audio('leoSong', 'assets/leo.mp3');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])