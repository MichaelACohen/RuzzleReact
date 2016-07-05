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
import TimeHandler from './../helper_modules/TimeHandler';
import HUD from './HUD';
import SubmitButton from './SubmitButton';
import Board from './Board';
import GameOver from './GameOver';

var GameController = React.createClass({
  getInitialState: function() {
    this.stats = new Stats();
    this.timeHandler = new TimeHandler.obj(TimeHandler.COUNTUP, 10);
    return {gameOver: false, secondsPassed: 0, curScore: 0, tiles: TileGenerator.generateTiles(), selected: []};
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
    if (this.timeHandler.isGameOver(secondsPassed)) {
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
      if (Utility.isAdjacent(tile.id, prevTileId)) { //if tile is adjacent to prev tile
        var idx = selected.indexOf(tile.id);
        if (idx == -1) { //tile must not be already selected
          selected.push(tile.id);
          this.setState({selected: selected});
        }
      }
    }
  },
  onWordSubmit: function() {
    var selected = this.state.selected;
    var that = this;
    var word = selected.map(function(idx) {
      return that.state.tiles[idx].letter;
    }).join('');
    var res = WordHandler.madeWord(word);
    if (res == WordHandler.VALID) {
      var points = Utility.getPoints(word);
      that.stats.madeWord(word, points);
      that.increasePointsBy(points);
    } else if (res == WordHandler.ALREADY_USED) {

    } else { //res == WordHandler.NOT_WORD
      that.stats.incorrectAttempt();
    }
    this.setState({selected: []});
  },
  increasePointsBy: function(points) {
    //if there is already a score increase happening, make it finish
    if (this.scoreInterval) {
      clearInterval(this.scoreInterval);
      this.setState({curScore: this.toPoints});
    }
    this.toPoints = this.state.curScore + points;
    var DELAY = 50;
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
          <HUD timeHandler={this.timeHandler} secondsPassed={this.state.secondsPassed} tiles={this.state.tiles} selected={this.state.selected} curScore={this.state.curScore}/>
          <SubmitButton onPress={this.onWordSubmit}/>
          <Board tiles={this.state.tiles} selected={this.state.selected} onTilePress={this.onTilePress}/>
        </View>
      );
    } else {
      return (
        <GameOver navigator={this.props.navigator} tiles={this.state.tiles} stats={this.stats}></GameOver>
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    flex: 1
  },
  vContainer: {
    flexDirection: 'column'
  }
});

module.exports = GameController;
