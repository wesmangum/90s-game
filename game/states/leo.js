
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
