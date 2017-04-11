var SimonGame = function() {
  this.count = 1;
  this.buttons = ['green', 'blue', 'red', 'yellow'];
  this.currentCombination = [];
  this.playerMoves = [];
  this.sounds = {
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  };
  this.isStrict = false;
  this.computerCallback = null;
}

SimonGame.prototype.getCurrentCombination = function() {
  return this.currentCombination;
};

SimonGame.prototype.clearGame = function() {
  this.currentCombination = [];
  this.clearPlayer();
  this.count = 0;
}

SimonGame.prototype.clearPlayer = function() {
  this.playerMoves = [];
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

SimonGame.prototype.toggleStrict = function() {
  if (this.isStrict == false) {
    this.isStrict = true;
  } else {
    this.isStrict = false;
  }
}

SimonGame.prototype.setComputerCallback = function(callback) {
  this.computerCallback = callback;
}

SimonGame.prototype.generateMove = function() {
  this.currentCombination.push(this.buttons[(Math.floor(Math.random() * this.buttons.length))]);
  console.log(this.currentCombination);
};

SimonGame.prototype.playerTurn = function(playerClick) {
  this.playerMoves.push(playerClick);
  if (this.playerMoves[this.playerMoves.length - 1] !== this.currentCombination[this.playerMoves.length - 1]) {
    if(this.isStrict){
      console.log('From the beginning');
      this.clearGame();
      this.addCount();
      this.generateMove();
      this.computerCallback();
    } else {
      console.log('Try again');
      this.computerCallback();
      this.clearPlayer();
    }
  } else {
    this.sound(playerClick);
    if (this.playerMoves.length === this.currentCombination.length) {
      if(this.count == 20){
        console.log('You won! Congrats!');
      } else {
        console.log('Next round!');
        this.addCount();
        this.generateMove();
        this.computerCallback();
        this.clearPlayer();
      }
    }
  }
}