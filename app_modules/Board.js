import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Config from './../config';
import Tile from './Tile';
import Connecters from './Connecters';

var Board = React.createClass({
  render: function() {
    var that = this;
    var propPress = this.props.onTilePress;
    var selected = this.props.selected;
    var tileRows = [];
    for (var i = 0; i < Config.boardSize; i++) {
      var tileRow = [];
      for (var j = 0; j < Config.boardSize; j++) {
        var idx = i*Config.boardSize + j;
        var tile = this.props.tiles[idx];
        var isTileSelected = selected.indexOf(idx) != -1;
        var onPress = (function() {
          var thisTile = tile;
          return function() {
            if (propPress) {propPress(thisTile);}
          }
        })();
        tileRow.push(<Tile style={styles.tile} key={idx} letter={tile.letter} selected={isTileSelected} onPress={onPress} boardSize={this.props.size} fontSize={this.props.size/15}/>);
      }
      tileRows.push(tileRow);
    }
    var rows = tileRows.map(function(tileRow, i) {
      var height = that.props.size/Config.boardSize - (Config.boardSize-1)*Config.space/2;
      return <View key={i} style={{height: height, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'red'}}>{tileRow}</View>;
    });
    return (
      <View style={{height: this.props.size, width: this.props.size, padding: Config.space}}>
        <View style={styles.board}>
          {rows}
        </View>
        <Connecters boardSize={this.props.size} selected={selected}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  board: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'blue'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tile: {

  }
});

module.exports = Board;
