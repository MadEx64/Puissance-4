$(document).ready(function() {

(function($) {
  $.fn.connect4 = function(y, x, player1, player2, color_one, color_two) {
      var game_on = true;
      var current = null;
      var status = true;
      var text = "It's your turn ";
      var countOne = 0;
      var countTwo = 0;
      var currentPlayer = player1;
      var tokenCount = y * x;

      function color(color) {
          $("body").prepend("<div class='hide'><div>");
          $(".hide").css("background-color", color_one);
          var curColorOne = $(".hide").css("background-color");
          var resultOne = curColorOne.substring(0,3);
          if (resultOne != "rgb") {
              color_one = "rgb(255,0,0)";
          }
          else {
              color_one = curColorOne;
          }

          $("body").prepend("<div class='hide'><div>");
          $(".hide").css("background-color", color_two);
          var curColorTwo = $(".hide").css("background-color");
          var resultTwo = curColorTwo.substring(0,3);
          if (resultTwo != "rgb") {
              color_two = "rgb(200,45,61)";
          }
          else {
              color_two = curColorTwo;
          }

          function checkColor(countColor) {
              if(color_two === color_one) {
                  color_one = "rgb(255," + (170 - countColor) + ",0)";
                  checkColor(countColor - 70);
              }
              else {
                  return;
              }
          }
          checkColor(90);

      }
      color();

      function createLayout() {
          $("header").css({"background-color": "rgb(71, 72, 69)", "display": "flex", "justify-content": "center", "color": "white"});
          $("body").append("<div><p class='playername content'>" + text + currentPlayer + "</p></div>");
          $(".playername").css({"text-shadow": "2px 2px 3px black", "padding": "6px"});
          $(".content").css({"color": "white", "text-align": "center", "font-size": "1.5em"});
          $("div").css({"margin": "25px auto", "width": "500px", "height": "100%", "border-radius": "2px", "background-color": color_one});
          $(".content").css({"text-align": "center", "font-size": "1.5em", "color": "white"});
          $("body").append("<table></table>");
          $("table").css({"margin": "0px auto", "border": "5px solid blue", "background-color": "blue"});
          const replay = $("<button>Replay</button>").addClass("replay");
          $("header").prepend(replay);
          const back = $("<button>Back</button>").addClass("back");
          $("header").append(back);
          $("button").css({"cursor": "pointer", "text-align": "center", "padding": "12px 20px", "font-size": "24px",
            "margin": "auto auto", "border": "none", "font-weight": "bold", "color": "white", "background-color": "transparent", "border-bottom": "4px solid #f14e51", "transition": "all 0.3s"});

          for (var i = 0; i < y; i++) {
              $("table").append("<tr id='" + i + "tr'></tr>");
              for (var j = 0; j < x; j++) {
                  var td = $("<td></td>").attr("data-position", i + "-" + j);
                  $("#" + i + "tr").append(td);
                  td.css({"cursor": "pointer", "display": "inline-block", "border": "2px solid black",
                  "border-radius": "50%", "width": "60px", "height": "60px", "margin": "5px", "background-color": "#E0E0E0", "box-shadow": "2px 2px 10px rgba(1,1,1,0.4)"});
              }
          }
          $("body").append("<section class='score'><p class='" + player1 + "'>" +
              player1 + "</p><p class='" + player2 + "'>" + player2 + "</p></section>");
          $(".score").css({"color": "white", "background-color": "grey", "font-weight": "bold", "text-shadow": "2px 2px 2px black", "font-size": "30px", "margin": "5px  auto", "height": "100px",	"width": "540px",	"text-align": "center"});
          $(".score p").css({"display": "inline-block", "margin": "20px"});
      }
      createLayout();

      $(".replay").on("click", function(e) {
          game_on = false;
          $("span").fadeOut(400, function() {
              $("span").remove();

          });
          $("td").removeClass("active");

          setTimeout(function(){ game_on = true; }, 1000);
      });

      $(".back").on("click", function(e) {
          if($(current).parent().length === 0) {
              return;
          }
          if (game_on) {
          $(current).parent().removeClass();
          $(current).remove();
          var color = (status) ? color_two : color_one;
          $("div").css("background-color", color);
          currentPlayer = (status) ? player2 : player1;
          $(".playername").text(text + currentPlayer);
          status = !status;
          }
      });

      $("td").on("click", function() {
          if (game_on) {
              playToken($(this), y, x);
          }
      });

      function playToken(that, y, x) {
          var index = that.data("position").split("-");
          var posy = index[0];
          var posx = index[1];
          for (var countY = y; countY >= 0; countY--) {
              current =  $("[data-position='"+ (countY - 1) +"-"+ posx +"']");
              var currentclass = current.attr("class");
              if(currentclass != "active") {
                  var color = (status) ? color_one : color_two;
                  var tokensize = $(".token").length;
                  if (countY === 0) { return; }
                  current.addClass("active").append("<span class='token'></span>");
                  $("span").css({"border-radius": "50%", "display": "block", "width": "100%", "height": "100%", "margin-top": "0px", "animation": "bounce 0.45s ease 2 alternate"});
                  current.find("span").animate({marginTop: 0},"slow").css("background-color", color);
                  status = !status;
                  $("div").css("background-color", color = (status) ? color_one : color_two);
                  currentPlayer = (status) ? player1 : player2;
                  $(".playername").text(text + currentPlayer);
                  status = !status;
                  checkForWin(y, x ,countY, posx, posy);
                  status = !status;
                  if (tokenCount === (tokensize +1)) {
                      alert("All tokens have been played. Game is a draw");
                      game_on = !game_on;
                      return;
                  }
                  return;
              }
          }
      }

      function checkForWin(y, x, countY, posx, posy) {
          vertical(y, countY, posx);
          horizontal(y, x, countY, posx, posy);
          diagonalLeft(y, countY, posx);
          diagonalRight(y, countY, posx);
      }

      function vertical(y, num_y, posx) {
          var verticality = 0;
          num_y--;
          var color_data = $("[data-position='"+ num_y +"-"+ posx +"']").find("span").css("background-color");
          for (var countY = num_y; countY < y; countY++) {
              var color_data2 = $("[data-position='"+ countY +"-"+ posx +"']").find("span").css("background-color");
              if (color_data === color_data2) {
                  verticality++;
                  if (verticality === 4) {
                      game_on = !game_on;
                      win();
                      return;
                  }
              }
              else {
                  return;
              }
          }
      }

      function horizontal(y, x, num_y, posx, posy) {
          var horizontality = 0;
          num_y--;
          x = (x - 1);
          var color_dataH = $("[data-position='"+ num_y +"-"+ posx +"']").find("span").css("background-color");
          for (var countX = posx; countX <= x; countX++) {
              var color_data2H = $("[data-position='"+ num_y +"-"+ countX +"']").find("span").css("background-color");
              if (color_dataH === color_data2H) {
                  horizontality++;
                  current = $("[data-position='"+ num_y +"-"+ countX +"']").find("span")[0];
                  if (horizontality === 4) {
                      game_on = !game_on;
                      win();
                      return;
                  }
                  else {
                      horizontalLeft(countX, num_y);
                  }
              }
              else {
                  return;
              }
          }
      }

      function horizontalLeft(num_x, num_y) {
          var horizontalLeft = 0;
          var color_dataHplus = $("[data-position='"+ num_y +"-"+ num_x + "']").find("span").css("background-color");
          for (var countX = num_x; countX >= 0; countX--) {
              var color_dataplusplus = $("[data-position='"+ num_y +"-"+ countX +"']").find("span").css("background-color");
              if (color_dataplusplus === color_dataHplus) {
                  horizontalLeft++;
                  if (horizontalLeft === 4) {
                      game_on = !game_on;
                      win();
                      return;
                  }
              }
              else {
                  horizontalLeft = 0;
                  return;
              }
          }
      }

      function diagonalLeft(y, num_y, posx) {
          num_y--;
          var diagonalLeft = 0;
          var color_dataHplus = $("[data-position='"+ num_y +"-"+ posx +"']").find("span").css("background-color");
          for (var countY = posx; countY <= y; countY++) {
              var color_dataplusplus = $("[data-position='"+ num_y + "-"+ countY +"']").find("span").css("background-color");
              if (color_dataplusplus === color_dataHplus) {
                  diagonalLeft++;
                  if (diagonalLeft >= 4) {
                      game_on = !game_on;
                      win();
                      return;
                  }
                  else {
                      leftBottom(num_y, countY);
                  }
              }
              else {
                  return;
              }
              num_y--;
          }
      }

      function leftBottom(num_x, num_y) {
          var color_data2 = $("[data-position='"+ num_x + "-"+ num_y +"']").find("span").css("background-color");
          var diagoBF = 0;
          for(var countY = num_y; countY >= 0; countY--) {
              var colorpos = $("[data-position='"+ num_x + "-"+ countY +"']").find("span").css("background-color");
              if (colorpos === color_data2) {
                  diagoBF++;
                  if (diagoBF >= 4) {
                      game_on = !game_on;
                      win();
                      return true;
                  }
              }
              else {
                  return;
              }
              num_x++;
          }
      }

      function diagonalRight(y, num_y, posx) {
          num_y--;
          var countDR = 0;
          var color_dataHplus = $("[data-position='"+ num_y +"-"+ posx +"']").find("span").css("background-color");
          for (var k = posx; k <= y; k++) {
              var color_dataplusplus = $("[data-position='"+ num_y + "-"+ k +"']").find("span").css("background-color");
              if (color_dataplusplus === color_dataHplus) {
                  countDR++;
                  if (countDR >= 4) {
                      game_on = !game_on;
                      win();
                      return;
                  }
                  else {
                      rightBottom(num_y, k);
                  }
              }
              else {
                  return;
              }
              num_y++;
          }
      }

      function rightBottom(num_x, num_y) {
          var color_data2 = $("[data-position='"+ num_x + "-"+ num_y +"']").find("span").css("background-color");
          var diagoBF = 0;
          for(var countY = num_y; countY >= 0; countY--) {
              var colorpos = $("[data-position='"+ num_x + "-"+ countY +"']").find("span").css("background-color");
              if (colorpos === color_data2) {
                  diagoBF++;
                  if (diagoBF >= 4) {
                      game_on = !game_on;
                      win();
                      return true;
                  }
              }
              else {
                  return;
              }
              num_x--;
          }
      }

      function win() {
          currentPlayer = (status) ? player1 : player2;
          $("body").prepend("<section class='alert'><p>" + currentPlayer +  " Wins the game !<br>" + "</p></section>");
          $(".alert").css({"z-index": "5", "font-size": "30px", "border-radius": "5px", "background-color": "#5E5E5E", "opacity": "1 !important", "position": "absolute", "padding": "10px", "left": "50%", "top": "50%",
           "color": "white", "width": "500px", "height": "300px", "margin-left": "-200px", "margin-top": "-200px", "text-align": "center", "box-shadow": "2px 2px 20px black"});
          if (currentPlayer === player1) {
              countOne++;
              $("." + currentPlayer).text(currentPlayer + " " + countOne);
          }
          if (currentPlayer === player2) {
              countTwo++;
              $("." + currentPlayer).text(currentPlayer +" "+ countTwo);
              }

          function remove() {
              $(".alert").remove();
          }setTimeout(remove, 2300);
      }
  };
}(jQuery))

$(function() {
    $("window").connect4(6, 7, "Mickael", "Legolas", "red", "black");
});
});
