import { Text, TextInput, Button, View, Alert, StyleSheet, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, OAuthCredential } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../firebase';
import * as yup from 'yup'
import { Formik } from 'formik'




const image = { uri: "https://i.pinimg.com/736x/83/e5/4a/83e54ac0841b912e3c6f31f94e2134df.jpg" };


export default function Giris({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginControlText, setLoginControlText] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // const handleSignIn = () => {

  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       const test2 = auth.currentUser;
  //       // console.log(test2)

  //       navigation.navigate('AnaSayfa')
  //     }).catch(error => console.log(error.message))
  // }

 
  return (
    <SafeAreaView style={girisStyle.body}>


      <Formik
        initialValues={{

          email: '',
          password: ''
        }}
        onSubmit={(values) =>


          signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              const user = userCredential.user;
              const test2 = auth.currentUser;
              // console.log(test2)
              setLoginControlText(false)
              AsyncStorage.setItem('user', values.email);
              AsyncStorage.setItem('password', values.password);

              navigation.navigate('AnaSayfa')
              values.email=''
              values.password=''
            }).catch(error => setLoginControlText(true))
        }
        validationSchema={yup.object().shape({

          email: yup
            .string()
            .email('Geçerli bir mail adresi girin')
            .required('Bu alan boş bırakılamaz'),
          password: yup
            .string()
            .min(6, 'Parola en az 6 karakter olmalıdır.')
            .max(10, 'Parola en fazla 10 karakter olmalıdır.')
            .required('Bu alan boş bırakılamaz'),
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <ImageBackground source={image} style={girisStyle.image}>

            <Text style={girisStyle.headText}>Giriş</Text>



            {touched.name && errors.name &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.name}</Text>
            }
            {
              loginControlText&&<Text style={{color:'red'}}>
                Hatalı email ya da parola girdiniz. Tekrar deneyin.
              </Text>
            }
            <TextInput
              value={values.email}
              style={girisStyle.textInputStyle}
              onChangeText={
                handleChange('email')

              }
              onBlur={() => setFieldTouched('email')}
              placeholder="Email adresinizi girin"
            />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
            }
            <TextInput
              value={values.password}
              style={girisStyle.textInputStyle}


              onChangeText={handleChange('password')}
              placeholder="Parolanızı girin"
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
            }

            <TouchableOpacity
              disabled={!isValid}
              onPress={handleSubmit}

              style={girisStyle.girisButton}>
              <Text style={girisStyle.girisText}>Giriş Yap</Text>
            </TouchableOpacity>

          </ImageBackground>
        )}
      </Formik>


    </SafeAreaView>
  )
}


const girisStyle = StyleSheet.create({

  body: {
    textAlign: 'center',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  headText:
  {
    fontSize: 30,
    marginBottom: 40,
    fontWeight: '800',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'

  },

  textInputStyle: {
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    margin: 10,
    width: '70%',
    borderRadius: 10,
    backgroundColor:'#f2eaea'

  },
  girisButton: {
    backgroundColor: '#d16512',
    width: '50%',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 10
  },
  girisText: {
    color: '#fff',
    fontWeight: '900',
    letterSpacing: 2
  }
})

