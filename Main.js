import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {SuggestScreen} from './Suggestions.js';
import {DetailsScreen} from './Details.js'
import ChatScreen from './Chatbot.js'

const Tab = createMaterialBottomTabNavigator();
export function MainScreen(){
    return (
      <Tab.Navigator initialRouteName="Details" screenOptions={{ gestureEnabled: false }}>
          <Tab.Screen name="Chatbot" component={ChatScreen} />
          <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen name="Suggestions" component={SuggestScreen} />
        </Tab.Navigator>
    );
  }