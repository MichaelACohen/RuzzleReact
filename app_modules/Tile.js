import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import Config from '../config';

var Tile = React.createClass({
  getWidth: function() {
    return (this.props.boardPxSize - (this.props.boardSize+1)*this.props.boardSpace)/this.props.boardSize;
  },
  getStyle: function() {
    var style = [styles.tile, {width: this.getWidth()}];
    if (this.props.selected) style.push(styles.selected);
    return style;
   },
  render: function() {
    return (
      <TouchableOpacity activeOpacity={0.6} style={this.getStyle()} onPress={this.props.onPress.bind(this)}>
        <View style={[styles.numContainer, {left: 0, right: this.getWidth()/10, top: this.getWidth()/10}]}>
          <Text style={[styles.text, {fontSize: this.props.fontSize/5}]}>{Config.letterValues[this.props.letter]}</Text>
        </View>
        <Text style={[styles.text, styles.letterText, {fontSize: this.props.fontSize}]}>{this.props.letter}</Text>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  tile: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selected: {
    backgroundColor: 'yellow'
  },
  numContainer: {
    position: 'absolute',
    alignItems: 'flex-end'
  },
  text: {
    color: 'black'
  },
  letterText: {
    fontWeight: 'bold'
  }
});

module.exports = Tile;
