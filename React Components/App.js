//Your final app.js with stack navigator and tab navigator
import React, { Component } from 'react';
import { Alert, BackHandler, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {HomeScreen} from './Home.js';
import LoginScreen from './Login.js';


const Stack = createStackNavigator();

export default class App extends Component{
  
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{headerLeft:null}}/>
          </Stack.Navigator>
      </NavigationContainer>
    );
}}