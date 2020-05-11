//Your final app.js with stack navigator and tab navigator
import React, { Component } from 'react';
import { Alert, BackHandler, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {MainScreen} from './Main.js';
import LoginScreen from './Login.js';
import RegisterScreen from './Register.js';
import EditScreen from './Edit.js'

const Stack = createStackNavigator();

export default class App extends Component{
  
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} options={{headerShown:false}}/>
          </Stack.Navigator>
      </NavigationContainer>
    );
}}