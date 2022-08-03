import { Text,Alert, TextInput,ImageBackground, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import * as yup from 'yup'
import { Formik } from 'formik'


const image = { uri: "https://previews.123rf.com/images/teploleta/teploleta1507/teploleta150700214/42280248-hand-drawn-vegetable-pattern-vector-background.jpg?fj=1" };


export default function Kayit({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // const handleCreateAccount = () => {

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(() => {
  //       console.log("Created!")
  //       navigation.navigate('Giris')
  //       Alert.alert("Kayıt Başarılı", "✓ Giriş Sayfasına yönlendiriliyorsunuz..");
  //       setEmail('');
  //       setPassword('');
  //       const user = userCredential.user;
  //     }).catch(error => console.log(error.message))
  // }
  return (
    <SafeAreaView style={kayitStyle.body}>
     <Formik
        initialValues={{

          email: '',
          password: ''
        }}
        onSubmit={(values) =>

            createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(() => {
           
              navigation.navigate('Giris')
              Alert.alert("Kayıt Başarılı", "✓ Giriş Sayfasına yönlendiriliyorsunuz..");
             values.email='';
             values.password='';
             }).catch(error => console.log(error.message))
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
          <ImageBackground source={image} style={kayitStyle.image}>

<Text style={kayitStyle.headText}>Kayit</Text>



            {touched.name && errors.name &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.name}</Text>
            }
           
            <TextInput
              value={values.email}
              style={kayitStyle.textInputStyle}
              onChangeText={
                handleChange('email')

              }
              onBlur={() => setFieldTouched('email')}
              placeholder="Bir email girin"
            />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
            }
            <TextInput
              value={values.password}
              style={kayitStyle.textInputStyle}


              onChangeText={handleChange('password')}
              placeholder="Parola belirleyin"
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
            }

            <TouchableOpacity
              disabled={!isValid}
              onPress={handleSubmit}

              style={kayitStyle.kayitButton}>
               <Text style={kayitStyle.kayitText}>Kayıt Ol</Text>
            </TouchableOpacity>

          </ImageBackground>
        )}
      </Formik>
    </SafeAreaView>
  )
}


const kayitStyle = StyleSheet.create({

  body: {
    textAlign: 'center',
    flex: 1,
     flexDirection:'column',
     alignItems:'center'
  },
  headText: {
    fontSize: 30,
    marginBottom: 40,
    fontWeight: '800',
  },
  textInputStyle: {
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    margin: 10,
    width: '70%',
    borderRadius: 10,
    backgroundColor:'#fff'
  },
  image:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:'100%'
  },

  kayitButton: {
    backgroundColor: '#366d68',
    width: '50%',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 10
  },
  kayitText: {
    color: '#fff',
    fontWeight: '900',
    letterSpacing: 2
  }
})