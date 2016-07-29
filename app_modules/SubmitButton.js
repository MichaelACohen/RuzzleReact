import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Config from './../config';

var SubmitButton = React.createClass({
  render: function() {
    return (
      <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.text}>{'Submit Word'}</Text>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  button: {
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    width: Config.screenWidth,
    height: 50
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

module.exports = SubmitButton;
