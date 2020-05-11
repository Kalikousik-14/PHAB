import React,{Component} from 'react';
import { StyleSheet, Text, TextInput, View, Platform,AsyncStorage,SafeAreaView,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class ChatScreen extends Component{

    constructor(props) {
 
        super(props);
        this.state={result:'',email:'',query:'',qb:''}
        this.doFetch = this.doFetch.bind(this)
      }

    async doFetch()
    {   
        const msg = this.state.qb
        this.setState({query:msg})
        const retrievedItem =  await AsyncStorage.getItem('id_token');
        await axios.get('https://med-chatbot-server.herokuapp.com/chatbot/'+this.state.qb,{params:{email:retrievedItem}})
            .then((response) => {
                this.setState({result:response.data})
            })
            .catch(function (error) {
            console.log(error);
            });  
    }
    render()
    {
    return (
        <SafeAreaView>
            <ScrollView>
            <Text style={styles.text1}>Ask Me Anything!</Text>
            <Text style={styles.text2}>Just kidding, I can only answer queries about your health.</Text>
            <Text style={styles.text3}>(Say Some Symptoms or Greet with 'Hi')</Text>
            <View style={styles.container1}>
                <Text style={styles.text4}>{this.state.result.reply}</Text>
                </View>
            <View style={styles.container2}>
                <Text style={styles.text4}>{this.state.query}</Text>
            </View>
            
            <View style= {{flexDirection: 'row'}}>
                <View style={{flex:1,width: wp('60%')}}>
                    <TextInput style={styles.input} placeholder="Enter query" onChangeText={qb => this.setState({qb})}/>
                </View>
                <View style={{flex:1,alignItems: 'flex-end',width: 20}}>
                    <Icon name="paper-plane" size={hp('3%')} 
                    color='#2979FF' style={styles.icon} onPress={this.doFetch}/>
                </View>
            </View>
            </ScrollView> 
      </SafeAreaView>
    );
  }
}
  const styles = StyleSheet.create({
    container1: {    
       marginTop: hp('5%'),
       marginLeft:wp('2%'),
       marginRight:wp('7%'),
       borderColor: '#2979FF',
       borderWidth: hp('0.3%'),
        borderRadius: hp('4%'),
       height: Platform.OS === 'ios' ? hp('23%') : hp('26%'),
       padding:hp('5%')
    },
    container2: {
        marginTop: hp('5%'),
       marginRight:wp('2%'),
       marginLeft:wp('7%'),
        borderColor: '#2979FF',
       borderWidth: hp('0.3%'),
        borderRadius: hp('4%'),
        height: Platform.OS === 'ios' ? hp('23%') : hp('26%'),
        padding:hp('5%')
     },
     icon:{
        marginTop: hp('7%'),
        marginRight:wp('7%')
     },
     input:{
        marginTop:hp('6%'),
        marginLeft:wp('2%'),
        width:wp('80%'),
        fontSize: hp('1.9%'),
        height: hp('5%'),
        color: 'black',
        borderColor: '#2979FF',
        borderWidth: hp('0.3%'),
        borderRadius: hp('2%'),
        padding:hp('1.5%')
    },
    text1: {
        marginLeft:wp('3%'),
        marginTop:hp('4%'),
        fontSize: hp('4%'),
    },
    text2: {
        marginLeft:wp('3%'),
        marginTop:hp('1%'),
        fontSize: hp('1.67%'),
        color:'black'
    },
    text3: {
        marginLeft:wp('3%'),
        marginTop: wp('2%'),
        fontSize: hp('2%'),
    },
    text4: {
        fontSize: hp('3%'),
    },
 })