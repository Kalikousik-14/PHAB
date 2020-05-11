import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput, Alert, SafeAreaView,ScrollView } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class RegisterScreen extends Component {
  constructor(props) {
 
    super(props);
    this.state={
      email:'',
      name:'',
      password:'',
      cpassword:'',
      age:'',
      gender:'male',
      height:'',
      weight:'',
      gp:'no'
    };
  }
   userReg()
  {
    if(this.state.email === '' ||this.state.name === '' ||this.state.password === '' ||this.state.cpassword === '' ||this.state.age === '' ||this.state.weight=== '' ||this.state.height === '')
    {
      Alert.alert("All feilds are mandatory and should be filled")
    }
    else if(this.state.password === this.state.cpassword)
    {axios.get('https://med-chatbot-server.herokuapp.com/register/',
      {params:{
        email:this.state.email,
        name:this.state.name,
        password:this.state.password,
        height:this.state.height,
        weight:this.state.weight,
        height:this.state.height,
        gender:this.state.gender,
        age:this.state.age,
        gp:this.state.gp
      }})
    .then(function (response) {
      Alert.alert(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  else
  {
    Alert.alert("passwords doesnt match")
  }
  }
  render(){
    var radio_props1 = [
        {label: 'Male', value: 'male'  },
        {label: 'Female', value: 'female' }
      ];
      var radio_props2 = [
        {label: 'Yes', value: 'yes' },
        {label: 'No', value: 'no' }
      ];
    return (
      <SafeAreaView>
            <ScrollView>
     <View style={styles.container}>
     <TextInput  style= {styles.input} placeholderTextColor='grey' placeholder="Email" onChangeText={email=> this.setState({email})}/>
     <TextInput  style= {styles.input} placeholderTextColor='grey'placeholder="Name" onChangeText={name => this.setState({name})}/>
     <TextInput  style= {styles.input} placeholderTextColor='grey' secureTextEntry={true} placeholder="Password" onChangeText={password => this.setState({password})}/>
     <TextInput  style= {styles.input} placeholderTextColor='grey'secureTextEntry={true} placeholder="Confirm password" onChangeText={cpassword => this.setState({cpassword})}/>
     <TextInput  style= {styles.input} placeholderTextColor='grey' placeholder="Age" onChangeText={age => this.setState({age})}/>
     <Text style={styles.text3}>Gender</Text>
     <RadioForm style={styles.text2}
          radio_props={radio_props1}
          isSelected = {true}
          buttonColor={'#2979FF'}
          labelStyle={{marginRight: wp('4%'),}}
          formHorizontal={true}
          initial={0}
           onPress={(value) => {this.setState({gender:value})}}
        />
        <TextInput  style= {styles.input} placeholderTextColor='grey' placeholder="Height"onChangeText={height => this.setState({height})}/>
        <TextInput  style= {styles.input} placeholderTextColor='grey' placeholder="Weight"onChangeText={weight => this.setState({weight})}/>
        <Text style={styles.text3}>Gym Practices</Text>
        <RadioForm style={styles.text2}
          radio_props={radio_props2}
          buttonColor={'#2979FF'}
          labelStyle={{marginRight: wp('4%'),}}
          formHorizontal={true}
          initial={1}
           onPress={(value) => {this.setState({gp:value})}}
        />
        <TouchableOpacity style= {styles.button} onPress={() => {this.userReg()}}>
          <Text style={styles.text2}>Register</Text>
        </TouchableOpacity>
     </View>
     </ScrollView>
     </SafeAreaView>
    );
  }}
  const styles = StyleSheet.create({
    container:{
        alignItems :'center',
    },
    text1: {
        fontSize: hp('5%'),
    },
    text2: {
        fontSize: hp('3%'),
        color:'white'
    },
    text3: {
        marginTop: wp('5%'),
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