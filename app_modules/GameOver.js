import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView
} from 'react-native';
import Dictionary from './../helper_modules/dictionary';
import Config from './../config';
import Board from './Board';
import LoadingScreen from './LoadingScreen';

var GameOver = React.createClass({
  getInitialState: function() {
    this.data = [];
    return {isLoading: true, dataSource: [], selected: 0};
  },
  componentDidMount: function() {
    var that = this;
    setTimeout(function() {
      var allWords = Dictionary.findWordsOnBoard(that.props.tiles, that.props.boardSize);
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
    }, 100); //without this, the "Loading..." doesn't show up
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
    var style = [];
    if (obj.key == this.state.selected) style.push(styles.highlighted);
    if (obj.madePoints != 0) style.push(styles.madeRow);
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={style}
        onPress={this.onPress(obj.key)}>
        <View style={styles.row}>
          <Text style={obj.madePoints == 0 ? styles.listText : [styles.listText, styles.made]}>{obj.word} {obj.points}</Text>
          <Text style={obj.madePoints == 0 ? styles.listText : [styles.listText, styles.made]}>{obj.word} {obj.madePoints}</Text>
        </View>
      </TouchableOpacity>
    );
  },
  render: function() {
    if (this.state.isLoading) {
      return <LoadingScreen/>;
    } else {
      var selectedData = this.data[this.state.selected];
      var totalPts = 0;
      this.data.map(function(obj) {
          totalPts += obj.points;
      });
      return (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{"YOUR SCORE: " + this.props.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            <Text style={styles.subText}>{"Maximum Score: " + totalPts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
          </View>
          <View style={styles.centerWrapper}>
            <View style={styles.centerContainer}>
              <View style={styles.listViewHeader}>
                <Text style={{fontWeight: 'bold'}}>{'All words (' + this.data.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ')'}</Text>
                <Text style={{fontWeight: 'bold'}}>{'Your words (' + this.props.stats.madeWords.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ')'}</Text>
              </View>
              <View style={styles.listViewContainer}>
                <View style={styles.listView}>
                  <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}/>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomDetailContainer}>
              <Text numberOfLines={1} style={{color: 'white'}}>{selectedData.madePoints == 0 ? "" : "You made this word!"}</Text>
              <Text style={{color: 'white'}}>{selectedData.word}: {selectedData.points} points</Text>
            </View>
            <View style={styles.boardContainer}>
              <Board pxSize={Config.screenHeight/4} boardSize={this.props.boardSize} space={this.props.boardSize <= 5 ? 12 - 2*this.props.boardSize : 2} tiles={this.props.tiles} selected={selectedData.tiles}/>
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
    justifyContent: 'space-between'
  },
  textContainer: {
    paddingTop: 5,
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24
  },
  subText: {
    fontWeight: 'bold'
  },
  centerWrapper: {
    alignItems: 'center'
  },
  centerContainer: {
    width: 3*Config.screenWidth/4,
    height: Config.screenHeight/2
  },
  listViewContainer: {
    alignItems: 'center',
  },
  listViewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },
  listView: {
    width: 3*Config.screenWidth/4,
    height: Config.screenHeight/2,
    backgroundColor: 'blue',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'black'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10
  },
  madeRow: {

  },
  highlighted: {
    backgroundColor: 'rgba(255, 255, 0, 0.75)'
  },
  made: {
    color: 'white',
    fontWeight: 'bold',
    opacity: 1
  },
  listText: {
    color: 'black'
  },
  bottomContainer: {
    height: Config.screenHeight/4,
    backgroundColor: 'black',
    flexDirection: 'row'
  },
  bottomDetailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = GameOver;
