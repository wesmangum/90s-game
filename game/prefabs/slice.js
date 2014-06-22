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
