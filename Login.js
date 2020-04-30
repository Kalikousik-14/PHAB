import React, { Component } from 'react';
import { Text, View, Button, } from 'react-native';

export default class LoginScreen extends Component{
    render(){
    return (
        
            <View>  
              <Text>Home screen</Text>
              <Button
                title="Go to Home"
                onPress={() => this.props.navigation.navigate('Home',{ parentNavigation: this.props.navigation })}
              />
            </View>
          
    )
  }}
