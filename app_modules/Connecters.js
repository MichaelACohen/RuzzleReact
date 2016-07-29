import React from 'react';
import {
  StyleSheet
} from 'react-native';
import Svg from 'react-native-svg';

import Utility from './../helper_modules/Utility';
import Connecter from './Connecter';

var Connecters = React.createClass({
  getInitialState: function() {
    this.tileSize = (this.props.boardPxSize - (this.props.boardSize+1)*this.props.boardSpace)/this.props.boardSize;
    return {};
  },
  //this will bring you to the leftmost point of the given column
  getStartX: function(colIdx) {
    return this.props.boardSpace + (this.tileSize + this.props.boardSpace)*colIdx
  },
  //this will bring you to the topmost point of the given row
  getStartY: function(rowIdx) {
    return this.props.boardSpace + (this.tileSize + this.props.boardSpace)*rowIdx;
  },
  getEndPointsFromIndices: function(fromIdx, toIdx) {
    var startTilePos = Utility.getTileXYFromIdx(fromIdx, this.props.boardSize);
    var endTilePos = Utility.getTileXYFromIdx(toIdx, this.props.boardSize);
    var startPos = {}; var endPos = {};
    if (startTilePos.x < endTilePos.x) {
      startPos.x = this.getStartX(startTilePos.x) + this.tileSize;
      endPos.x = this.getStartX(endTilePos.x)
    } else if (startTilePos.x == endTilePos.x) {
      var xCoord = this.getStartX(startTilePos.x) + this.tileSize/2;
      startPos.x = xCoord;
      endPos.x = xCoord;
    } else {
      startPos.x = this.getStartX(startTilePos.x);
      endPos.x = this.getStartX(endTilePos.x) + this.tileSize;
    }
    if (startTilePos.y < endTilePos.y) {
      startPos.y = this.getStartY(startTilePos.y) + this.tileSize;
      endPos.y = this.getStartY(endTilePos.y);
    } else if (startTilePos.y == endTilePos.y) {
      var yCoord = this.getStartY(startTilePos.y) + this.tileSize/2;
      startPos.y = yCoord;
      endPos.y = yCoord;
    } else {
      startPos.y = this.getStartY(startTilePos.y);
      endPos.y = this.getStartY(endTilePos.y) + this.tileSize;
    }
    return {start: startPos, end: endPos};
  },
  render: function() {
    var selected = this.props.selected;
    if (selected.length > 1) {
      var prevIdx = -1;
      var lines = [];
      for (var i = selected.length-1; i > 0; i--) {
        var {start, end} = this.getEndPointsFromIndices(selected[i], selected[i-1]);
        lines.push(<Connecter start={start} end={end}/>);
      }
      return (
        <Svg style={styles.svg}>
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
