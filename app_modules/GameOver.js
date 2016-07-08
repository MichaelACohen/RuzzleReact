import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView
} from 'react-native';
import Dictionary from './../helper_modules/dictionary';
import Config from './../config';
import Board from './Board';

//TODO
/*
  1) title: Total Score: xxx
  2) ListView of all words
    a) start with top row highlighted
    b) can click to highlight a different row
  3) Small board showing the selected tiles of the row that is highlighted
*/
var GameOver = React.createClass({
  getInitialState: function() {
    this.data = [];
    return {isLoading: true, dataSource: [], selected: 0};
  },
  componentDidMount: function() {
    var that = this;
    setTimeout(function() {
      var allWords = Dictionary.findWordsOnBoard(that.props.tiles);
      allWords.sort(function(obj1, obj2) {
        return obj2.points - obj1.points;
      });
      var madeWords = that.props.stats.madeWords.map(function(obj) {return obj.word});
      allWords.map(function(obj, i) {
        var idx = madeWords.indexOf(obj.word);
        var madePoints = 0;
        if (idx != -1) madePoints = that.props.stats.madeWords[idx].points;
        that.data.push({key: i, tiles: obj.tiles, word: obj.word, points: obj.points, madePoints: madePoints, selected: i == 0});
        });
      that.allWords = allWords;
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      that.setState({isLoading: false, dataSource: ds.cloneWithRows(that.data)});
    }, 1); //without this, the "Loading..." doesn't show up
  },
  onPress: function(idx) {
    var that = this;
    return function() {
      var data = that.data;
      for (var i = 0; i < data.length; i++) {
        data[i].selected = data[i].key == idx;
      }
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      that.setState({dataSource: ds.cloneWithRows(data), selected: idx});
    };
  },
  //obj has 3 properties: word, points, madePoints
  //points is max amount of points made with word, madePoints is amount of points player made
  renderRow: function(obj) {
    return (
      <TouchableHighlight
        style={obj.key == this.state.selected ? styles.highlighted : null}
        onPress={this.onPress(obj.key)}>
        <View style={styles.row}>
          <Text style={styles.left}>{obj.word} {obj.points}</Text>
          <Text style={styles.right}>{obj.word} {obj.madePoints}</Text>
        </View>
      </TouchableHighlight>
    );
  },
  render: function() {
    if (this.state.isLoading) {
      return <Text>{"Loading..."}</Text>;
    } else {
      var selectedData = this.data[this.state.selected];
      return (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text>{"TOTAL SCORE: " + this.props.score}</Text>
          </View>
          <View style={styles.listViewContainer}>
            <View style={styles.listView}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}/>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomDetailContainer}>
              <Text style={{color: 'white'}}>{selectedData.word}: {selectedData.points}</Text>
            </View>
            <View style={styles.boardContainer}>
              <Board size={Config.screenHeight/4} space={5} tiles={this.props.tiles} selected={selectedData.tiles}/>
            </View>
          </View>
        </View>
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    justifyContent: 'space-around'
  },
  textContainer: {
    alignItems: 'center'
  },
  listViewContainer: {
    alignItems: 'center'
  },
  listView: {
    width: 3*Config.screenWidth/4,
    height: Config.screenHeight/2,
    backgroundColor: 'blue',
    borderRadius: 5,
    overflow: 'hidden'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },
  highlighted: {
    backgroundColor: 'red'
  },
  bottomContainer: {
    height: Config.screenHeight/4 + 10,
    backgroundColor: 'red',
    flexDirection: 'row'
  },
  bottomDetailContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = GameOver;
