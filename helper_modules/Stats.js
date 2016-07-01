function Stats() {
  this.key = 0;
  this.madeWords = [];
  this.incorrectAttempts = 0;
}
Stats.prototype.incorrectAttempt = function() {
  this.incorrectAttempts++;
}
Stats.prototype.madeWord = function(word, pts) {
  this.madeWords.push({word: word, points: pts, key: this.key});
  this.key++;
}
Stats.prototype.getAccuracy = function() {
  var made = this.madeWords.length;
  var total = made + this.incorrectAttempts;
  return made / total;
}
Stats.prototype.sortMadeWordsByPts = function() {
  this.madeWords.sort(function(obj1, obj2) {
    return obj2.pts - obj1.pts;
  });
}
Stats.prototype.sortMadeWordsByAlpha = function() {
  this.madeWords.sort();
}

module.exports = Stats;
