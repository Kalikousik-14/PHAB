import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home.js';
import EditScreen from './Edit.js'

const Tab = createStackNavigator();
export function DetailsScreen(){
    return (
      <Tab.Navigator screenOptions={{ gestureEnabled: false }}>
          <Tab.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Tab.Screen name="Edit" component={EditScreen} />
        </Tab.Navigator>
    );
  }