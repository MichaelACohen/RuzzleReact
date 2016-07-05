var COUNTDOWN = 0, COUNTUP = 1;
function TimeHandler(type, totalSeconds) {
  this.type = type;
  this.totalSeconds = totalSeconds;
}
TimeHandler.prototype.toString = function(secondsPassed) {
  var secondsToDisplay = 0;
  if (this.type == COUNTDOWN) {
    secondsToDisplay = this.totalSeconds - secondsPassed;
  } else if (this.type == COUNTUP) {
    secondsToDisplay = secondsPassed;
  }
  return secondsToTimeString(secondsToDisplay);
}
TimeHandler.prototype.isGameOver = function(secondsPassed) {
  if (this.type == COUNTDOWN) {
    return secondsPassed == this.totalSeconds;
  } else if (this.type == COUNTUP) { //count up means that the score will indicate when game over
    return false;
  }
}

var secondsToTimeString = function(seconds) {
  var minutes = Math.floor(seconds/60);
  var seconds = seconds % 60;
  return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

module.exports = {
  obj: TimeHandler,
  COUNTDOWN : COUNTDOWN,
  COUNTUP: COUNTUP
};
