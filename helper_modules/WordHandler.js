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

module.exports = {
  madeWord: madeWord,
  ALREADY_USED: ALREADY_USED,
  VALID: VALID,
  NOT_WORD: NOT_WORD
};
