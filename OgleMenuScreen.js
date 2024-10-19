import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const OgleMenuScreen = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newFood, setNewFood] = useState('');
  const [updateFood, setUpdateFood] = useState('');
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastDate, setLastDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(query(collection(db, 'ogleMenu'), orderBy('date', 'asc')));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate(),
        }));
        setMenuItems(items);
        if (items.length > 0) {
          setLastDate(items[items.length - 1].date);
        }
      } catch (error) {
        console.error('Veri çekme hatası: ', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'ogleMenu'), orderBy('date', 'asc')), (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      }));
      setMenuItems(items);
      if (items.length > 0) {
        setLastDate(items[items.length - 1].date);
      } else {
        setLastDate(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendData = async () => {
    setLoading(true);
    try {
      let nextDate;
      if (menuItems.length === 0) {
        nextDate = new Date();
      } else if (lastDate) {
        nextDate = new Date(lastDate.getTime() + (24 * 60 * 60 * 1000));
      } else {
        nextDate = new Date();
      }

      const docRef = await addDoc(collection(db, 'ogleMenu'), {
        date: nextDate,
        foods: [newFood],
      });

      console.log('Veri eklendi, ID: ', docRef.id);
      const updatedItems = [...menuItems, { id: docRef.id, date: nextDate, foods: [newFood] }];
      setMenuItems(updatedItems.sort((a, b) => a.date - b.date));
      setLastDate(nextDate);
      setNewFood('');
    } catch (e) {
      console.error('Veri eklenirken hata oluştu: ', e);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'ogleMenu', id));
      console.log('Veri silindi');
      setMenuItems(menuItems.filter(item => item.id !== id));
      if (menuItems.length === 1) {
        setLastDate(null);
      }
    } catch (error) {
      console.error('Veri silinirken hata oluştu: ', error);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async () => {
    if (selectedDocId) {
      setLoading(true);
      try {
        const itemDoc = doc(db, 'ogleMenu', selectedDocId);
        await updateDoc(itemDoc, {
          foods: [updateFood],
        });
        console.log('Veri güncellendi');
        setMenuItems(menuItems.map(item => item.id === selectedDocId ? { ...item, foods: [updateFood] } : item));
        setUpdateFood('');
        setSelectedDocId(null);
      } catch (error) {
        console.error('Veri güncellenirken hata oluştu: ', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatTurkishDate = (date) => {
    if (!date) return '';
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return date.toLocaleDateString('tr-TR', options);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>ÖĞLE</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              {menuItems.map((item) => (
                <View key={item.id} style={styles.menuItem}>
                  <Text style={styles.date}>{formatTurkishDate(item.date)}</Text>
                  {item.foods.map((food, index) => (
                    <Text key={index} style={styles.food}>{food}</Text>
                  ))}
                  <Button title="Sil" onPress={() => deleteData(item.id)} />
                  <Button title="Güncelle" onPress={() => { setSelectedDocId(item.id); setUpdateFood(item.foods[0]); }} />
                </View>
              ))}

              <TextInput
                style={styles.input}
                placeholder="Yeni Yemek Ekle"
                value={newFood}
                onChangeText={setNewFood}
              />
              <Button title="Yemek Ekle" onPress={sendData} />

              {selectedDocId && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Yemek Güncelle"
                    value={updateFood}
                    onChangeText={setUpdateFood}
                  />
                  <Button title="Güncelle" onPress={updateData} />
                </>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuItem: {
    marginBottom: 15,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  food: {
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingLeft: 10,
    backgroundColor: '#f9f9f9',
  },
});

export default OgleMenuScreen;
