import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, FlatList, StyleSheet, Text, View, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: string;
};

const coffeeMenu = [
  { id: '1', name: 'Classic Brewed Coffee', desc: 'Our classic coffee brewed from brown Bonesborough beans!', price: '$2.00',},
  { id: '2', name: 'Vanilla Magical Latte', desc: 'Fresh vanilla latte with a magical sprinkle of colored cocoa powder!', price: '$5.15',},
  { id: '3', name: 'Blueberry Lung Cappuccino', desc: 'Your day-to-day cappuccino filled with blueberries.', price: '$3.95',},
  { id: '4', category: 'Hot Beverages', name: 'Lemon Elixir Tea', price: '$3.45',
    desc: 'A hot tea smothered with fresh lemon in a tea bag!'},
  { id: '5', category: 'Hot Beverages', name: "Golden Guard's Signature Mint", price: '$4.10',
    desc: 'Hunter does it best in producing his signature mint tea with brown sugar.'},
  { id: '6', category: 'Cold Chills', name: 'Apple Blood Frappe', price: '$4.95',
    desc: 'Best-seller beverage of the year! Frappucino full of apples all around!'},
  { id: '7', category: 'Cold Chills', name: 'Orange Blossom Iced Tea', price: '$4.20',
    desc: 'For summertime! Orange-flavored cold tea topped with a blossom flower!'},
  { id: '8', category: 'Best-Selling Meals', name: 'Grape Fairy Pie', price: '$3.50',
    desc: 'Good for 1, this sweetening pie full of grapes is good pairing with our most popular drinks!'},
  { id: '9', category: 'Best-Selling Meals', name: 'Blueberry Lung Muffin', price: '$2.65',
    desc: 'Want something very light to eat? Try our blueburry stuffed muffin topped with blueberry sauce!'},
];

export default function MenuScreen() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [favorites, setFavorites] = useState<any[]>([]);

  const addToFavorites = (drink: any) => {
    const newFav = {
      id: drink.id || Date.now(),
      name: drink.name,
      price: drink.price,
    }

    setFavorites([...favorites, newFav]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(
      favorites.filter(item => item.id !== id)
    );
  };

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(
          'coffeeFavorites', JSON.stringify(favorites)
        );
      } catch (e) {
        console.log('Failed to save', e);
      }
    };

    saveFavorites();
  }, [favorites]);

  useEffect(() => {
    const loadFavorites = async () => {
      const raw = await AsyncStorage.getItem('coffeeFavorites');
      if (raw) {
        setFavorites(JSON.parse(raw));
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();

        const coffeeData = data.slice(0, 8).map((post: any) => ({
          id: post.id.toString(),
          name: post.title,
          desc: post.body,
          price: '$4.99',
        }));

        setMenuItems(coffeeData);
        setError('');
      } catch (e) {
        setError('Failed to load coffee menu. Check your internet.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3E1F00" />
        <Text>Loading menu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🦴☕ Bonesborough Coffee & Park Planet Cafe 🚀🏰</Text>

      <Text style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 10, color: '#9d00ff' }}>
        ❤️ Favorited Items: {favorites.length}
      </Text>

      <FlatList
        data={coffeeMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
            <Text style={styles.price}>{item.price}</Text>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => addToFavorites(item)}>
              <Text style={styles.favoriteButtonText}>Add to Favorites</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
  

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#f8fffe',},
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center',},
  title: {fontSize: 24, fontWeight: 'bold', marginTop: 24, marginBottom: 16, color: '#000477',},
  card: {backgroundColor: '#033634', padding: 12, marginBottom: 10, borderRadius: 14,},
  name: { fontSize: 18, fontWeight: 'bold', color:'#00ddff'},
  desc: {color: '#ffc2f7'},
  price: { marginTop: 8, fontWeight: 'bold', color: '#4050ff',},
  favoriteButton: {marginTop: 5, padding: 5, backgroundColor: '#2a0046', borderRadius: 2},
  favoriteButtonText: {color: '#ff00d9', textAlign: 'center'},
});
