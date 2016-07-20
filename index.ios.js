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
        itemWrapperStyle={{flex: 1, marginTop: 64}}
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
