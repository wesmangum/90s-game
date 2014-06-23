'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '90s-game');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('brittney', require('./states/brittney'));
  game.state.add('characterselect', require('./states/characterselect'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('justin', require('./states/justin'));
  game.state.add('leo', require('./states/leo'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};