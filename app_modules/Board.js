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
        tileRow.push(<Tile style={styles.tile} key={idx} letter={tile.letter} selected={isTileSelected} onPress={onPress} boardSize={this.props.size} boardSpace={this.props.space} fontSize={this.props.size/15}/>);
      }
      tileRows.push(tileRow);
    }
    var rows = tileRows.map(function(tileRow, i) {
      var height = (that.props.size - (Config.boardSize+1)*that.props.space)/Config.boardSize;
      return <View key={i} style={{height: height, flexDirection: 'row', justifyContent: 'space-between'}}>{tileRow}</View>;
    });
    return (
      <View style={{padding: this.props.space}}>
        <View style={[styles.board, {height: this.props.size - 2*this.props.space, width: this.props.size - 2*this.props.space}]}>
          {rows}
        </View>
        <Connecters boardSize={this.props.size} boardSpace={this.props.space} selected={selected}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  board: {
    justifyContent: 'space-between',
    backgroundColor: 'black'
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
