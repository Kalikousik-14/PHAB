import React, { Component } from 'react';
import { Text, View, StyleSheet,AsyncStorage } from 'react-native';
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class DietScreen extends Component{

    constructor(props) {
        super(props);
        this.state={email:'',result:''}
      }
      componentWillMount() {
        this.doFetch()
        this.props.navigation.addListener('focus',()=>{
            this.doFetch()
        })
      }
      async doFetch()
      {
        const retrievedItem =  await AsyncStorage.getItem('id_token');
        await axios.get('https://med-chatbot-server.herokuapp.com/getSuggestions/',{params:{email:retrievedItem}})
        .then( response => {
            this.setState({result:response.data})
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render(){
        if(this.state.result === null)
        {
            return(
                <View style={styles.container}>
                    <Text style={styles.text2}>You have'nt predicted any Disease!</Text>
                </View>
            );
        }
        else{
        return (
            <View style={styles.container}>
                <Text style={styles.text1}>Diet And Doctor!</Text>
                <Text style={styles.text2}>Diet to follow</Text>
                <Text style={styles.text3}>You have diagnosed with {this.state.result.disease}, apart from medicines, for gradual cure maintain this diet.</Text>
                <Text style={styles.text3}>{this.state.result.diet}</Text>
                <Text style={styles.text2}>Specialised Treatment</Text>
                <Text style={styles.text3}>You have diagnosed with {this.state.result.disease}, the specialist for the treatment of this ailment is given below. Click the button to get the map of the location.</Text>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => {this.props.navigation.navigate('Docloc',{ parentNavigation: this.props.navigation })}}
                >
                    <Text style={styles.text4}>Open in Map</Text>
                </TouchableOpacity>
            </View>
          );
        }
    }
  }
  const styles = StyleSheet.create({
    container:{
        alignItems :'center',
        marginTop:hp('10%'),
        padding:hp('3%')
    },
    text1: {
        fontSize: hp('5%'),
    },
    text2: {
        marginTop: wp('3%'),
        fontSize: hp('3%'),
        color:'black'
    },
    text3: {
        marginTop: wp('3%'),
        fontSize: hp('2.5%'),
        marginBottom: wp('5%'),
    },
    input:{
        marginTop:hp('1.8%'),
        width:wp('45%'),
        fontSize: hp('1.55%'),
        height: hp('5%'),
        color: 'black',
        borderColor: '#2979FF',
        borderWidth: hp('0.3%'),
        borderRadius: hp('2%'),
    },
    button:{
        alignItems: "center",
        marginTop:hp('3%'),
        width:wp('45%'),
        fontSize: hp('1.67%'),
        height: hp('5%'),
        backgroundColor: '#2979FF',
        borderRadius: hp('3%'),
        padding:hp('0.5%')
    },
    text4: {
        fontSize: hp('3%'),
        color:'white'
    },
})