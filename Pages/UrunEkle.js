import { View, Text,Alert,StyleSheet,TouchableOpacity,TextInput,ImageBackground } from 'react-native'
import React,{createRef, useState} from 'react'
import QRCode from 'react-native-qrcode-svg'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,addDoc,collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import uuid from 'react-native-uuid';
import * as yup from 'yup'
import { Formik } from 'formik'



const image = { uri: "https://i.pinimg.com/736x/18/39/e3/1839e3812bcfcd74805374910ef0db57.jpg" };


export default function UrunEkle({navigation}) {

  const auth = getAuth(app);
  
  const [urunIsim, setUrunIsim] = useState('');
  const [urunFiyat, setUrunFiyat] = useState('');
  const [urunResim, setUrunResim] = useState('');
  const [urunBarkod, setUrunBarkod] = useState('');
  const [uye, setUye] = useState(auth.currentUser.email);

const urunIsimRef = createRef();
const urunFiyatRef = createRef();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  //Firebase veri ekleme 
  
  const urunEkle = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'urunler'), {
        urunIsim: urunIsim,
        urunResim: "resim",
        urunFiyat:parseInt(urunFiyat),
        urunBarkod:uuid.v4(),
        uye:uye
       
      })
      setUrunIsim("");
      setUrunFiyat("");
       Alert.alert("Eklendi", "✓ Ürün başarıyla eklendi!");
    } catch (err) {
      alert(err)
    }
  }


  return (
    <View style={urunEkleStyle.body}>

<Formik
                initialValues={{
                    formikUrunIsim: '',
                    formikUrunFiyat: ''

                }}
                onSubmit={(values) =>
                    {

                      addDoc(collection(db, 'urunler'), {
                        urunIsim: values.formikUrunIsim,
                        urunResim: "resim",
                        urunFiyat:parseInt(values.formikUrunFiyat),
                        urunBarkod:uuid.v4(),
                        uye:uye
                       
                      })
                      setUrunIsim("");
                      setUrunFiyat("");
                      values.formikUrunIsim ='';
                      values.formikUrunFiyat ='';
                      urunIsimRef.current.clear()
                      urunFiyatRef.current.clear()
                     navigation.navigate('Urunlerim')
                       Alert.alert("Eklendi", "✓ Ürün başarıyla eklendi!");
                     
                    }
                }
                validationSchema={yup.object().shape({
                    formikUrunIsim: yup
                        .string()
                        .required('Bu alan boş bırakılamaz')
                        .max(20, 'Fazla karakter girildi')
                    ,
                    formikUrunFiyat: yup
                        .number()
                        .positive()
                        .required('Bu alan boş bırakılamaz')
                         
                        .typeError('Geçerli bir sayı girin')

                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (

                    <ImageBackground source={image} style={urunEkleStyle.image}>

                    <Text 
                    style={{fontSize:30,letterSpacing:3,
                    fontWeight:'700',
                  marginBottom:30}}
                    >ÜRÜN EKLE</Text>

                        <TextInput
                        ref={urunIsimRef}
                            value={values.formikUrunIsim}
                            style={urunEkleStyle.textInputStyle}
                            onChangeText={
                                handleChange('formikUrunIsim')
                            }
                            onBlur={() => setFieldTouched('formikUrunIsim')}
                            placeholder='Ürün ismini giriniz'
                        />
                        {touched.formikUrunIsim && errors.formikUrunIsim &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.formikUrunIsim}</Text>
                        }
                        <TextInput
                                                ref={urunFiyatRef}

                            value={values.formikUrunFiyat}
                            style={urunEkleStyle.textInputStyle}
                            onChangeText={handleChange('formikUrunFiyat')}
                            placeholder='Ürün fiyatını giriniz'
                            onBlur={() => setFieldTouched('formikUrunFiyat')}

                        />
                        {touched.formikUrunFiyat && errors.formikUrunFiyat &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.formikUrunFiyat}</Text>
                        }

                        <TouchableOpacity
                            disabled={!isValid}
                            onPress={handleSubmit}

                            style={urunEkleStyle.ekleButton}>
                            <Text style={urunEkleStyle.buttonText}>
                                Ürün Ekle
                            </Text>

                        </TouchableOpacity>

                    </ImageBackground>
                )}
            </Formik>
    </View>
  )
}



const urunEkleStyle = StyleSheet.create({

  body: {
    textAlign: 'center',
    flex: 1,
     flexDirection:'column',
     alignItems:'center'
  },
  image:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:'100%'
  
},

textInputStyle: {
  borderWidth: 1,
  textAlign: 'center',
  padding: 10,
  margin: 10,
  width: '70%',
  borderRadius:10,
 backgroundColor:"#f4e3f2"

},

ekleButton: {
  backgroundColor: '#87277a',
  width: '50%',
  alignItems: 'center',
  padding: 10,
  marginTop: 20,
  borderRadius:10,
   
},
  
buttonText:{
  color:"#f4e3f2"
}
})