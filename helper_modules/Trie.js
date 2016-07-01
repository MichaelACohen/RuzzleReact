var ALPHABET_SIZE = 26;
function Trie() {
  this.children = {};
  this.word = false;
  this.curWord = "";
}
Trie.prototype.addWord = function(word) {
  var t = this;
  for (var i = 0; i < word.length; i++) {
    var idx = word.charCodeAt(i) - 'a'.charCodeAt(0);
    if (t.children[idx] == null) {
      t.children[idx] = new Trie();
    }
    t = t.children[idx];
  }
  t.word = true;
}
Trie.prototype.isValidPrefix = function(s) {
  var t = this;
  for (var i = 0; i < s.length; i++) {
    var idx = s.charCodeAt(i) - 'a'.charCodeAt(0);
    if (t.children[idx] == null) return false;
    t = t.children[idx];
  }
  return true;
}
Trie.prototype.isEmpty = function() {
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i] != null) return false;
  }
  return true;
}
Trie.prototype.isWord = function(word) {
  var t = this;
  for (var i = 0; i < word.length; i++) {
    var idx = word.charCodeAt(i) - 'a'.charCodeAt(0);
    if (t.children[idx] == null) return false;
    t = t.children[idx];
  }
  return t.word;
}
Trie.prototype.childAt = function(char) {
  return this.children[char.charCodeAt(0) - 'a'.charCodeAt(0)];
}

module.exports = Trie;
