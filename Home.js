import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, BackHandler,AsyncStorage,SafeAreaView,ScrollView } from 'react-native';
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScreen extends Component{
    constructor(props) {
 
        super(props);
     
        this.back_Button_Press = this.back_Button_Press.bind(this);
        this.state={result:'',email:''}
     
      }
     
      componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.back_Button_Press);
        this.doFetch()
        this.props.navigation.addListener('focus',()=>{
          this.doFetch()
        })
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

      async userLogout() {
        try {
          await AsyncStorage.removeItem('id_token');
          Alert.alert('Logout Success!');
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
      }
      
      async doFetch()
      {
        const retrievedItem =  await AsyncStorage.getItem('id_token');
        await axios.get('https://med-chatbot-server.herokuapp.com/getDetails/',{params:{email:retrievedItem}})
        .then( response => {
         this.setState({result:response.data})
        })
        .catch(function (error) {
          console.log(error);
        });
      
      }
    render(){
       
    return (
      <SafeAreaView>
            <ScrollView>
      <View style={styles.container}>
          <Text style={styles.text1}>Details!</Text>
          <View style= {{flexDirection: 'row', marginTop: 60, marginLeft:25}}>
            <View style={{flex:1}}>
              <Text style={styles.text3}>Name:</Text>
              <Text style={styles.text3}>Age:</Text>
              <Text style={styles.text3}>Gender:</Text>
              <Text style={styles.text3}>Height:</Text>
              <Text style={styles.text3}>Weight:</Text>
              <Text style={styles.text3}>Gym practices:</Text>
              <Text style={styles.text3}>Current Disease:</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={styles.text3}>{this.state.result.name}</Text>
              <Text style={styles.text3}>{this.state.result.age}</Text>
              <Text style={styles.text3}>{this.state.result.gender}</Text>
              <Text style={styles.text3}>{this.state.result.height}</Text>
              <Text style={styles.text3}>{this.state.result.weight}</Text>
              <Text style={styles.text3}>{this.state.result.gp}</Text>
              <Text style={styles.text3}>{this.state.result.cd}</Text>
            </View>
            </View>
            <TouchableOpacity style = {styles.button}  onPress={() => {this.props.navigation.navigate('Edit',{ parentNavigation: this.props.navigation })}}><Text style ={styles.text2} >Edit</Text></TouchableOpacity>
            <TouchableOpacity style = {styles.button} onPress={() => {this.userLogout(),this.props.navigation.navigate('Login',{ parentNavigation: this.props.navigation })}}><Text style ={styles.text2}>Logout</Text></TouchableOpacity>
      </View>
      </ScrollView>
      </SafeAreaView>
    );
  }}
  const styles = StyleSheet.create({
    container:{
        alignItems :'center',
        marginTop:hp('10%')
    },
    text1: {
        fontSize: hp('5%'),
    },
    text2: {
        fontSize: hp('3%'),
        color:'white'
    },
    text3: {
        marginTop: wp('2%'),
        fontSize: hp('2.5%'),
        marginBottom: wp('5%'),
    },
    input:{
        marginTop:hp('3%'),
        width:wp('85%'),
        fontSize: hp('1.55%'),
        height: hp('4.5%'),
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
    }
})