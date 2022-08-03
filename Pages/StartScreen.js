import { StyleSheet,SafeAreaView,ImageBackground, Text,TouchableOpacity,Button } from 'react-native'
import React,{useEffect,useState} from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, OAuthCredential } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../firebase';
const image = { uri: "https://thumbs.dreamstime.com/b/super-market-blur-background-new-normal-social-distancing-199550648.jpg" };

export default function StartScreen({navigation}) {
    const [startLogin, setStartLogin] = useState('');
    const [startLoginPassword, setStartLoginPassword] = useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    useEffect(()   => {

        const a = '';
        AsyncStorage.getItem('user').then((value)=>{

           setStartLogin(value)

         })
         AsyncStorage.getItem('password').then((value)=>{

            setStartLoginPassword(value)
 
          })
        
          signInWithEmailAndPassword(auth, startLogin, startLoginPassword)
          .then((userCredential) => {
          
         
         

            navigation.navigate('AnaSayfa')
           
          }).catch()
     
       },[startLogin,startLoginPassword])

  return (
    <SafeAreaView style={startScreenStyles.body}>
        <ImageBackground source={image} style={startScreenStyles.image}>

<TouchableOpacity onPress={()=>navigation.navigate('Giris')} style={startScreenStyles.girisButton}>
    <Text style={startScreenStyles.buttonText}>Giriş</Text>
</TouchableOpacity>

<TouchableOpacity  onPress={()=>navigation.navigate('Kayit')} style={startScreenStyles.kayitButton}>
    <Text style={startScreenStyles.buttonText}>Kayıt</Text>
</TouchableOpacity>
</ImageBackground>
    </SafeAreaView>
  )
}


const startScreenStyles = StyleSheet.create({
    body:{
        flex:1,
        justifyContent:'center',
        
    },
    girisButton : {
    backgroundColor:'#f7bc8f',
  
    alignItems:'center',
    padding:20,
    margin:10,
    opacity:0.8,
    borderRadius:100, shadowOffset: { width: 8, height: 8 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 3,
    },
    image:{
        flex:1,
        justifyContent:'center'
    },
    kayitButton:{
        backgroundColor:'#44857F',
        textAlign:'center',
        padding:20,
        margin:10,
        opacity:0.8,
        alignItems:'center',

        borderRadius:100, shadowOffset: { width: 5, height: 8 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 3,
    },
    buttonText:{
        color:'#fff',
        fontSize:24,
        fontWeight:'700'
    }
})