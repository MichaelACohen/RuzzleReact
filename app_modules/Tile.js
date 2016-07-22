import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

var Tile = React.createClass({
  getStyle: function() {
    var style = [styles.tile, {width: (this.props.boardPxSize - (this.props.boardSize+1)*this.props.boardSpace)/this.props.boardSize}];
    if (this.props.selected) style.push({backgroundColor: 'yellow'});
    return style;
   },
  render: function() {
    return (
      <TouchableOpacity activeOpacity={0.6} style={this.getStyle()} onPress={this.props.onPress.bind(this)}>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: this.props.fontSize}}>{this.props.letter}</Text>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  tile: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Tile;
