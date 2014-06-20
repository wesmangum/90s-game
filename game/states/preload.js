
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
    this.load.image('obstacle1', 'assets/apple.png');
    this.load.image('obstacle2', 'assets/microsoft.png');
    this.load.image('obstacle3', 'assets/n64.png');
    this.load.image('obstacle4', 'assets/nick.png');
    this.load.image('obstacle5', 'assets/mtv.jpeg');
    this.load.spritesheet('hammer', 'assets/mchammer.png', 56, 82);

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
