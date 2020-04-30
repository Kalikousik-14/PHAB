import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DietScreen from './Diet.js';

const Tab = createMaterialBottomTabNavigator();
export function HomeScreen(){
    return (
      <Tab.Navigator>
        <Tab.Screen name="Diet" component={DietScreen} />
        </Tab.Navigator>
    );
  }