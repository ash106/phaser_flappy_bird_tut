'use strict';

var Scoreboard = function(game) {

  Phaser.Group.call(this, game);

  this.gameover = this.create(this.game.width/2, 100, 'gameover');
  this.gameover.anchor.setTo(0.5, 0.5);

  this.scoreboard = this.create(this.game.width/2, 200, 'scoreboard');
  this.scoreboard.anchor.setTo(0.5, 0.5);

  this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, 'flappyfont', '', 18);
  this.add(this.scoreText);

  this.bestScoreText = this.game.add.bitmapText(this.scoreboard.width, 230, 'flappyfont', '', 18);
  this.add(this.bestScoreText);

  this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
  this.startButton.anchor.setTo(0.5, 0.5);
  this.add(this.startButton);

  this.y = this.game.height;
  this.x = 0;
  
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score) {
  var medal, bestScore;

  this.scoreText.setText(score.toString());

  if(!!localStorage) {
    bestScore = localStorage.getItem('bestScore');

    if(!bestScore || bestScore < score) {
      bestScore = score;
      localStorage.setItem('bestScore', bestScore);
    }
  } else {
    bestScore = 'N/A';
  }

  this.bestScoreText.setText(bestScore.toString());

  if(score >= 2 && score < 5) {
    medal = this.game.add.sprite(-65, 7, 'medals', 1);
    medal.anchor.setTo(0.5, 0.5);
    this.scoreboard.addChild(medal);
  } else if(score >= 5) {
    medal = this.game.add.sprite(-65, 7, 'medals', 0);
    medal.anchor.setTo(0.5, 0.5);
    this.scoreboard.addChild(medal);
  }

  if(medal) {
    var emitter = this.game.add.emitter(medal.x, medal.y, 400);
    this.scoreboard.addChild(emitter);
    emitter.width = medal.width;
    emitter.height = medal.height;

    emitter.makeParticles('particle');

    emitter.setRotation(-100, 100);
    emitter.setXSpeed(0, 0);
    emitter.setYSpeed(0, 0);
    emitter.minParticleScale = 0.25;
    emitter.maxParticleScale = 0.5;
    emitter.setAll('body.allowGravity', false);

    emitter.start(false, 1000, 1000);
  }

  this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
};

Scoreboard.prototype.startClick = function() {
  this.game.state.start('play');
};

module.exports = Scoreboard;
