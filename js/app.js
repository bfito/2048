// console.log('Hello!');

// 1. create game object
var myGlobalGame;

$(document).ready(function () {
  myGlobalGame = new Game2048();

  // 2. take the initial tiles and put them on the screen
  renderTiles();

  // 3. handle keyboard events
  $(document).keydown(moveGame);

  loadSouds();
});


function moveGame (ev) {
  var acceptableKeys = [ 37, 65, 38, 87, 39, 68, 40, 83 ];

  if (!acceptableKeys.includes(ev.keyCode)) {
    return;
  }

  // prevent arrow key scrolling
  ev.preventDefault();

  // 4. move board in object based on keypresses (up, down, left, right)
  // move if correct keys were pressed
  switch (ev.keyCode) {
    case 37:  // left arrow
    case 65:  // a
      myGlobalGame.move('left');
      break;
    case 38:  // up arrow
    case 87:  // w
      myGlobalGame.move('up');
      break;
    case 39:  // right arrow
    case 68:  // d
      myGlobalGame.move('right');
      break;
    case 40:  // down arrow
    case 83:  // s
      myGlobalGame.move('down');
      break;
  }

  // 5. updating the screen based on new board state
  renderTiles();
  updateScore();

  // 6. win or lose
  checkIfDone();
}


function updateScore () {
  $('#score-display').html(myGlobalGame.score);
}

function checkIfDone () {
  if (myGlobalGame.hasWon) {
    $('#game-board').remove();
    var winnerHtml = '<img src="https://media.giphy.com/media/3oz8xPyx3qgq5jAmMo/giphy.gif" alt="Winner">';
    $('#container').append(winnerHtml);

  }

  else if (myGlobalGame.hasLost) {
    $('#game-board').remove();
    var loserHtml = '<img src="http://i1191.photobucket.com/albums/z474/veronicaandbetty/youlose.gif" alt="Loser">';
    $('#container').append(loserHtml);
  }
}


function renderTiles () {
  $('#tile-container').empty();

  myGlobalGame.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      if (cell === null) {
        return;
      }

      // put cell on the screen
      var tileHtml = '<div class="tile tile-position-' + rowIndex + '-' + colIndex + ' val-' + cell + '"> ' + cell + ' </div>';
      $('#tile-container').append(tileHtml);
    });
  });
}

function loadSouds () {
  ion.sound({
    sounds: [ {name: 'snap'}, {name: 'tap'}, {name: 'beer_can_opener'},],
    path: 'lib/ion-sound/sounds/',
    preload: true,
    volume: 1.0,
  });
}
