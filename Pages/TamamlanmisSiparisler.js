import { View,FlatList, Text,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { initializeApp } from 'firebase/app';
import QRCode from 'react-native-qrcode-svg'
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from '../firebase';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,addDoc,where,collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import TamamlanmisSiparis from '../Components/TamamlanmisSiparis';

export default function Urunlerim() {
  const auth = getAuth(app);

  const [tasks, setTasks] = useState([]);
  const [sessionUser, setSessionUser] = useState(auth.currentUser.email);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

 

  useEffect(() => {
    const q = query(collection(db, 'tamamlanmisSiparisler'),where('uye','==',sessionUser))
   
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data:doc.data()
  
      })))
    })
    
  },[])


  return (
    <ScrollView style={{flex:1,backgroundColor:'#eaffef'}}>
     {tasks.map((task) => (
 
    <TamamlanmisSiparis key={task.id} id={task.id} isim={task.data.isim} soyisim={task.data.soyisim} tutar={task.data.tutar}
    tarih={task.data.tarih} />
 ))}
    </ScrollView>
  )
}