var SimonGame = function() {
  this.count = 1;
  this.buttons = ['green', 'blue', 'red', 'yellow'];
  this.currentCombination = [];
  this.player = [];
  this.sounds = {
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  };
  this.isStrict = false;
}

SimonGame.prototype.getCurrentCombination = function() {
  return this.currentCombination;
};

SimonGame.prototype.clearGame = function() {
  this.currentCombination = [];
  this.count = 0;
}

SimonGame.prototype.clearPlayer = function() {
  this.player = [];
}

SimonGame.prototype.addCount = function() {
  this.count++;
};

SimonGame.prototype.nextLevel = function() {
  this.addCount();
}

SimonGame.prototype.sound = function(name) {
  switch(name) {
    case 'green':
      this.sounds.green.play();
      break;
    case 'blue':
      this.sounds.blue.play();
      break;
    case 'red':
      this.sounds.red.play();
      break;
    case 'yellow':
      this.sounds.yellow.play();
      break;
  };
}


SimonGame.prototype.strict = function() {
  if (this.strict == false) {
    this.strict = true;
  } else {
    game.strict = false;
  }
}

SimonGame.prototype.generateMove = function() {
  this.currentCombination.push(this.buttons[(Math.floor(Math.random() * this.buttons.length))]);
  console.log(this.currentCombination);
};

SimonGame.prototype.addToPlayer = function(playerClick) {
  this.player.push(playerClick);
  this.playerTurn(playerClick);
} 

SimonGame.prototype.playerTurn = function(playerClicks) {
  if (this.player[this.player.length - 1] !== this.currentGame[this.player.length - 1]) {
    if(this.strict){
      console.log('From the beginning');
      this.clearGame();
    } else {
      console.log('Try again');
      computerMove();//?????
    }
  } else {
    sound(playerClicks);
    if (this.player.length === this.currentGame.length) {
      if(this.count == 20){
        console.log('You won! Congrats.');
      } else {
        console.log('Next round!');
        this.addCount();
      }
    }
  }
}