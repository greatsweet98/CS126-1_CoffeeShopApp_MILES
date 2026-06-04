import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const coffeeMenu = [
  {
    id: '1',
    name: 'Classic Brewed Coffee',
    desc: 'Our classic coffee brewed from brown Bonesborough beans!',
    price: '$2.00',
  },
  {
    id: '2',
    name: 'Vanilla Magical Latte',
    desc: 'Fresh vanilla latte with a magical sprinkle of colored cocoa powder!',
    price: '$5.15',
  },
  {
    id: '3',
    name: 'Blueberry Lung Cappuccino',
    desc: 'Your day-to-day cappuccino filled with blueberries.',
    price: '$3.95',
  },
  {id: '4', category: 'Hot Beverages', name: 'Lemon Elixir Tea', price: '$3.45',
    desc: 'A hot tea smothered with fresh lemon in a tea bag!'},
  {id: '5', category: 'Hot Beverages', name: "Golden Guard's Signature Mint", price: '$4.10',
    desc: 'Hunter does it best in producing his signature mint tea with brown sugar.'},
  {id: '6', category: 'Cold Chills', name: 'Apple Blood Frappe', price: '$4.95',
    desc: 'Best-seller beverage of the year! Frappucino full of apples all around!'},
  {id: '7', category: 'Cold Chills', name: 'Orange Blossom Iced Tea', price: '$4.20',
    desc: 'For summertime! Orange-flavored cold tea topped with a blossom flower!'},
  {id: '8', category: 'Best-Selling Meals', name: 'Grape Fairy Pie', price: '$3.50',
    desc: 'Good for 1, this sweetening pie full of grapes is good pairing with our most popular drinks!'},
  {id: '9', category: 'Best-Selling Meals', name: 'Blueberry Lung Muffin', price: '$2.65',
    desc: 'Want something very light to eat? Try our blueburry stuffed muffin topped with blueberry sauce!'},
];

export default function MenuScreen() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setMenuItems(coffeeMenu);
    setLoading(false);
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
      <Text style={styles.title}>☕ Coffee Menu</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.desc}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FDF6EE',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3E1F00',
  },
  card: {
    backgroundColor: '#FFF8F2',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
  marginTop: 8,
  fontWeight: 'bold',
  color: '#1A4D2E',
  },
});
