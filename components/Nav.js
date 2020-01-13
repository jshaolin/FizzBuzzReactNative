import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import IntroView from './IntroView';
import FizzBuzzView from './FizzBuzzView';

const MaterialNavigator = createMaterialTopTabNavigator({
    Intro: {
      screen: IntroView
    },
    FizzBuzz: {
      screen: FizzBuzzView
    },
  },
  {
    initialRouteName: 'Intro'
  });
  
const AppContainer = createAppContainer(MaterialNavigator);


export default class Nav extends Component {

    render() {
        return (
            <AppContainer></AppContainer>
        );
    }
}
