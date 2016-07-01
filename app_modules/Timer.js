import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

var Timer = React.createClass({
  render: function() {
    return (
        <Text numberOfLines={1} style={styles.timer}>{this.toTimeString()}</Text>
    );
  },
  toTimeString: function() {
    var minutes = Math.floor(this.props.seconds/60);
    var seconds = this.props.seconds % 60;
    return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
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
