
'use strict';
function Menu() {}

var Ground = require('../prefabs/ground');
var Obstacle = require('../prefabs/obstacle');
var Hammer = require('../prefabs/hammer');
var Pizza = require('../prefabs/pizza');

Menu.prototype = {
  preload: function() {

  },
  create: function() {
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

    this.ground = new Ground(this.game, 0, this.game.height - 50, this.game.width, 112);
    this.game.add.existing(this.ground);

    this.instructionsText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Use your arrow keys to move!', style);
    this.instructionsText.setShadow(2, 3, 'black');
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.isStarted = false;

    this.BGMusic = this.game.add.audio('leoSong');

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
     this.leo.body.velocity.x = 0;
     this.leo.body.velocity.y = 0;
     var speed = 200;

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
  render: function () {
    this.game.debug.body(this.leo);
  },
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
     pizza.fireRate = this.game.time.events.loop(Phaser.Timer.SECOND * 1.5, this.fireSlices, this);
     pizza.fireRate.timer.start();
     this.pizzas.add(pizza);
  },
  fireSlices: function () {
     var pizzas = this.pizzas;
     console.log(pizzas);
     console.log('fire!');
  },
  deathHandler: function () {
     this.leo.destroy();
     this.obstacles.destroy();
     this.BGMusic.stop();
     this.game.state.start('gameover');
  },
  checkStart: function () {
     if (!this.isStarted) {
        this.isStarted = true;
        this.obstacleGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateObstacles, this);
        this.hammerGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.generateHammers, this);
        this.pizzaGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 11, this.generatePizzas, this);
        this.obstacleGenerator.timer.start();
        this.hammerGenerator.timer.start();
        this.pizzaGenerator.timer.start();
        this.instructionsText.destroy();
      //   this.BGMusic.play();
     }
  }
};

module.exports = Menu;
