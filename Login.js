import React, { Component } from 'react';
import { Text, View, AsyncStorage, TextInput, Alert, StyleSheet} from 'react-native';
import axios from 'axios'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LoginScreen extends Component{
    constructor(props) {
 
        super(props);
        this.state = { hasToken: false,email:'',password:'' ,result:''};
      }
      static navigationOptions = {
        gesturesEnabled: false,
};
      componentWillMount() {
        AsyncStorage.getItem('id_token').then((token) => {
          this.setState({ hasToken: token !== null })
          if(this.state.hasToken)
        {
        this.props.navigation.navigate('Main',{ parentNavigation: this.props.navigation })
        }
        })
        }

    async saveItem(item) {
        if(this.state.email === '' || this.state.password === '')
        {
            Alert.alert("Either Email / Password cant be empty") 
        }
        else{
       await axios.get('https://med-chatbot-server.herokuapp.com/login/',{params:{email:this.state.email,password:this.state.password}})
        .then( response => {
         this.setState({result:response.data})
        })
        .catch(function (error) {
            Alert.alert(error)
        });
        if(this.state.result === this.state.email)
        {
        this.setState({result:''})
        AsyncStorage.setItem(item, this.state.email);
        this.props.navigation.navigate('Main',{ parentNavigation: this.props.navigation})
        }
        else
        {
            Alert.alert("Either Email / Password is incorrect")
        }}
      }
    render(){
        
    return (
        
            <View style={styles.container}>  
                <Text style = {styles.text1}>Login</Text>
                <TextInput  style= {styles.input} placeholderTextColor='grey' placeholder="Email" onChangeText={email=> this.setState({email})}/>
             <TextInput  style= {styles.input} secureTextEntry={true} placeholderTextColor='grey' placeholder="Password" onChangeText={password => this.setState({password})}/>
              <TouchableOpacity
              style= {styles.button}
                title="Login"
                onPress={() => {this.saveItem('id_token')}}
              ><Text style = {styles.text2}>Login</Text></TouchableOpacity>
              <Text style = {styles.text3}>New User? Register below</Text>
              <TouchableOpacity
              style= {styles.button}
                onPress={() => this.props.navigation.navigate('Register')}
              ><Text style = {styles.text2}>Register</Text></TouchableOpacity>
            </View>
          
    )
  }}
const styles = StyleSheet.create({
    container:{
        alignItems :'center',
        marginTop: hp('20%')
    },
    text1: {
        fontSize: hp('5%'),
    },
    text2: {
        fontSize: hp('3%'),
        color:'white'
    },
    text3: {
        marginTop: wp('10%'),
        fontSize: hp('3%'),
    },
    input:{
        marginTop:hp('3%'),
        width:wp('85%'),
        fontSize: hp('1.67%'),
        height: hp('7%'),
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