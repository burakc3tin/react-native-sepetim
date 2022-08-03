import { View, Text,StyleSheet, ScrollView, Button, Alert, Modal, Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app';
import QRCode from 'react-native-qrcode-svg'
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from '../firebase';
 import { getFirestore,doc,deleteDoc, setDoc, addDoc, where, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import SepetUrun from '../Components/SepetUrun';
import * as yup from 'yup'
import { Formik } from 'formik'

export default function Sepet() {
  const auth = getAuth(app);

  const [musteriIsim, setMusteriIsim] = useState('');
  const [musteriSoyisim, setMusteriSoyisim] = useState('');


  const [tasks, setTasks] = useState([]);
  const [sessionUser, setSessionUser] = useState(auth.currentUser.email);
 const [toplamFiyat,setToplamFiyat] = useState(0);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [uye, setUye] = useState(auth.currentUser.email);

  const [modalVisible, setModalVisible] = useState(false);
   const toplam = 0;

  useEffect(() => {
    const q = query(collection(db, 'sepet'), where('uye', '==', sessionUser))
  
    onSnapshot(q, (querySnapshot) => {
      setTasks(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
        
      })))
    })

  
 
  }, [])
  const me = 4;
 
  useEffect(() => {
 
    setToplamFiyat(0)
    tasks.map((task) => (
    
     setToplamFiyat(item=>item+=task.data.fiyat)

))
 
  }, [tasks])


  const tamamlanmisSiparisEkle = async () => {
   
    try {
      await addDoc(collection(db, 'tamamlanmisSiparisler'), {
        isim: musteriIsim,
        soyisim: musteriSoyisim,
        tutar:toplamFiyat,
        tarih:new Date().toLocaleDateString(),
        uye:uye
       
      })
      setMusteriIsim("");
      setMusteriSoyisim("");
       
    } catch (err) {
      alert(err)
    }
  }


  const handleDelete =  () => {
    
    
    const q = query(collection(db, 'sepet'))
    

    tasks.map((task) => (
      deleteDoc(doc(db, 'sepet',task.id))
      
    ))
    
   
      tamamlanmisSiparisEkle()

   setModalVisible(!modalVisible)
     
  }


  return (
    <View style={{ flex: 1 }}>

      {/* **********************MODAL START ********************** */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
        <Pressable
              style={styles.kapatButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.kapatTextStyle}>✘</Text>
            </Pressable>
            <Formik
        initialValues={{
        isim:'',
        soyisim:''
         
        }}
        onSubmit={(values) =>{
          const q = query(collection(db, 'sepet'))
    

          tasks.map((task) => (
            deleteDoc(doc(db, 'sepet',task.id))
            
          ))
          
         
          addDoc(collection(db, 'tamamlanmisSiparisler'), {
            isim: values.isim,
            soyisim: values.soyisim,
            tutar:toplamFiyat,
            tarih:new Date().toLocaleDateString(),
            uye:uye
           
          })

          setMusteriIsim("");
          setMusteriSoyisim("");
      
         setModalVisible(!modalVisible)
        }
            
        }
        validationSchema={yup.object().shape({
            isim: yup
            .string()
            .required('Bu alan boş bırakılamaz')
            .max(20, 'Fazla karakter girildi')
            ,
          soyisim: yup
            .string()
            .required('Bu alan boş bırakılamaz')
            .max(20, 'Fazla karakter girildi')
 
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <View style={styles.modalView}>

<Text style={styles.odemeModalTitle}>ÖDEMEYİ BİTİR</Text>

 
            <TextInput
              value={values.isim}
              style={styles.textInputSepet}
              onChangeText={
                handleChange('isim')

              }
              onBlur={() => setFieldTouched('isim')}
              placeholder='Isim giriniz'
            />
            {touched.isim && errors.isim &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.isim}</Text>
            }
            <TextInput
              value={values.soyisim}
              style={styles.textInputSepet}


              onChangeText={handleChange('soyisim')}
              placeholder='Soyisim giriniz'
              onBlur={() => setFieldTouched('soyisim')}
              
            />
            {touched.soyisim && errors.soyisim &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.soyisim}</Text>
            }

            <TouchableOpacity
              disabled={!isValid}
              onPress={handleSubmit}

              style={[styles.button, styles.buttonClose]}>
           <Text style={styles.textStyle}>✓ Tamamla    </Text>

            </TouchableOpacity>

          </View>
        )}
      </Formik>

        </View>
      </Modal>

      {/* **********************MODAL END ********************** */}
    
      {tasks.length<1&&
            
            <View style={{flex:1,justifyContent:'center',
            alignItems:'center'
            }}>

              <Text
              style={{fontSize:20}}
              >Sepetiniz boş</Text>
            </View>
            }
    
    {tasks.length>0&&
              <ScrollView style={{ flex: 1,backgroundColor:'#eaffef' }}>
              {tasks.map((task) => (
      
                <SepetUrun key={task.id} id={task.id} urunIsim={task.data.urunIsim} />
                
              ))}
                  
            </ScrollView>   
            
          }
  
       
          {tasks.length>0&&   <Button onPress={() => setModalVisible(true)}
        title={`ÖDEMEYİ TAMAMLA - ${toplamFiyat} ₺`} />}
    
    </View>
  )
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  textInputSepet : {
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    margin: 10,
    width: '95%',
    borderRadius:10,
   backgroundColor:"#f2fff3"
  },
  odemeModalTitle:{
    fontSize:22,
    letterSpacing:3,
    fontWeight:'600',
    marginBottom:30
    
  },
  modalView: {
    margin: 20,
    width:'90%',
    height:'60%',
    justifyContent:'center',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop:25,
    width:'95%'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#137a18",
  },
  kapatButton:{
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    backgroundColor: "#b21a31",
    width:'40%'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  kapatTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:20
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});