import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Dictionary from './../helper_modules/dictionary';
import GameHandler from './../helper_modules/GameHandler';
import LoadingScreen from './LoadingScreen';
import GameController from './GameController';
import TileGenerator from './../helper_modules/TileGenerator';

var BEFORE = 0, LOADING = 1, SUCCESS = 2, FAILED = 3;

//TODO: start with only game type selector visible (Score type or Time type)
//TODO: after user clicks an option, show "Stop game after ___ seconds" or "Stop game after you score ____ points"
//TODO: after clicking this, then "play" button can be clicked
var MainMenu = React.createClass({
  getInitialState: function() {
    return {loadingStatus: BEFORE};
  },
  load: function(cb) {
    this.setState({loadingStatus: LOADING});
    Dictionary.load(cb);
  },
  startGame: function() {
    var that = this;
    this.load(function(err, words) {
      if (err) {
        console.log('dictionary failed to load');
        that.setState({loadingStatus: FAILED});
      } else {
        var tiles = TileGenerator.generateTiles();
        that.state.loadingStatus = SUCCESS;
        that.props.navigator.push({
          component: GameController,
          title: 'Ruzzle',
          passProps: {
            gameHandler: new GameHandler.obj(GameHandler.types.TIME_TYPE, 120),
            tiles: tiles
          }
        });
      }
    });
  },
  render: function() {
    if (this.state.loadingStatus == LOADING) {
      return <LoadingScreen/>;
    } else if (this.state.loadingStatus == FAILED) {
      return (
        <View>
          <Text>Load failed!</Text>
          <TouchableHighlight onPress={this.load}>
            <Text>Retry</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
        return (
          <View style={styles.container}>
            <View style={styles.optionsContainer}>

            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity activeOpacity={0.8} style={styles.startButton} onPress={this.startGame}>
                <Text>Play</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  optionsContainer: {
    flex: 1,
    backgroundColor: 'red'
  },
  startButton: {
    height: 50,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = MainMenu;
