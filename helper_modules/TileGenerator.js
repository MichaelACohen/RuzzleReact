import Config from './../config';

var generateTiles = function() {
  var tiles = [];
  for (var i = 0; i < Config.boardSize; i++) {
    for (var j = 0; j < Config.boardSize; j++) {
      var id = i*Config.boardSize + j;
      var letter = generateLetter();
      tiles.push({id: id, letter: letter});
    }
  }
  return tiles;
};
var generateLetter = function() {
  var start = 'A';
  var inc = Math.floor(Math.random() * 26);
  return String.fromCharCode(start.charCodeAt(0) + inc);
};
module.exports = {
  generateTiles: generateTiles
};
