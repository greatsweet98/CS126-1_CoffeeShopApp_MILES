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
      <Text style={styles.title}>🛒 Cart Screen</Text>
      <TextInput style={styles.input} placeholder="Special Instructions..." value={note} onChangeText={setNote} />
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
  container: {flex: 1, padding: 20, backgroundColor: '#FDF6EE',},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20,},
  input: {borderWidth: 1, borderColor: '#999', padding: 10, borderRadius: 8, marginBottom: 15,},
  button: {backgroundColor: '#1A4D2E', padding: 12, borderRadius: 8,},
  buttonText: {color: 'white', textAlign: 'center',},
  savedBox: {marginTop: 20, backgroundColor: '#EAF3EC', padding: 10, borderRadius: 8,},
  savedTitle: {fontWeight: 'bold',},
});