import { View, Text,StyleSheet,Image,ScrollView, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import QRCode from 'react-native-qrcode-svg'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,addDoc,collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



export default function SepetUrun({urunIsim}) {

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [sepetUrunIsim, setSepetUrunIsim] = useState('');
  const [uye, setUye] = useState(auth.currentUser.email);

 
  const sepeteEkle = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'sepet'), {
        urunIsim: urunIsim,
         fiyat:15,
        uye:uye
       
      })
      
    } catch (err) {
      alert(err)
    }
  }


  return (
    <View style={{flex:1}}>

<View style={urunStyle.body}>
 
 

<Image   style={urunStyle.image} source={require('../assets/productImage.png')} />
 
      <Text style={urunStyle.productText}>{urunIsim}</Text>
     
  
      </View>
      <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
/>
    </View>
  )
}


const urunStyle = StyleSheet.create({

    body : {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#fff'
    
    },
    image:{
        width:80,
        height:80
    },
    addImage:{
      width:30,
      height:30
    },
    productText:{
        fontSize:18
    }
})