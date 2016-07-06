import Dictionary from './dictionary';

var ALREADY_USED = 0, VALID = 1, NOT_WORD = 2;
var madeWords = [];

var madeWord = function(word) {
  word = word.toLowerCase();
  if (!Dictionary.isWord(word)) return NOT_WORD;
  if (madeWords.indexOf(word) !== -1) return ALREADY_USED;
  madeWords.push(word);
  return VALID;
};

var madeWordFromTiles = function(tiles) {
  var word = tiles.map(function(tile) {
    return tile.letter;
  }).join('');
  return madeWord(word);
}

module.exports = {
  madeWord: madeWord,
  madeWordFromTiles: madeWordFromTiles,
  ALREADY_USED: ALREADY_USED,
  VALID: VALID,
  NOT_WORD: NOT_WORD
};
