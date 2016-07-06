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
    var propPress = this.props.onTilePress;
    var selected = this.props.selected;
    var tiles = this.props.tiles.map(function(tile) {
      var onPress = function() {
        if (propPress) {propPress(tile);}
      };
      var isTileSelected = selected.indexOf(tile.id) != -1;
      return (
        <Tile key={tile.id} letter={tile.letter} selected={isTileSelected} onPress={onPress}/>
      );
    });
    return (
      <View>
        <View style={styles.board}>
          {tiles}
        </View>
        <Connecters selected={selected}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
    padding: Config.tileSpace,
    paddingBottom: 0
  }
});

module.exports = Board;
