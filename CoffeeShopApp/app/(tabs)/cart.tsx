import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState<any>(null);

  useEffect(() => {
    loadNote();
  }, []);

  async function saveNote() {
    const order = {
      note,
      time: new Date().toLocaleString(),
    };
    await AsyncStorage.setItem(
      'orderNote',
      JSON.stringify(order)
    );
    setSaved(order);
    setNote('');
  }
  async function loadNote() {
    const raw = await AsyncStorage.getItem('orderNote');
    if (raw) {
      const parsed = JSON.parse(raw);
      setSaved(parsed);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Your Order Cart 💰</Text>
      <TextInput style={styles.input} placeholder="Order suggestions & adjustments....?" value={note} onChangeText={setNote} />
      <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>

      {saved && (
        <View style={styles.savedBox}>
          <Text style={styles.savedTitle}>Last Saved Note:</Text>
          <Text>{saved.note}</Text>
          <Text>{saved.time}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#f8fffe',},
  title: {fontSize: 24, fontWeight: 'bold', marginTop: 24, marginBottom: 150, color: 'rgb(52, 0, 67)'},
  input: {borderWidth: 1, borderColor: '#999', padding: 10, borderRadius: 5, marginBottom: 15,},
  button: {backgroundColor: '#033634', padding: 12, borderRadius: 10,},
  buttonText: {textAlign: 'center', color: '#dfbaff'},
  savedBox: {marginTop: 20, backgroundColor: '#d3f3f2', padding: 10, borderRadius: 2,},
  savedTitle: {fontWeight: 'bold', color: '#450471'},
});