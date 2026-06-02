import { View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const menuItems = [
  {id: '1', category: 'Hot Beverages', name: 'Classic Brewed Coffee', price: '$2.00',
    desc: 'Our classic coffee brewed from brown Bonesborough beans!'},
  {id: '2', category: 'Hot Beverages', name: 'Vanilla Magical Latte', price: '$5.15',
    desc: 'Fresh vanilla latte with a magical sprinkle of colored cocoa powder!'},
  {id: '3', category: 'Hot Beverages', name: 'Blueberry Lung Cappucino', price: '$3.95',
    desc: 'Your day-to-day cappucino filled with blueberries.'}, 
  {id: '4', category: 'Hot Beverages', name: 'Lemon Elixir Tea', price: '$3.45',
    desc: 'A hot tea smothered with fresh lemon in a tea bag!'},
  {id: '5', category: 'Cold Chills', name: 'Apple Blood Frappe', price: '$4.95',
    desc: 'Best-seller beverage of the year! Frappucino full of apples all around!'},
  {id: '6', category: 'Cold Chills', name: 'Orange Blossom Iced Tea', price: '$4.20',
    desc: 'For summertime! Orange-flavored cold tea topped with a blossom flower!'},
  {id: '7', category: 'Best-Selling Meals', name: 'Grape Fairy Pie', price: '$3.50',
    desc: 'Good for 1, this sweetening pie full of grapes is good pairing with our most popular drinks!'},
  {id: '8', category: 'Best-Selling Meals', name: 'Blueberry Lung Muffin', price: '$2.65',
    desc: 'Want something very light to eat? Try our blueburry stuffed muffin topped with blueberry sauce!'},
];
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
  loadMenu();
  }, []);

  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuHeading}>The Menu</Text>

      {/* FlatList renders the menuItems array as a scrollable list */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Detail', { coffee: item })}
          >
            <Text style={styles.menuItemCategory}>{item.category}</Text>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>{item.price}</Text>
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
        <Text style={styles.backButtonText}>← Back to The Menu</Text>
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
  menuContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffecfc',
  },
  menuHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1e008a',
  },
  menuItem: {
    backgroundColor: '#f5e3ff',
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
  menuItemCategory: {
    fontSize: 12,
    color: '#a42e94',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00757b',
  },
  menuItemPrice: {
    fontSize: 14,
    color: '#00853e',
    marginTop: 4,
  },

  // Detail Screen
  detailContainer: {
    flex: 1,
    padding: 28,
    backgroundColor: '#41203c',
    justifyContent: 'center',
  },
  detailCategory: {
    fontSize: 13,
    color: '#ff51e8',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  detailName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7df9ff',
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 22,
    color: '#51c286',
    fontWeight: '600',
    marginBottom: 20,
  },
  detailDesc: {
    fontSize: 16,
    color: '#7e4575',
    lineHeight: 24,
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: '#002e83',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#538fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
