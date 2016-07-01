import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import Dictionary from './../helper_modules/dictionary';
import Config from './../config';

var GameOver = React.createClass({
  getInitialState: function() {
    return {isLoading: true, dataSource: []};
  },
  componentDidMount: function() {
    var that = this;
    setTimeout(function() {
      var data = [];
      var allWords = Dictionary.findWordsOnBoard(that.props.tiles);
      allWords.sort(function(obj1, obj2) {
        return obj2.points - obj1.points;
      });
      var madeWords = that.props.stats.madeWords.map(function(obj) {return obj.word});
      allWords.map(function(obj) {
        var idx = madeWords.indexOf(obj.word);
        var madePoints = 0;
        if (idx != -1) madePoints = that.props.stats.madeWords[idx].points;
        data.push({word: obj.word, points: obj.points, madePoints: madePoints});
      });
      that.allWords = allWords;
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      that.setState({isLoading: false, dataSource: ds.cloneWithRows(data)});
    }, 1); //without this, the "Loading..." doesn't show up
  },
  //obj has 3 properties: word, points, madePoints
  //points is max amount of points made with word, madePoints is amount of points player made
  renderRow: function(obj) {
    return (
      <Text style={styles.row}>{obj.word} {obj.points} {obj.madePoints}</Text>
    );
  },
  render: function() {
    if (this.state.isLoading) {
      return <Text>{"Loading..."}</Text>;
    } else {
      return (
        <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={styles.listView} />
        </View>
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 15,
    top: 15,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listView: {
    flex: 1,
  },
  row: {
    alignSelf: 'center'
  }
});

module.exports = GameOver;
