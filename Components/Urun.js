import { View,Button, Text,StyleSheet,Modal,TextInput, Pressable,Image,ScrollView, TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import QRCode from 'react-native-qrcode-svg'
import { BarCodeScanner } from 'expo-barcode-scanner';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import {getFirestore} from 'firebase/firestore';
import {doc,setDoc,addDoc,collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



export default function Urun({urunIsim,urunFiyat,urunBarkod}) {

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [modalVisible, setModalVisible] = useState(false);
  const [sepetUrunIsim, setSepetUrunIsim] = useState('');
  const [uye, setUye] = useState(auth.currentUser.email);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannerController, setScannerController] = useState(false);


  useEffect(()=>{
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    
    getBarCodeScannerPermissions();  

  },[]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    


    addDoc(collection(db, 'sepet'), {
      urunIsim: urunIsim,
       fiyat:urunFiyat,
      uye:uye
     
    })
    alert(`${urunIsim} başarıyla sepete eklendi!`);
    setScannerController(false)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const sepeteEkle = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'sepet'), {
        urunIsim: urunIsim,
         fiyat:urunFiyat,
        uye:uye
       
      })
      
    } catch (err) {
      alert(err)
    }
  }

const kapatModal = () =>{
  setModalVisible(!modalVisible)
  setScannerController(false)
}
  return (
    <View  style={{flex:1}}>
   {/* **********************MODAL START ********************** */}
   <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
        <Pressable
              style={modalStyles.kapatButton}
              onPress={() =>kapatModal()}
            >
              <Text style={modalStyles.kapatTextStyle}>✘</Text>
            </Pressable>
          <View style={modalStyles.modalView}>
         <Text style={urunStyle.urunBarkodText}>{urunBarkod}</Text>
            <QRCode 
size={200}
  value={urunIsim}
  />
<TouchableOpacity 
style={urunStyle.koduTaratButton}
onPress={()=>setScannerController(!scannerController)}>
  <Text style={urunStyle.koduTaratText}>QR Kod Tarat</Text>
</TouchableOpacity>
 
{scannerController?<BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />:null}
 
      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
    
          </View>
        </View>
      </Modal>

      {/* **********************MODAL END ********************** */}
<View   style={urunStyle.body}>
 
 

 
  <TouchableOpacity style={urunStyle.viewBir} onPress={sepeteEkle}>
<Image   style={urunStyle.addImage} source={require('../assets/addIcon.png')} />
</TouchableOpacity>
 

    <View style={urunStyle.viewIki}><Image   style={urunStyle.image} source={require('../assets/productImage.png')} />
</View>

    <View style={urunStyle.viewUc}><Text style={urunStyle.productText}>{urunIsim}</Text>
</View>

    <View style={urunStyle.viewDort}>
      <TouchableOpacity style={urunStyle.barkodButtonStyle} onPress={()=>setModalVisible(!modalVisible)}>
        <Text style={{color:'#fff'}}>Barkod</Text>
      </TouchableOpacity>
 </View>

    <View style={urunStyle.viewBes}><Text style={urunStyle.urunFiyat}>{urunFiyat} ₺</Text>
</View>

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
    urunFiyat:{
      fontSize:15,
      backgroundColor:'#000',
      color:'#fff',
      padding:4,
      borderRadius:10,
      textAlign:'center'
    },
    barkodButtonStyle:{
      backgroundColor:'#2383dd',
      alignItems:'center',padding:5,
      borderRadius:8
    },
    urunBarkodText:{
      fontSize:18,
      width:'60%',
      color:'#706969',
      marginBottom:30
    },
    image:{
        width:80,
        height:80
    },
    koduTaratButton:{
      backgroundColor:'green',
      marginTop:30,
      padding:10,
      borderRadius:10
    },
    koduTaratText:{
     color:'#fff'
    },
    addImage:{
      width:30,
      height:30
    },
    productText:{
        fontSize:18,
        fontWeight:'600'
         
    },
    viewBir:{flex:0.5},
    viewIki:{flex:1},
    viewUc:{flex:2,alignItems:'center'},
    viewDort:{flex:1},
    viewBes:{flex:1,margin:10},
})

const modalStyles = StyleSheet.create({
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
   backgroundColor:"#e5fffe"
  },
  odemeModalTitle:{
    fontSize:22,
    letterSpacing:3,
    fontWeight:'600',
    marginBottom:50
    
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