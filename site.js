$(document).ready(function(){
  var game = new SimonGame();

  $(".startButton").on("click", function() {
    $(".startButton").text("reset").removeClass("startButton").addClass("reset");
    startTheGame();
  });

  $(".strictButton").on("click", function(){
    game.toggleStrict();
    if (game.isStrict) {
      $(".strictButton").css("background-color", "rgb(255, 88, 88)");
    } else {
      $(".strictButton").css("background-color", "#fff");
    }
  });

  $(".reset").on("click", function(){
    startTheGame();
  });

  function playComputerCombination() {
    var moves = game.getCurrentCombination();
    var i = 0;

    forbidClick();

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
        allowClick();
      }
    }, 900);
    $(".scoreDisplay").text(game.count);
  };

  function startTheGame() {
    game.clearGame();
    $(".scoreDisplay").text(game.count);
    game.generateMove();
    playComputerCombination();
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
    if (content === 'You won! Congrats!') {
      $(".scoreDisplay").text("1");
    }
  }

  function forbidClick() {
    $(".gameButton").off("click");
    $(".reset").off("click");
  };

  function allowClick() {
    $(".gameButton").on("click", function(){
      game.playerTurn($(this).data("button"));
    });
    $(".reset").on("click", function(){
      startTheGame();
    });
  };

  game.setComputerCallback(playComputerCombination);
  game.setPlayerCallback(colorPlayerMove);
  game.setResultsText(resultsText);
})
