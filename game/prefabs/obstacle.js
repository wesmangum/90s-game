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
