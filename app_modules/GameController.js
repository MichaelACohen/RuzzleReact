import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Config from './../config';
import Utility from './../helper_modules/Utility';
import Stats from './../helper_modules/Stats';
import WordHandler from './../helper_modules/WordHandler';
import TileGenerator from './../helper_modules/TileGenerator';
import GameHandler from './../helper_modules/GameHandler';
import HUD from './HUD';
import SubmitButton from './SubmitButton';
import Board from './Board';
import GameOver from './GameOver';

var GameController = React.createClass({
  getInitialState: function() {
    this.stats = new Stats();
    this.boardSize = this.props.boardSize;
    this.gameHandler = this.props.gameHandler;
    return {gameOver: false, secondsPassed: 0, curScore: 0, tiles: this.props.tiles, selected: []};
  },
  componentDidMount: function() {
    this.timer = setInterval(this.updateTime, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.timer);
  },
  updateTime: function() {
    var secondsPassed = this.state.secondsPassed + 1;
    this.setState({secondsPassed: secondsPassed});
    if (this.gameHandler.isGameOver({seconds: secondsPassed})) {
      this.setGameOver(200);
    }
  },
  //can pass in delay if you don't want to switch to gameOver screen right away
  setGameOver: function(delay) {
    clearInterval(this.timer);
    this.stats.sortMadeWordsByPts();
    if (!delay) {
      this.setState({gameOver: true});
    } else {
      var that = this;
      setTimeout(function() {
        that.setState({gameOver: true});
      }, delay);
    }
  },
  onTilePress: function(tile) {
    var selected = this.state.selected;
    if (selected.length == 0) { //if no tiles are selected, then it's valid
      selected.push(tile.id);
      this.setState({selected: selected});
    } else {
      var prevTileId = this.state.tiles[selected[selected.length-1]].id;
      if (Utility.isAdjacent(tile.id, prevTileId, this.boardSize)) { //if tile is adjacent to prev tile
        var idx = selected.indexOf(tile.id);
        if (idx == -1) { //tile must not be already selected
          selected.push(tile.id);
          this.setState({selected: selected});
        }
      }
    }
  },
  getSelectedTiles: function() {
    var that = this;
    var tiles = this.state.selected.map(function(idx) {
      return that.state.tiles[idx];
    });
    return tiles;
  },
  getSelectedWord: function() {
    var that = this;
    var word = this.state.selected.map(function(idx) {
      return that.state.tiles[idx].letter;
    }).join('');
    return word;
  },
  onWordSubmit: function() {
    var tiles = this.getSelectedTiles();
    var word = this.getSelectedWord();
    var submittedWordResponse = WordHandler.submittedWordFromTiles(tiles);
    if (submittedWordResponse == WordHandler.VALID) {
      var curPoints = this.state.curScore;
      var pointsFromWord = Utility.getPointsFromTiles(tiles);
      this.stats.madeWord(word, pointsFromWord);
      this.increasePointsBy(pointsFromWord);
      if (this.gameHandler.isGameOver({points: curPoints + pointsFromWord})) {
        this.setGameOver();
      }
    } else if (submittedWordResponse == WordHandler.ALREADY_USED) {
      //TODO: do something here
    } else { //not a word
      this.stats.incorrectAttempt();
    }
    this.setState({selected: []});
  },
  increasePointsBy: function(points, delay) {
    //if there is already a score increase happening, make it finish
    if (this.scoreInterval) {
      clearInterval(this.scoreInterval);
      this.setState({curScore: this.toPoints});
    }
    this.toPoints = this.state.curScore + points;
    var DELAY = delay || 50;
    var that = this;
    this.scoreInterval = setInterval(function() {
      if (points == 0) clearInterval(that.scoreInterval);
      else {
        points--;
        that.setState({curScore: that.state.curScore + 1});
      }
    }, DELAY);
  },
  render: function() {
    if (!this.state.gameOver) {
      return (
        <View style={[styles.container, styles.vContainer]}>
          <HUD gameHandler={this.gameHandler} secondsPassed={this.state.secondsPassed} tiles={this.state.tiles} selected={this.state.selected} curScore={this.state.curScore}/>
          <SubmitButton onPress={this.onWordSubmit}/>
          <Board pxSize={Config.screenWidth} boardSize={this.boardSize} space={this.boardSize <= 10 ? 24 - 2*this.boardSize : 4} tiles={this.state.tiles} selected={this.state.selected} onTilePress={this.onTilePress}/>
          <View style={styles.bottomContainer}></View>
        </View>
      );
    } else {
      return (
        <GameOver navigator={this.props.navigator} boardSize={this.boardSize} tiles={this.state.tiles} stats={this.stats} score={this.state.curScore}></GameOver>
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  vContainer: {
    flexDirection: 'column'
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'black'
  }
});

module.exports = GameController;
