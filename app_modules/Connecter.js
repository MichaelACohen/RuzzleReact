import React from 'react';
import {
  Line
} from 'react-native-svg';

import Config from './../config';

var Connecter = React.createClass({
  render: function() {
    return (
      <Line x1={this.props.start.x} y1={this.props.start.y}
      x2={this.props.end.x} y2={this.props.end.y}
      stroke="white" strokeWidth="2"/>
    );
  }
});

module.exports = Connecter;
