import React,{Component} from 'react';
import { View,Button,Linking,AsyncStorage } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';

export default class DocScreen extends Component{

      async doFetch()
      {
        const retrievedItem =  await AsyncStorage.getItem('id_token');
        await axios.get('https://med-chatbot-server.herokuapp.com/getSuggestions/',{params:{email:retrievedItem}})
        .then( response => {
            const lat = response.data.lat
            const lon = response.data.lon
            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lon}`;
        const label = 'Doctor Location';
        const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    render(){
        return(
        <View alignContents="center" style={{marginTop:hp('35%')}}>
            <Button title="open map" onPress = {this.doFetch()}/>
        </View>
        ); 
}}