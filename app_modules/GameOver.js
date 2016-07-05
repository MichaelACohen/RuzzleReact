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
      <View style={styles.row}>
        <Text style={styles.left}>{obj.word} {obj.points}</Text>
        <Text style={styles.right}>{obj.word} {obj.madePoints}</Text>
      </View>
    );
  },
  render: function() {
    if (this.state.isLoading) {
      return <Text>{"Loading..."}</Text>;
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.listView}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              style={{}} />
          </View>
        </View>
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listView: {
    width: 3*Config.screenWidth/4,
    height: Config.screenHeight/2
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

module.exports = GameOver;
