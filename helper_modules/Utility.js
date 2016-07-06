import Config from './../config';

var getAdjacentTiles = function(idx) {
  var adjTiles = [];
  var x = idx % Config.boardSize;
  var y = Math.floor(idx / Config.boardSize);
  var startX = x == 0 ? x : x-1;
  var endX = x == Config.boardSize - 1 ? x : x+1;
  var startY = y == 0 ? y : y-1;
  var endY = y == Config.boardSize - 1 ? y : y+1;
  for (var i = startX; i <= endX; i++) {
    for (var j = startY; j <= endY; j++) {
      var curIdx = i + Config.boardSize*j;
      if (curIdx != idx) adjTiles.push(curIdx);
    }
  }
  return adjTiles;
}
var isAdjacent = function(idx, prevIdx) {
  var adjTiles = getAdjacentTiles(idx);
  return adjTiles.indexOf(prevIdx) != -1;
}
var getPointsFromWord = function(word) {
  word = word.toUpperCase();
  var points = 0;
  word.split('').map(function(char) {
    points += Config.letterValues[char];
  });
  return points;
}
var getPointsFromTiles = function(tiles) {
  var points = 0;
  tiles.map(function(tile) {
    points += Config.letterValues[tile.letter];
  });
  return points;
}
module.exports = {
  getAdjacentTiles: getAdjacentTiles,
  isAdjacent: isAdjacent,
  getPointsFromWord: getPointsFromWord,
  getPointsFromTiles: getPointsFromTiles
};
