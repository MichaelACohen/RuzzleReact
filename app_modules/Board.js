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
    for (var i = 0; i < this.props.boardSize; i++) {
      var tileRow = [];
      for (var j = 0; j < this.props.boardSize; j++) {
        var idx = i*this.props.boardSize + j;
        var tile = this.props.tiles[idx];
        var isTileSelected = selected.indexOf(idx) != -1;
        var onPress = (function() {
          var thisTile = tile;
          return function() {
            if (propPress) {propPress(thisTile);}
          }
        })();
        tileRow.push(<Tile style={styles.tile} key={idx} letter={tile.letter} selected={isTileSelected} onPress={onPress} boardSize={this.props.boardSize} boardPxSize={this.props.pxSize} boardSpace={this.props.space} fontSize={this.props.pxSize/(2*this.props.boardSize)}/>);
      }
      tileRows.push(tileRow);
    }
    var rows = tileRows.map(function(tileRow, i) {
      var height = (that.props.pxSize - (that.props.boardSize+1)*that.props.space)/that.props.boardSize;
      return <View key={i} style={[styles.row, {height: height}]}>{tileRow}</View>;
    });
    return (
      <View style={[styles.container, {padding: this.props.space}]}>
        <View style={[styles.board, {height: this.props.pxSize - 2*this.props.space, width: this.props.pxSize - 2*this.props.space}]}>
          {rows}
        </View>
        <Connecters boardSize={this.props.boardSize} boardPxSize={this.props.pxSize} boardSpace={this.props.space} selected={selected}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'black'
  },
  board: {
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tile: {

  }
});

module.exports = Board;
