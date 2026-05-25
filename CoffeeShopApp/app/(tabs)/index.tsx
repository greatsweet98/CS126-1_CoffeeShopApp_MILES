import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';

const menuItems = [
  {id: '1', category: 'Hot Drinks', name: 'Americano', price: '$7.50'},
  {id: '2', category: 'Hot Drinks', name: 'Cappuccino', price: '$9.50'},
  {id: '3', category: 'Hot Drinks', name: 'Latte', price: '$9.75'},
  {id: '4', category: 'Hot Drinks', name: 'Espresso', price: '$12.00'},
  {id: '5', category: 'Cold Drinks', name: 'Iced Coffee', price: '$5.55'},
  {id: '6', category: 'Cold Drinks', name: 'Frappuccino', price: '$7.95'},
  {id: '7', category: 'Best-Selling Meals', name: 'Glazed Donut', price: '$7.00'},
  {id: '8', category: 'Best-Selling Meals', name: 'Oatmeal Raisin Cookie', price: '$7.25'},
];

export default function ScrollView() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>☕ Bonesborough Coffee 🥐</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Button
              title="View Price" onPress={() => Alert.alert(item.price)}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20},
  heading: {fontSize: 27.5, marginBottom: 20},
  item: { marginBottom: 12},
  category: {fontSize: 12, color: '#888'},
  name: {fontSize: 18}
});
