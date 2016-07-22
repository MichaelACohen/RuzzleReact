import Config from './../config';

var GOLDEN_RATIO = 4/11; //ratio of vowels to total letters in english lang

//pct chance to use each vowel based on letter frequencies
var vowelPct = {
  A: .21435695538,
  E: .54774278215,
  I: .73057742781,
  O: .92761154854,
  U: 1
};

//pct chance to use each consonant based on letter frequencies
var consonantPct = {
  B: .02437908496732026,
  C: .06983660130718955,
  D: .13933006535947712,
  F: .17573529411764705,
  G: .20866013071895423,
  H: .30823529411764705,
  J: .31073529411764705,
  K: .31191176470588233,
  L: .37767973856209147,
  M: .41699346405228754,
  N: .5272712418300654,
  P: .5587908496732026,
  Q: .5603431372549019,
  R: .6581699346405229,
  S: .7615522875816993,
  T: .9095261437908497,
  V: .9255065359477125,
  W: .9640849673202615,
  X: .9665359477124184,
  Y: .9987908496732026,
  Z: 1
};

var generateVowel = function() {
  var r = Math.random();
  for (var key in vowelPct) {
    if (r <= vowelPct[key]) {
      return key;
    }
  }
}

var generateConsonant = function() {
  var r = Math.random();
  for (var key in consonantPct) {
    if (r <= consonantPct[key]) {
      return key;
    }
  }
}

var generateLetters = function(boardSize) {
  var letters = []; var vowels = 0;
  while (letters.length != boardSize * boardSize) {
    var totalLetters = letters.length;
    if (totalLetters == 0) {
      if (Math.random() < 0.5) {
        vowels++;
        letters.push(generateVowel());
      } else {
        letters.push(generateConsonant());
      }
    } else {
      if (vowels/totalLetters <= GOLDEN_RATIO) {
        vowels++;
        letters.push(generateVowel());
      } else {
        letters.push(generateConsonant());
      }
    }
  }
  return shuffle(letters);
}

var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var generateTiles = function(boardSize) {
  var id = 0;
  var letters = generateLetters(boardSize);
  var tiles = letters.map(function(letter) {
    return {id: id++, letter: letter};
  })
  return tiles;
};

module.exports = {
  generateTiles: generateTiles
};
