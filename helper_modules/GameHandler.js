//time type: play for a set amount of time
//score type: play until you reach a particular score
var TIME_TYPE = 0, SCORE_TYPE = 1;
var TIME_DEFAULT = 120, SCORE_DEFAULT = 100;
var TIME_MIN = 10, SCORE_MIN = 10;
var TIME_MAX = 600, SCORE_MAX = 250;
//val is the amount to reach before it's game over...is either seconds (time) or points (score)
function GameHandler(type, val) {
  this.type = type;
  this.val = val;
}
GameHandler.prototype.getTimeString = function(secondsPassed) {
  var secondsToDisplay = 0;
  if (this.type == TIME_TYPE) {
    secondsToDisplay = this.val - secondsPassed;
  } else if (this.type == SCORE_TYPE) {
    secondsToDisplay = secondsPassed;
  }
  return secondsToTimeString(secondsToDisplay);
}
GameHandler.prototype.isGameOver = function(val) {
  if (this.type == TIME_TYPE) {
    return val.seconds && val.seconds == this.val;
  } else if (this.type == SCORE_TYPE) {
    return val.points && val.points >= this.val;
  }
  return false;
}

var secondsToTimeString = function(seconds) {
  var minutes = Math.floor(seconds/60);
  var seconds = seconds % 60;
  return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

module.exports = {
  obj: GameHandler,
  TIME_TYPE: TIME_TYPE,
  SCORE_TYPE: SCORE_TYPE,
  defaults: [TIME_DEFAULT, SCORE_DEFAULT],
  mins: [TIME_MIN, SCORE_MIN],
  maxs: [TIME_MAX, SCORE_MAX]
};
