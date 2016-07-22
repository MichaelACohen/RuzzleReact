import Config from './../config';

var getTileXYFromIdx = function(idx, boardSize) {
  return {x: idx % boardSize, y: Math.floor(idx / boardSize)};
}
var getAdjacentTiles = function(idx, boardSize) {
  var adjTiles = [];
  var x = idx % boardSize;
  var y = Math.floor(idx / boardSize);
  var startX = x == 0 ? x : x-1;
  var endX = x == boardSize - 1 ? x : x+1;
  var startY = y == 0 ? y : y-1;
  var endY = y == boardSize - 1 ? y : y+1;
  for (var i = startX; i <= endX; i++) {
    for (var j = startY; j <= endY; j++) {
      var curIdx = i + boardSize*j;
      if (curIdx != idx) adjTiles.push(curIdx);
    }
  }
  return adjTiles;
}
var isAdjacent = function(idx, prevIdx, boardSize) {
  var adjTiles = getAdjacentTiles(idx, boardSize);
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
  getTileXYFromIdx: getTileXYFromIdx,
  getAdjacentTiles: getAdjacentTiles,
  isAdjacent: isAdjacent,
  getPointsFromWord: getPointsFromWord,
  getPointsFromTiles: getPointsFromTiles
};
