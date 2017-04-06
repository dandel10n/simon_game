var SimonGame = {
  this.count = 0;
  this.buttons = ['green', 'blue', 'red', 'yellow'];
  this.currentCombination = [];
  this.player = [];
  this.sounds = {
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    dark: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  };
  this.isStrict = false;
}

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

SimonGame.prototype.generateMove = function() {
  this.currentCombination.push(this.buttons[(Math.floor(Math.random() * this.buttons.length))]);
};

SimonGame.prototype.showMove = function() {
  
}