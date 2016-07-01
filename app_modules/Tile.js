import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';
import Config from './../config';

var Tile = React.createClass({
  getStyle: function() {
    if (this.props.selected) return [styles.tile, {backgroundColor: 'yellow'}];
    else return styles.tile;
   },
  render: function() {
    return (
      <TouchableHighlight style={this.getStyle()} onPress={this.props.onPress.bind(this)}>
        <Text style={styles.tileText}>{this.props.letter}</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  tile: {
    backgroundColor: 'black',
    marginBottom: Config.tileSpace,
    justifyContent: 'center',
    alignItems: 'center',
    width: Config.tileSize,
    height: Config.tileSize
  },
  tileText: {
    color: 'white',
    fontSize: 100/Config.boardSize
  }
});

module.exports = Tile;
