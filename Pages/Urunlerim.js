import { View, Text,ScrollView,StyleSheet,TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'
import { initializeApp } from 'firebase/app';
import QRCode from 'react-native-qrcode-svg'
import { getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { firebaseConfig } from '../firebase';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,addDoc,where,collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import Urun from '../Components/Urun';

export default function Urunlerim() {
  const auth = getAuth(app);

  const [tasks, setTasks] = useState([]);
  const [valAsyn, setValAsyn] = useState('');

  const [sessionUser, setSessionUser] = useState(auth.currentUser.email);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [search, setSearch] = useState("");

 

  useEffect(() => {
     const q = query(collection(db, 'urunler'),where('uye','==',sessionUser))
   
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data:doc.data()
  
      })))
    })


    
    
  },[])

 

  return (
    <ScrollView style={{flex:1}}>
    <TextInput placeholder='Ürünü ara'
    value={search}
    onChangeText={(text)=>setSearch(text)}
    style={urunlerimStyle.searchInput}
    />
      {tasks.filter((item)=>{
    return  item.data.urunIsim.toLowerCase().includes(search)
    }).map((task) => (
 
    <Urun key={task.id} id={task.id} urunIsim={task.data.urunIsim} urunFiyat={task.data.urunFiyat} urunBarkod={task.data.urunBarkod} />
 ))}
    </ScrollView>
  )
}

const urunlerimStyle= StyleSheet.create({
  searchInput:{fontSize:18,textAlign:'center',padding:10,
backgroundColor:'#e0dede'}
})