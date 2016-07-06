import {
  Dimensions
} from 'react-native';

var Window = Dimensions.get('window');
var TIME = 5;
var BOARD_SIZE = 4;
var SPACE = 4;
var LETTER_VALUES = {
  'A': 1,
  'B': 2,
  'C': 2,
  'D': 3,
  'E': 1,
  'F': 2,
  'G': 3,
  'H': 2,
  'I': 1,
  'J': 5,
  'K': 3,
  'L': 2,
  'M': 2,
  'N': 2,
  'O': 1,
  'P': 2,
  'Q': 10,
  'R': 1,
  'S': 1,
  'T': 1,
  'U': 2,
  'V': 3,
  'W': 4,
  'X': 8,
  'Y': 5,
  'Z': 10
}

module.exports = {
  screenWidth: Window.width,
  screenHeight: Window.height,
  boardSize: BOARD_SIZE,
  space: SPACE,
  letterValues: LETTER_VALUES
}
