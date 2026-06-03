import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  async function saveProfile() {
    await AsyncStorage.setItem(
      'profileName',
      name
    );
  }

  async function loadProfile() {
    const savedName =
      await AsyncStorage.getItem('profileName');

    if (savedName) {
      setName(savedName);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>👤</Text>

      <Text style={styles.title}>
        Profile Settings
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter profile name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveProfile}
      >
        <Text style={styles.buttonText}>
          Save Profile
        </Text>
      </TouchableOpacity>

      <Text style={styles.currentName}>
        Current Name: {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDF6EE',
  },
  avatar: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#C1440E',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  currentName: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});