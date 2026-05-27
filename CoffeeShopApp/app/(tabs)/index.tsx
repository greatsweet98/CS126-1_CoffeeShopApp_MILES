import { View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const menuItems = [
  {id: '1', category: 'Hot Beverages', name: 'Classic Brewed Coffee', price: '$2.00',
    desc: 'Our classic coffee brewed from brown Bonesborough beans!'},
  {id: '2', category: 'Hot Beverages', name: 'Blueberry Lung Latte', price: '$5.15',
    desc: '?'},
  {id: '3', category: 'Hot Beverages', name: 'Vanilla Magical Cappucino', price: '$3.95',
    desc: '?'}, 
  {id: '4', category: 'Hot Beverages', name: 'Lemon Elixir Tea', price: '$3.45',
    desc: '?'},
  {id: '5', category: 'Cold Chills', name: 'Apple Blood Frappe', price: '$4.95',
    desc: '?'},
  {id: '6', category: 'Cold Chills', name: 'Orange Blossom Iced Tea', price: '$4.20',
    desc: '?'},
  {id: '7', category: 'Best-Selling Meals', name: 'Grape Fairy Pie', price: '$3.50',
    desc: '?'},
  {id: '8', category: 'Best-Selling Meals', name: 'Blueberry Lung Muffin', price: '$2.65',
    desc: '?'},
];
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>The Menu</Text>

      {/* FlatList renders the menuItems array as a scrollable list */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Detail', { coffee: item })}
          >
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function DetailScreen({ route, navigation }: any) {
  // route.params contains the data we passed when calling navigation.navigate()
  const { coffee } = route.params;

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailCategory}>{coffee.category}</Text>
      <Text style={styles.detailName}>{coffee.name}</Text>
      <Text style={styles.detailPrice}>{coffee.price}</Text>
      <Text style={styles.detailDesc}>{coffee.desc}</Text>

      {/* navigation.goBack() pops this screen off and returns to HomeScreen */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#9c00cc' },
          headerTintColor: '#f7ddff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18},
        }}
      >
        {/* Register our two screens with the Stack */}
        <Stack.Screen name="Menu" component={HomeScreen}   options={{ title: 'Bonesborough Coffee & Park Planet Café'}} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Item Details', headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDF6EE',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e008a',
  },
  item: {
    backgroundColor: '#FFF8F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0059ff',
    shadowColor: '#0059ff',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00757b',
  },
  price: {
    fontSize: 14,
    color: '#00853e',
    marginTop: 4,
  },

  // Detail Screen
  detailContainer: {
    flex: 1,
    padding: 28,
    backgroundColor: '#FDF6EE',
    justifyContent: 'center',
  },
  detailCategory: {
    fontSize: 13,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  detailName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3E1F00',
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 22,
    color: '#C1440E',
    fontWeight: '600',
    marginBottom: 20,
  },
  detailDesc: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: '#3E1F00',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FDF6EE',
    fontSize: 16,
    fontWeight: '600',
  },
});
