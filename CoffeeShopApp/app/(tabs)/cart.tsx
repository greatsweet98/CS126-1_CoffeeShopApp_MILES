import { View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

// ─── Cart Screen ─────────────────────────────────────────────────────────────
function CartScreen({ navigation }: any) {
  const [note, setNote] = useState("");

  useEffect(() => {
  loadNote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Cart Screen</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OrderSummary')}
      >
        <Text style={styles.buttonText}>View Order Summary</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Order Summary Screen ─────────────────────────────────────────────────────
function OrderSummaryScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Order Summary</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>← Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
// NavigationIndependentTree isolates this stack from the one in index.tsx.
// Both tabs have their own stack — they do not share or interfere with each other.
export default function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1A4D2E' },
          headerTintColor: '#F5F5F5',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Cart"         component={CartScreen}         options={{ title: '🛒 My Cart' }} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{ title: 'Order Summary', headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

async function saveNote() {
  const order = { note: note, time: new Date().toLocaleTimeString()};
  await AsyncStorage.setItem('orderNote', JSON.stringify(order));
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
async function loadMenu() {
  try {
    const response = await fetch('https://api.sampleapis.com/coffee/hot');
    const data = await response.json();

    const mapped = data.map((item: any) => ({
      id: String(item.id),
      category: 'Hot Drinks',
      name: item.title,
      price: '$' + (120 + item.id * 5),
      desc: item.description,
    }));

    setMenuItems(mapped);
  } catch {
    setError('Could not load menu. Check your internet connection.');
  } finally {
    setLoading(false);
  }

  // Show spinner while data is loading
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3E1F00"/>
        <Text style={styles.loadingText}>Loading menu...</Text>
      </View>
    );
  }
  // Show error message if fetch() failed
  try {
    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }
  } catch {
    setError('Could not load menu. Check your internet connection.');
  }
}





// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1A4D2E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});