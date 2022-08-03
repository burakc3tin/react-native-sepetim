import { View, Text,Button,Image,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import Urunlerim from './Urunlerim';
import Sepet from './Sepet';
import UrunEkle from './UrunEkle';
import TamamlanmisSiparisler from './TamamlanmisSiparisler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

 const Tab = createBottomTabNavigator();

export default function AnaSayfa({navigation}) {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const signOff = () => {
            auth.signOut()
            .then(()=>{
            navigation.replace('StartScreen')

            })
            .catch(error=>console.log(error.message))
            AsyncStorage.removeItem('user')
            AsyncStorage.removeItem('password')
    }
  return (

    

 
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor:'#20B373',height:'9%' },
      tabBarLabelStyle:{fontSize:12,marginBottom:4,color:'#fff'},
      tabBarIconStyle:{marginTop:5,color:'#fff'},
      tabBarActiveTintColor:'#fff',
      tabBarInactiveBackgroundColor:'#3D8063',
      tabBarInactiveTintColor:'#fff',
      
    }}
    
    >
 
    <Tab.Screen name="Urunlerim" component={Urunlerim} 
  
    options={{
      
      headerTitleAlign:'center',
     headerStyle:{
backgroundColor:'#20B373',
 
     },
      title:"Ürünlerim",
      headerRight: () => (

        <TouchableOpacity onPress={()=>signOff()}>
        <Image  style={anaSayfaStyle.quitIcon}   source={require('../assets/quitIcon.jpg')} />
        </TouchableOpacity>
      ),
      
      tabBarIcon : ({color,size})=>(
        <Ionicons name="list-outline" color={color} size={size}/>
      )
    }}
    />  
    <Tab.Screen name="Sepet" component={Sepet}
      options={{
        headerTitleAlign:'center',
        headerStyle:{
          backgroundColor:'#20B373',
           
               },
      headerRight: () => (

        <TouchableOpacity onPress={()=>signOff()}>
        <Image  style={anaSayfaStyle.quitIcon}   source={require('../assets/quitIcon.jpg')} />
        </TouchableOpacity>
      ),
        tabBarIcon : ({color,size})=>(
          <Ionicons name="cart-outline" color={color} size={size}/>
        )
      }}
    />  
    <Tab.Screen name="UrunEkle" component={UrunEkle}
      options={{
        headerTitleAlign:'center',
        headerStyle:{
          backgroundColor:'#20B373',
           
               },
        title:"Ürün Ekle",
        headerRight: () => (
  
          <TouchableOpacity onPress={()=>signOff()}>
          <Image  style={anaSayfaStyle.quitIcon}   source={require('../assets/quitIcon.jpg')} />
          </TouchableOpacity>
        ),
        tabBarIcon : ({color,size})=>(
          <Ionicons name="add-outline" color={color} size={size}/>
        )
      }}
    />  
       <Tab.Screen name="TamamlanmisSiparisler" component={TamamlanmisSiparisler}
      options={{
        headerTitleAlign:'center',
        title:"Tamamlanmış Siparişler",
        headerStyle:{
          backgroundColor:'#20B373',
           
               },
        headerRight: () => (
  
          <TouchableOpacity onPress={()=>signOff()}>
          <Image  style={anaSayfaStyle.quitIcon}   source={require('../assets/quitIcon.jpg')} />
          </TouchableOpacity>
        ),
        tabBarIcon : ({color,size})=>(
          <Ionicons name="timer-outline" color={color} size={size}/>
        )
      }}
    /> 

       {/* <Button
      onPress={signOff}
      title="Çıkış Yap" /> */}
  </Tab.Navigator>
 

  
 
  )
}

const anaSayfaStyle = StyleSheet.create({
  quitIcon:{
    width:25,
    height:25,
    marginRight:10
  }
})