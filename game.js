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
  this.playerCallback = null;
  this.resultsText = null;
}

SimonGame.prototype.getCurrentCombination = function() {
  return this.currentCombination;
};

SimonGame.prototype.clearGame = function() {
  this.currentCombination = [];
  this.clearPlayer();
  this.count = 1;
}

SimonGame.prototype.clearPlayer = function() {
  this.playerMoves = [];
}

SimonGame.prototype.addCount = function() {
  this.count++;
};

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

SimonGame.prototype.setPlayerCallback = function(callback) {
  this.playerCallback = callback;
}

SimonGame.prototype.setResultsText = function(callback) {
  this.resultsText = callback;
}

SimonGame.prototype.generateMove = function() {
  this.currentCombination.push(this.buttons[(Math.floor(Math.random() * this.buttons.length))]);
  console.log(this.currentCombination);
};

SimonGame.prototype.playerTurn = function(playerClick) {
  this.playerMoves.push(playerClick);
  if (this.playerMoves[this.playerMoves.length - 1] !== this.currentCombination[this.playerMoves.length - 1]) {
    if(this.isStrict){
      this.clearGame();
      this.generateMove();
      this.computerCallback();
      this.resultsText('From the beginning');
    } else {
      this.computerCallback();
      this.resultsText('Try again');
      this.clearPlayer();
    }
  } else {
    this.sound(playerClick);
    this.playerCallback(playerClick);
    if (this.playerMoves.length === this.currentCombination.length) {
      if(this.count == 20){
        this.resultsText('You won! Congrats!');
      } else {
        this.addCount();
        this.generateMove();
        this.computerCallback();
        this.resultsText('Next round!');
        this.clearPlayer();
      }
    }
  }
}