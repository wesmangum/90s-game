
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
