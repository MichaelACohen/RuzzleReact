import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

import Config from './../config';

var SubmitButton = React.createClass({
  render: function() {
    return (
      <TouchableHighlight style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.text}>{'Submit Word'}</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: Config.screenWidth,
    height: 50
  },
  text: {
    color: 'white',
    fontSize: 100/(Config.boardSize + 1),
    fontWeight: 'bold'
  }
});

module.exports = SubmitButton;
