import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';
import Config from './../config';

var Tile = React.createClass({
  getStyle: function() {
    var style = [styles.tile, {width: this.props.boardSize/Config.boardSize - (Config.boardSize+1)*Config.space/2}];
    if (this.props.selected) style.push({backgroundColor: 'yellow'});
    return style;
   },
  render: function() {
    return (
      <TouchableHighlight style={this.getStyle()} onPress={this.props.onPress.bind(this)}>
        <Text style={{color: 'white', fontSize: this.props.fontSize}}>{this.props.letter}</Text>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  tile: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Tile;
