import Dictionary from './dictionary';

var ALREADY_USED = 0, VALID = 1, NOT_WORD = 2;
var madeWords = [];

var submittedWord = function(word) {
  word = word.toLowerCase();
  if (!Dictionary.isWord(word)) return NOT_WORD;
  if (madeWords.indexOf(word) !== -1) return ALREADY_USED;
  madeWords.push(word);
  return VALID;
};

var submittedWordFromTiles = function(tiles) {
  var word = tiles.map(function(tile) {
    return tile.letter;
  }).join('');
  return submittedWord(word);
}

module.exports = {
  submittedWord: submittedWord,
  submittedWordFromTiles: submittedWordFromTiles,
  ALREADY_USED: ALREADY_USED,
  VALID: VALID,
  NOT_WORD: NOT_WORD
};
