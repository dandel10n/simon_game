$(document).ready(function(){
  var game = new SimonGame();

  $(".startButton").click(function() {
    game.generateMove();
    playComputerCombination();
  });

  $(".strictButton").click(function(){
    game.toggleStrict();
    console.log("is strict:", game.isStrict);
  });

  $(".resetButton").click(function(){
    game.clearGame();
  })

  $(".gameButton").click(function(){
    game.playerTurn($(this).data("color"));
  });

  function playComputerCombination() {
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
    }, 900);
    $(".scoreDisplay").text(game.count);
  };

  function colorPlayerMove(playerClick) {
     $("#" + playerClick).addClass("active");
      (function(move) {
        setTimeout(function() {
          $("#" + move).removeClass("active");
        }, 300);
      })(playerClick);
  };

  function resultsText(content) {
    $(".resultDisplay").text(content);
    (function() {
        setTimeout(function() {
         $(".resultDisplay").text(" ");
        }, 1000);
      })();
  }

  game.setComputerCallback(playComputerCombination);
  game.setPlayerCallback(colorPlayerMove);
  game.setResultsText(resultsText);
})
