import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert, BackHandler } from 'react-native';

export default class DietScreen extends Component{
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
      <View >
          <Text style={styles.text1}>Diet And Doctor!</Text>
          <Text style={styles.text2}>Diet to follow:</Text>
          <Text style={styles.text3}>You have diagnosed with , apart from medicines, for gradual cure maintain this diet.</Text>
          <Text style={styles.text2}>Specialised Treatment</Text>
          <Text style={styles.text3}>You have diagnosed with , the specialist for the treatment of this ailment is given below. Click the button to get the map of the location.</Text>
          <View style={{paddingTop:30}}>
          <Button title="Doctor Location" ></Button></View>
      </View>
    );
  }}
  const styles = StyleSheet.create({

    text1: {
        marginLeft: 25,
        fontSize: 30,
    },
    text2: {
        marginTop:40,
        marginLeft: 25,
        fontSize: 25,
        marginRight: 10
    },
    text3: {
        marginTop:20,
        marginLeft: 25,
        fontSize: 20,
        marginRight: 25
    },
    input: {
        marginTop:15,
        // marginLeft: 15,
        fontSize: 15,
        marginRight: 20,
        height: 30,
        color: 'black',
        borderColor: '#2979FF',
        borderWidth: 2,
        borderRadius: 15,
    }
 })