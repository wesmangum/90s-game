'use strict';

var Hammer = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'hammer', frame);
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(1.5, 1.5);
  this.game.physics.arcade.enableBody(this);
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
