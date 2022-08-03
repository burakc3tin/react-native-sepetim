import { View, Text,Alert, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import QRCode from 'react-native-qrcode-svg'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



export default function TamamlanmisSiparis({ isim, soyisim, tutar, tarih }) {

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const [sepetUrunIsim, setSepetUrunIsim] = useState('');
  const [uye, setUye] = useState(auth.currentUser.email);
  const [arkaplanRenk, setArkaplanRenk] = useState(0);




  return (
    <View style={{ flex: 1 }}>

      
  <View style={[urunStyle.body]}>

<Text  style={urunStyle.viewBir} >{isim} {soyisim}</Text>
        
        <Text style={urunStyle.viewIki} >{tutar} ₺</Text>
      
      <Text style={urunStyle.viewUc} >{tarih}</Text>
  

</View>
<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth:1,
  }}
/>

    </View>
  )
}


const urunStyle = StyleSheet.create({

  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10

  },
  urunFiyat: {
    fontSize: 15,
    backgroundColor: '#000',
    color: '#fff',
    padding: 4,
    borderRadius: 10
  },
  viewBir:{flex:2,alignItems:'center',textAlign:'center'},
  viewIki:{flex:1},
  viewUc:{flex:1},
  image: {
    width: 80,
    height: 80
  },
  addImage: {
    width: 30,
    height: 30
  },
  productText: {
    fontSize: 18
  }
})