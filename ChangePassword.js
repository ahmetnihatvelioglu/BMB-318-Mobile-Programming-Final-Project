import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig'; 
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const PasswordChangeScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigation = useNavigation();

  const handleSave = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        Alert.alert('Hata', 'Yeni şifreler eşleşmiyor.');
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Hata', 'Kullanıcı doğrulanamadı.');
        return;
      }

      
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      
      await updatePassword(user, newPassword);

      Alert.alert('Başarılı', 'Şifre başarıyla güncellendi.');

      
      navigation.navigate('Home');

    } catch (error) {
      console.error('Şifre güncelleme hatası:', error);
      Alert.alert('Hata', 'Şifre güncellenemedi. Lütfen tekrar deneyin.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../assets/image/kyk_logo.png')} style={styles.logo} />

        <TextInput
          style={styles.input}
          placeholder="Eski Şifre giriniz"
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Yeni Şifre giriniz"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Yeni Şifre Doğrula"
          secureTextEntry
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Kaydet</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
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
  saveButton: {
    marginTop: 20,
    backgroundColor: '#4285F4',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PasswordChangeScreen;
