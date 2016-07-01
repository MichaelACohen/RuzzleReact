import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

import Timer from './Timer';
import Score from './Score';

var HUD = React.createClass({
  getCurrentWord: function() {
    var word = '';
    for (var i = 0; i < this.props.selected.length; i++) {
      var idx = this.props.selected[i];
      word += this.props.tiles[idx].letter;
    }
    return word;
  },
  render: function() {
    return (
      <View style={styles.hContainer}>
        <Timer seconds={this.props.secondsLeft}></Timer>
        <Text numberOfLines={1} style={styles.currentWord}>{this.getCurrentWord()}</Text>
        <Score score={this.props.curScore}></Score>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  hContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    padding: 10,
    paddingTop: 20
  },
  currentWord: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24
  }
});

module.exports = HUD;
