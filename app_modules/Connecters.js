import React from 'react';
import {
  StyleSheet
} from 'react-native';
import Svg from 'react-native-svg';

import Config from './../config';
import Connecter from './Connecter';

var Connecters = React.createClass({
  render: function() {
    var selected = this.props.selected;
    if (selected.length > 1) {
      var prevIdx = -1;
      var lines = [];
      for (var i = selected.length-1; i > 0; i--) {
        lines.push(<Connecter fromIdx={selected[i]} toIdx={selected[i-1]}/>);
      }
      return (
        <Svg style={styles.svg} width="blah" height="blah" stroke="none">
          {lines}
        </Svg>
      );
    }
    return null;
  }
});

var styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

module.exports = Connecters;
