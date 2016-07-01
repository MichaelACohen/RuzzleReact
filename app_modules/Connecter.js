import React from 'react';
import {
  Line
} from 'react-native-svg';

import Config from './../config';

var Connecter = React.createClass({
  getEndPoints: function() {
    var start = {x: this.props.fromIdx % Config.boardSize, y: Math.floor(this.props.fromIdx / Config.boardSize)};
    var end = {x: this.props.toIdx % Config.boardSize, y: Math.floor(this.props.toIdx / Config.boardSize)};
    var startPos = {}; var endPos = {};
    if (start.x < end.x) {
      startPos.x = (start.x+1)*Config.tileSpace + (start.x+1)*Config.tileSize;
      endPos.x = (end.x+1)*Config.tileSpace + end.x*Config.tileSize;
    } else if (start.x == end.x) {
      var xCoord = (start.x+1)*Config.tileSpace + (start.x + 0.5)*Config.tileSize;
      startPos.x = xCoord;
      endPos.x = xCoord;
    } else {
      startPos.x = (start.x+1)*Config.tileSpace + start.x*Config.tileSize;
      endPos.x = (end.x+1)*Config.tileSpace + (end.x+1)*Config.tileSize;
    }
    if (start.y < end.y) {
      startPos.y = (start.y+1)*Config.tileSpace + (start.y+1)*Config.tileSize;
      endPos.y = (end.y+1)*Config.tileSpace + end.y*Config.tileSize;
    } else if (start.y == end.y) {
      var yCoord = (start.y+1)*Config.tileSpace + (start.y+0.5)*Config.tileSize;
      startPos.y = yCoord;
      endPos.y = yCoord;
    } else {
      startPos.y = (start.y + 1)*Config.tileSpace + start.y*Config.tileSize;
      endPos.y = (end.y + 1)*Config.tileSpace + (end.y+1)*Config.tileSize;
    }
    return {start: startPos, end: endPos};
  },
  render: function() {
    var endPoints = this.getEndPoints();
    return (
      <Line x1={endPoints.start.x} y1={endPoints.start.y}
      x2={endPoints.end.x} y2={endPoints.end.y}
      stroke="white" strokeWidth="2"/>
    );
  }
});

module.exports = Connecter;
