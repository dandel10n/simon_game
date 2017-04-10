$(document).ready(function(){
  var game = new SimonGame();

  $(".startButton").click(function() {
    game.generateMove();
    computerMove();
  });

  function computerMove() {
    var moves = game.getCurrentCombination();
    var i = 0;

    var playingSound = setInterval(function(){
      game.sound(moves[i]);

      $("#" + moves[i]).addClass("active");
      (function(move) {
        setTimeout(function() {
          $("#" + move).removeClass("active");
        }, 300);
      })(moves[i]);

      i++;
      if (i >= moves.length) {
        clearInterval(playingSound);
      }
    }, 600);

    game.clearPlayer();
  }
})
