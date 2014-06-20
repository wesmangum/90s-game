'use strict';

var Obstacle = function(game, x, y, int) {
   // console.log('obstacle'+int);
  Phaser.Sprite.call(this, game, x, y, 'obstacle'+int, 1);
  this.scale.setTo(0.25, 0.25);
  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);
  this.body.setSize(180, 180, 0, 0);

  this.body.immovable = true;
  this.body.velocity.x = -200;

  // initialize your prefab here

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
