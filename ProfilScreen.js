import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, Modal, Pressable } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from '@react-navigation/native'; 
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setBirthDate(formattedDate);
    }
    hideDatePicker();
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, 'students', 'unique_student_id'); 
      await setDoc(userRef, {
        name: name,
        email: email,
        birthDate: birthDate,
        country: selectedCountry,
      });
      Alert.alert('Başarılı bir şekilde kaydedildi');
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      Alert.alert('Kaydetme işlemi sırasında bir hata oluştu');
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryModalVisible(false);
  };

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/image/kyk_logo.png')} style={styles.logo} />
      
      <TextInput 
        style={styles.input} 
        placeholder="İsim" 
        value={name} 
        onChangeText={setName} 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
      />
      
      <TouchableOpacity style={styles.input} onPress={showDatePicker}>
        <Text style={styles.inputText}>{birthDate || 'Doğum Tarihi Seçiniz'}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="tr"
        headerTextIOS="Tarih Seçiniz"
        cancelTextIOS="İptal"
        confirmTextIOS="Onayla"
        date={birthDate ? new Date(birthDate) : new Date()}
        titleStyle={{ color: '#fcbf49' }}
        confirmTextStyle={{ color: '#fcbf49' }}
        cancelTextStyle={{ color: '#fcbf49' }}
        display="default"
      />

      <TouchableOpacity style={styles.input} onPress={() => setCountryModalVisible(true)}>
        <Text style={styles.inputText}>{selectedCountry || 'Ülke/Bölge Seçiniz'}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={countryModalVisible}
        onRequestClose={() => {
          setCountryModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable style={styles.modalItem} onPress={() => handleCountrySelect('Türkiye')}>
              <Text style={styles.modalText}>Türkiye</Text>
            </Pressable>
            <Pressable style={styles.modalItem} onPress={() => handleCountrySelect('Almanya')}>
              <Text style={styles.modalText}>Almanya</Text>
            </Pressable>
            <Pressable style={styles.modalItem} onPress={() => handleCountrySelect('Fransa')}>
              <Text style={styles.modalText}>Fransa</Text>
            </Pressable>
            <Pressable style={styles.modalItem} onPress={() => handleCountrySelect('İngiltere')}>
              <Text style={styles.modalText}>İngiltere</Text>
            </Pressable>
            <Pressable style={styles.modalItem} onPress={() => setCountryModalVisible(false)}>
              <Text style={[styles.modalText, { color: 'red' }]}>İptal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.changePasswordButton} onPress={navigateToChangePassword}>
          <Text style={styles.buttonText}>Şifre Değiştir</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 13,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: '10%',
  },
  changePasswordButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#fcbf49',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#4285F4',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    maxHeight: 300,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalText: {
    fontSize: 18,
    color: '#000',
  },
});

export default ProfileScreen;
