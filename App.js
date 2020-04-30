//Your final app.js with stack navigator and tab navigator
import React, { Component } from 'react';
import { Alert, BackHandler } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {HomeScreen} from './Home.js';
import LoginScreen from './Login.js';


const Stack = createStackNavigator();

export default class App extends Component{
  constructor(props) {
 
    super(props);
 
    this.back_Button_Press = this.back_Button_Press.bind(this);
 
  }
 
  componentWillMount() {
 
    BackHandler.addEventListener('hardwareBackPress', this.back_Button_Press);
  }
 
  componentWillUnmount() {
 
    BackHandler.removeEventListener('hardwareBackPress', this.back_Button_Press);
  }
 
  back_Button_Press = () => {
 
    // Put your own code here, which you want to exexute on back button press.
    Alert.alert(
      ' Exit From App ',
      ' Do you want to exit From App ?',
      [
        { text: 'Yes', onPress: () => BackHandler.exitApp() },
        { text: 'No', onPress: () => console.log('NO Pressed') }
      ],
      { cancelable: false },
    );
 
    // Return true to enable back button over ride.
    return true;
  }
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