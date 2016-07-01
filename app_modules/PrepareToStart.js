import React, {
  Component,
} from 'react';
import {
  Text
} from 'react-native';

import Dictionary from './../helper_modules/dictionary';
import GameController from './GameController';

var PrepareToStart = React.createClass({
  getInitialState: function() {
    return {isDictLoading: true, didLoadSucceed: false, didLoadFail: false};
  },
  componentDidMount: function() {
    var that = this;
    Dictionary.load(function(err) {
      if (err) {
        console.log('dictionary failed to load');
        that.setState({isDictLoading: false, didLoadFail: true});
      } else {
        console.log('dictionary loaded');
        that.setState({isDictLoading: false, didLoadSucceed: true});
      }
    });
  },
  render: function() {
    if (this.state.isDictLoading) {
      return <Text>{"Loading..."}</Text>;
    } else if (this.state.didLoadFail) {
      return <Text>{"Failed."}</Text>;
    } else {
        return <GameController/>;
    }
  }
});

module.exports = PrepareToStart;
