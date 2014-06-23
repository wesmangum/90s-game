'use strict';

var Scoreboard = function(game, x, y, frame) {

  var gameover;

  Phaser.Group.call(this, game);

  this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
  this.scoreboard.anchor.setTo(0.5, 0.5);

  gameover = this.create(this.game.width / 2, 100, 'gameover');
  gameover.anchor.setTo(0.5, 0.5);
  gameover.scale.setTo(0.5, 0.5);

  this.textScore = this.game.add.bitmapText(this.game.width/2 - 100, 200, 'font', 'Score: ', 24);
  this.add(this.textScore);

  // this.scoreText = this.game.add.bitmapText(, 200, 'font', '', 16);
  // this.add(this.scoreText);

  // this.initialText = this.game.add.bitmapText(this.scoreboard.width - 125, 175, 'font', 'Enter Your Initials', 12);
  // this.add(this.initialText);
  // $('#highscore').append('<input id="name", type="text"></input>');
  // this.firstInitial = this.game.add('<input type="text"></input>');
  // this.add(this.firstInitial);

  this.startText = this.game.add.bitmapText(this.scoreboard.width/2 + 60, 275, 'font', 'Click to retry', 12);
  this.add(this.startText);

  this.startButton = this.game.add.button(this.game.width/2, 325, 'startButton', this.startClick, this);
  this.startButton.anchor.setTo(0.5, 0.5);
  this.add(this.startButton);

  // this.pic = this.game.add.sprite(200, 90, 'leoDead');
  // this.add(this.pic);
  // var frames =[];
  // for (var i = 0; i < 23; i++) {
  //    frames.push(i);
  // }
  // this.pic.animations.add('play', frames, 12, true);
  // this.pic.animations.play('play');

  this.y = this.game.height;
  this.x = 0;
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.update = function() {

};

Scoreboard.prototype.startClick = function(character) {
   this.game.state.start('characterselect');
};

Scoreboard.prototype.show = function(score) {
   this.textScore.setText('Score: ' + score.toString());
   this.game.add.tween(this).to({y: 50}, 1000, Phaser.Easing.Bounce.Out, true);
};

module.exports = Scoreboard;
