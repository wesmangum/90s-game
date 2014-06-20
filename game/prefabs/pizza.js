'use strict';

var Pizza = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pizza', frame);
  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0.4, 0.4);
  this.game.physics.arcade.enableBody(this);
  this.game.add.tween(this).to({angle: 10}, 500, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
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
}

module.exports = Pizza;
