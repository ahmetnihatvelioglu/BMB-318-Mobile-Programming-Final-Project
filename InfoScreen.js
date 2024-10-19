import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const InfoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>KYK MENÜ</Text>
      <Text style={styles.infoText}>
        -Bu uygulamamızda sizlere gün içerisinde her öğün çıkacak yemek bilgileri veriliyor olacaktır.
      </Text>
      <Text style={styles.infoText}>
        -Okul hesabınız ile de kayıt ve giriş yapabilirsiniz.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Geri</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>İleri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FFCC00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default InfoScreen;
