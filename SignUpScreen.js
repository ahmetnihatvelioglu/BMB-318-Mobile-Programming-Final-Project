import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString()
      });
      
      console.log('Kullanıcı verileri Firestore\'a eklendi');
      Alert.alert('Başarılı', 'Kullanıcı başarıyla oluşturuldu.');
      
      
      navigation.navigate('Login');
    } catch (error) {
      console.error('Firebase kayıt hatası: ', error.message);
      Alert.alert('Hata', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
  
      if (userDoc.exists()) {
        
        navigation.navigate('Home');
      } else {
        
        Alert.alert('Hata', 'Kullanıcı bulunamadı.');
      }
    } catch (error) {
      console.error('Firebase giriş hatası: ', error.message);
      Alert.alert('Hata', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/image/kyk_logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Hesap Oluştur</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>veya</Text>
      <TouchableOpacity style={styles.googleButton} onPress={() => Alert.alert('Hata', 'Google ile giriş şu anda desteklenmiyor.')}>
        <Image source={require('../assets/image/google_login.png')} style={styles.fullButtonImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#fcbf49',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    marginBottom: 10,
  },
  googleButton: {
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    opacity: 0.5, 
  },
  fullButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SignUpScreen;
