import { NativeModules } from 'react-native';
var ReadDictionary = NativeModules.ReadDictionary;

import Trie from './Trie';
import Utility from './Utility';

var FILE_NAME = 'dictionary.txt';

var dict = new Trie();
var loaded = false;
var load = function(cb) {
  if (!loaded) {
    ReadDictionary.addWords(function(err, words) {
      if (!err) {
        words.map(function(word) {dict.addWord(word);});
        loaded = true;
      }
      cb(err, words);
    });
  } else {
    //"fake" the load for 1 second
    setTimeout(function() {
      cb();
    }, 1000);
  }
};

var isWord = function(word) {
  return dict.isWord(word);
};

var visited = [];
var curWord = "";
var allWords = []; //word and points
//left to right, up to down
var findWordsOnBoard = function(tiles) {
  visited = []; curWord = ""; allWords = []; //clear values
  for (var curIdx = 0; curIdx < tiles.length; curIdx++) {
    findWordsRec(tiles, curIdx);
  }
  return allWords;
};
var findWordsRec = function(tiles, curIdx) {
  if (visited.indexOf(curIdx) == -1) {
    curWord += tiles[curIdx].letter;
    visited.push(curIdx);
    var lowerCaseWord = curWord.toLowerCase();
    //recursion stops if there are no possible words that can be created from curWord
    if (dict.isValidPrefix(lowerCaseWord)) {
      if (dict.isWord(lowerCaseWord) && !alreadyFoundWord(curWord)) {
        allWords.push({word: curWord, points: Utility.getPointsFromWord(curWord)});
      }
      var adjTiles = Utility.getAdjacentTiles(curIdx);
      for (var i = 0; i < adjTiles.length; i++) {
        findWordsRec(tiles, adjTiles[i]);
      }
    }
    curWord = curWord.substring(0, curWord.length - 1);
    visited.pop();
  }
}
var alreadyFoundWord = function(word) {
  for (var i = 0; i < allWords.length; i++) {
    if (allWords[i].word.valueOf() == word.valueOf()) return true;
  }
  return false;
};

module.exports = {
  load: load,
  isWord: isWord,
  findWordsOnBoard: findWordsOnBoard
};
