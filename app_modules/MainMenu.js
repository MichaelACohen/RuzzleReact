import React from 'react';
import {
  Alert,
  SegmentedControlIOS,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Config from './../config';
import Dictionary from './../helper_modules/dictionary';
import GameHandler from './../helper_modules/GameHandler';
import LoadingScreen from './LoadingScreen';
import GameController from './GameController';
import TileGenerator from './../helper_modules/TileGenerator';

var BEFORE = 0, LOADING = 1, SUCCESS = 2, FAILED = 3;

var MainMenu = React.createClass({
  getInitialState: function() {
    return {loadingStatus: BEFORE, boardSize: "" + Config.boardSize.default, gameType: GameHandler.TIME_TYPE, gameTypeValue: "" + GameHandler.defaults[GameHandler.TIME_TYPE]};
  },
  load: function(cb) {
    this.setState({loadingStatus: LOADING});
    Dictionary.load(cb);
  },
  onSegControlChange: function(event) {
    var index = event.nativeEvent.selectedSegmentIndex;
    this.setState({
      gameType: index,
      gameTypeValue: "" + GameHandler.defaults[index]
    });
  },
  validateAndStart() {
    if (this.state.boardSize.match('^[0-9]+$')) {
      var val = parseInt(this.state.boardSize);
      if (!(val >= Config.boardSize.min && val <= Config.boardSize.max)) {
        var title = "Board size value is invalid";
        var msg = "Value must be between " + Config.boardSize.min + " and " + Config.boardSize.max;
        Alert.alert(title, msg);
        return;
      }
    } else {
      var title = "Board size value is invalid";
      var msg = "Make sure you've input a valid integer without any white space!";
      Alert.alert(title, msg);
      return;
    }
    if (this.state.gameTypeValue.match('^[0-9]+$')) {
      var val = parseInt(this.state.gameTypeValue);
      if (val >= GameHandler.mins[this.state.gameType] && val <= GameHandler.maxs[this.state.gameType]) {
          this.startGame(parseInt(this.state.boardSize), new GameHandler.obj(this.state.gameType, val));
      } else {
          var title = (this.state.gameType == GameHandler.TIME_TYPE ? "Seconds" : "Points") + " value is invalid";
          var msg = "Value must be between " + GameHandler.mins[this.state.gameType] + " and " + GameHandler.maxs[this.state.gameType];
          Alert.alert(title, msg);
      }
    } else {
      var title = (this.state.gameType == GameHandler.TIME_TYPE ? "Seconds" : "Points") + " value is invalid";
      var msg = "Make sure you've input a valid integer without any white space!";
      Alert.alert(title, msg);
    }
  },
  startGame: function(boardSize, gameHandler) {
    var that = this;
    this.load(function(err, words) {
      if (err) {
        console.log('dictionary failed to load');
        that.setState({loadingStatus: FAILED});
      } else {
        var tiles = TileGenerator.generateTiles(boardSize);
        that.state.loadingStatus = SUCCESS;
        that.props.navigator.push({
          component: GameController,
          title: 'Ruzzle',
          passProps: {
            boardSize: boardSize,
            gameHandler: gameHandler,
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
              <View style={styles.option1}>
                <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold'}}>Select the board size:</Text>
                <TextInput
                  style={{height: 30, borderColor: 'gray', borderWidth: 2, borderRadius: 5, textAlign: 'center', color: 'white'}}
                  onChangeText={(text) => this.setState({boardSize: text})}
                  value={"" + this.state.boardSize}
                  keyboardType="numeric"
                />
                <Text style={{alignSelf: 'center', color: 'white', fontSize: 10}}>{'*must be between ' + Config.boardSize.min + ' and ' + Config.boardSize.max}</Text>
              </View>
              <View style={styles.option2}>
                <Text style={{alignSelf: 'center', color: 'white', fontWeight: 'bold'}}>Select a game mode:</Text>
                <SegmentedControlIOS
                  values={['Time', 'Score']}
                  selectedIndex={this.state.gameType}
                  onChange={this.onSegControlChange}
                  tintColor='white'
                />
              </View>
              <View style={styles.option3}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>{this.state.gameType == GameHandler.TIME_TYPE ? 'How many seconds do you want to play for?' : 'How many points do you want to play up to?'}</Text>
                <TextInput
                  style={{height: 30, borderColor: 'gray', borderWidth: 2, borderRadius: 5, textAlign: 'center', color: 'white'}}
                  onChangeText={(text) => this.setState({gameTypeValue: text})}
                  value={"" + this.state.gameTypeValue}
                  keyboardType="numeric"
                />
                <Text style={{alignSelf: 'center', color: 'white', fontSize: 10}}>{'*must be between ' + GameHandler.mins[this.state.gameType] + ' and ' + GameHandler.maxs[this.state.gameType]}</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity activeOpacity={0.7} style={styles.startButton} onPress={this.validateAndStart}>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  option1: {
    width: 3*Config.screenWidth/4
  },
  option2: {
    width: 3*Config.screenWidth/4
  },
  startButton: {
    height: 50,
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = MainMenu;
