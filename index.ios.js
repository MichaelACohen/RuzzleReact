import React, {
  Component
} from 'react';
import {
  AppRegistry,
  NavigatorIOS
} from 'react-native';

import MainMenu from './app_modules/MainMenu';

class Ruzzle extends Component {
  render() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          component: MainMenu,
          title: 'Main Menu'
        }}
      />
    );
  }
};

AppRegistry.registerComponent('Ruzzle', function() { return Ruzzle });
