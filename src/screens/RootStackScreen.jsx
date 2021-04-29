import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChooseCompany from './ChooseCompany';
import ChoosenCompany from './ChoosenCompany';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="ChooseCompany" component={ChooseCompany} />
    <RootStack.Screen name="ChoosenCompany" component={ChoosenCompany} />

    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
