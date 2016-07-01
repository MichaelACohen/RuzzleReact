import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import Dictionary from './../helper_modules/dictionary';
import GameController from './GameController';

var BEFORE = 0, LOADING = 1, SUCCESS = 2, FAILED = 3;
var MainMenu = React.createClass({
  getInitialState: function() {
    return {loadingStatus: BEFORE};
  },
  startGame: function() {
    this.setState({loadingStatus: LOADING});
    var that = this;
    //method contains a check to see if dictionary is already loaded
    Dictionary.load(function(err, words) {
      if (err) {
        console.log('dictionary failed to load');
        that.setState({loadingStatus: FAILED});
      } else {
        that.setState({loadingStatus: SUCCESS});
        that.props.navigator.push({
          component: GameController,
          title: 'Ruzzle'
        });
      }
    });
  },
  render: function() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    } else if (this.state.loadingStatus == FAILED) {
      return (
        <View>
          <Text>Failed!</Text>
        </View>
      );
    } else {
        return (
          <View style={{flex: 1, paddingTop: 74, backgroundColor: 'blue'}}>
            <TouchableHighlight onPress={this.startGame}>
              <Text>Play</Text>
            </TouchableHighlight>
          </View>
        );
    }
  }
});

module.exports = MainMenu;
