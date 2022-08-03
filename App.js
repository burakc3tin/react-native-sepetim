import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './Pages/StartScreen';
import Giris from './Pages/Giris';
import Kayit from './Pages/Kayit';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnaSayfa from './Pages/AnaSayfa';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';

const Stack = createNativeStackNavigator();

export default function App() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  // const [uye, setUye] = useState(auth.currentUser.email);

  const [loginControl, setLoginControl] = useState('');

  const [valAsyn, setValAsyn] = useState('');

  useEffect(()   => {
    //  AsyncStorage.getItem('user').then((value)=>alert(value))
    
 
   },[])




  return (
    
    <NavigationContainer>
 <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen name="StartScreen" component={StartScreen} options ={{headerShown:false}} />
      <Stack.Screen name="Giris" component={Giris} options ={{headerShown:false}} />
      <Stack.Screen name="Kayit" component={Kayit} options ={{headerShown:false}} />
      <Stack.Screen name="AnaSayfa" component={AnaSayfa} options ={{headerShown:false}} />

      </Stack.Navigator>

  

    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize:8
  },
  container2: {
    color:'brown',
    fontSize:40
  },
});
