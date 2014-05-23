
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 500;

      this.background = this.game.add.sprite(0, 0, 'background');
    },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;