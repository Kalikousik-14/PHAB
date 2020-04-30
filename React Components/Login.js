import React, { Component } from 'react';
import { Text, View, Button,AsyncStorage,BackHandler} from 'react-native';

export default class LoginScreen extends Component{
    constructor(props) {
 
        super(props);
        this.state = { hasToken: false };
        this.back_Button_Press = this.back_Button_Press.bind(this);
     
      }
     
      componentWillMount() {
     
        BackHandler.addEventListener('hardwareBackPress', this.back_Button_Press);
        AsyncStorage.getItem('id_token').then((token) => {
          this.setState({ hasToken: token !== null })
          if(this.state.hasToken)
        {
        this.props.navigation.navigate('Home',{ parentNavigation: this.props.navigation })
        }
        })
        console.log(this.state.hasToken);
      }
     
      componentWillUnmount() {
     
        BackHandler.removeEventListener('hardwareBackPress', this.back_Button_Press);
      }
     
      back_Button_Press = () => {
     
        Alert.alert(
          ' Exit From App ',
          ' Do you want to exit From App ?',
          [
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
            { text: 'No', onPress: () => console.log('NO Pressed') }
          ],
          { cancelable: false },
        );
     
        return true;
      }
    async saveItem(item, selectedValue) {
        try {
          await AsyncStorage.setItem(item, selectedValue);
          console.log('Login Pressed')
        } catch (error) {
          console.error('AsyncStorage error: ' + error.message);
        }
        this.props.navigation.navigate('Home',{ parentNavigation: this.props.navigation })
      }
    render(){
        
    return (
        
            <View>  
              <Text>Home screen</Text>
              <Button
                title="Go to Home"
                onPress={() => {this.saveItem('id_token','yes')}}
              />
            </View>
          
    )
  }}
