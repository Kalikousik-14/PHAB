import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DietScreen from './Diet.js';
import DocScreen from './Doctor.js'

const Tab = createStackNavigator();
export function SuggestScreen(){
    return (
      <Tab.Navigator screenOptions={{ gestureEnabled: false }}>
          <Tab.Screen name="Suggestions" component={DietScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Docloc" component={DocScreen} />
        </Tab.Navigator>
    );
  }