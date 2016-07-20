import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var LoadingScreen = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text numberOfLines={1} style={styles.text}>Loading...</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24
  }
});

module.exports = LoadingScreen;
