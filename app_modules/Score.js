import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

var Score = React.createClass({
  render: function() {
    return (
        <Text numberOfLines={1} style={styles.score}>{this.props.score}</Text>
    );
  }
});

var styles = StyleSheet.create({
  score: {
    width: 50,
    textAlign: 'center',
    fontSize: 16
  }
});

module.exports = Score;
