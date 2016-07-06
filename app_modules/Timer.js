import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

var Timer = React.createClass({
  render: function() {
    return (
        <Text numberOfLines={1} style={styles.timer}>{this.props.gameHandler.getTimeString(this.props.secondsPassed)}</Text>
    );
  }
});

var styles = StyleSheet.create({
  timer: {
    width: 50,
    textAlign: 'center',
    fontSize: 16
  }
});

module.exports = Timer;
