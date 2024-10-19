import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    navigation.navigate('Profil');
  };

  const handleLogoutPress = () => {
    navigation.navigate('Login');
  };

  const handleSabahMenuPress = () => {
    navigation.navigate('SabahMenu');
  };

  const handleOgleMenuPress = () => {
    navigation.navigate('OgleMenu');
  };

  const handleAksamMenuPress = () => {
    navigation.navigate('AksamMenu'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.centeredText}>KYK MENÜ</Text>

      <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
        <Text style={styles.profileText}>PROFİLİM</Text>
        <Image
          source={require('../assets/image/profil.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={handleSabahMenuPress}>
        <Text style={styles.menuText}>SABAH MENÜSÜ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={handleOgleMenuPress}>
        <Text style={styles.menuText}>ÖĞLE MENÜSÜ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={handleAksamMenuPress}>
        <Text style={styles.menuText}>AKŞAM MENÜSÜ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
        <Text style={styles.logoutText}>ÇIKIŞ YAP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  menuButton: {
    backgroundColor: '#ff0000',
    width: '80%',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  centeredText: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    marginTop: 20,
    position: 'absolute',
    top: 180,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    top: 100,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ff0000',
    position: 'absolute',
    top: 20,
    right: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomePage;
