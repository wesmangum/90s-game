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
},{"./states/boot":3,"./states/characterselect":4,"./states/gameover":5,"./states/leo":6,"./states/menu":7,"./states/play":8,"./states/preload":9}],2:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){

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

},{}],5:[function(require,module,exports){

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
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],6:[function(require,module,exports){

'use strict';
function Menu() {}

var Ground = require('../prefabs/ground');

Menu.prototype = {
  preload: function() {

  },
  create: function() {
   //  this.style = { font: '20px Arial', fill: '#ffffff', align: 'center'};
   //  this.background = new Background(this.game, 0, 0, this.game.width, this.game.height);

    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.background.autoScroll(-20, 0);
    this.leo = this.game.add.sprite(100, this.game.height/2, 'leo2');
    this.leo.anchor.setTo(0.5, 0.5);
    this.leo.scale.setTo(0.4, 0.4);
    this.game.add.tween(this.leo).to({angle: 20}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
    this.game.physics.arcade.enableBody(this.leo);

    this.ground = new Ground(this.game, 0, this.game.height - 50, this.game.width, 112);
    this.game.add.existing(this.ground);

    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  update: function() {
     this.game.physics.arcade.collide(this.leo, this.ground);
     this.leo.body.velocity.x = 0;
     this.leo.body.velocity.y = 0;
     var speed = 175;

     if (this.cursors.left.isDown) {
        this.leo.body.velocity.x =  -(speed);
     } else if (this.cursors.right.isDown) {
        this.leo.body.velocity.x = speed;
     }
      if (this.cursors.up.isDown) {
        this.leo.body.velocity.y =  -(speed);
     }else if (this.cursors.down.isDown) {
        this.leo.body.velocity.y = speed;
     }
  }
};

module.exports = Menu;

},{"../prefabs/ground":2}],7:[function(require,module,exports){

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
     console.log('start!');
     this.game.state.start('characterselect');
  }
};

module.exports = Menu;

},{}],8:[function(require,module,exports){

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
},{}],9:[function(require,module,exports){

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
    this.load.image('background', 'assets/bg1.jpg');
    this.load.image('ground', 'assets/ground.png');

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