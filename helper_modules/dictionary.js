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
    //"fake" the load for 1 second if dictionary is already loaded
    setTimeout(function() {
      cb();
    }, 1000);
  }
};

var isWord = function(word) {
  return dict.isWord(word);
};

var visited = [];
var curTiles = [];
var allWords = []; //word and points
//left to right, up to down
var findWordsOnBoard = function(tiles, boardSize) {
  visited = []; curTiles = []; allWords = []; //clear values
  for (var curIdx = 0; curIdx < tiles.length; curIdx++) {
    findWordsRec(tiles, curIdx, boardSize);
  }
  return allWords;
};
var findWordsRec = function(tiles, curIdx, boardSize) {
  if (visited.indexOf(curIdx) == -1) {
    curTiles.push(tiles[curIdx]);
    visited.push(curIdx);
    var curWord = curTiles.map(function(tile) {
      return tile.letter;
    }).join('');
    var lowerCaseWord = curWord.toLowerCase();
    //recursion stops if there are no possible words that can be created from curWord
    if (dict.isValidPrefix(lowerCaseWord)) {
      if (dict.isWord(lowerCaseWord) && !alreadyFoundWord(curWord)) {
        allWords.push({tiles: curTiles.map(function(tile) {return tile.id}), word: curWord, points: Utility.getPointsFromWord(curWord)});
      }
      var adjTiles = Utility.getAdjacentTiles(curIdx, boardSize);
      for (var i = 0; i < adjTiles.length; i++) {
        findWordsRec(tiles, adjTiles[i], boardSize);
      }
    }
    curTiles.pop();
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
