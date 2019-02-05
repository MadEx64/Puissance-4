$(document).ready(function() {

  var x;
  var y;
  var playerOne;
  var playerTwo;
  var playerOneColor = rgb(255, 255, 0);
  var playerTwoColor = rgb(255, 0, 0);
  var currentPlayer;

  (function($) {
      $.fn.drawTable = function() {
        for (var i = 0; i < x; i++) {
            $(this).append('<table><tr></tr></table>');
        }
        for (var j = 0; j < y; j++) {
            $(this).append('<td></td>');
        }
        return this;
      }
  }(jQuery));

  function($) {
      $.fn.chips = function() {
        playerOneColor;
        playerTwoColor;
        return this;
      }
  }(jQuery));

  function($) {
      $.fn.checkHorizontalWin = function() {

        return this;
      }
  }(jQuery));

  function($) {
      $.fn.checkVerticalWin = function() {

        return this;
      }
  }(jQuery));
  });
