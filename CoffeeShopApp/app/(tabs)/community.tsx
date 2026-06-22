import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CoffeePost = {
  id: number;
  title: string;
  body: string;
};

export default function CommunityScreen() {
    const [coffeePosts, setCoffeePosts] = useState<CoffeePost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchCoffeeFeed = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setCoffeePosts(data.slice(0, 8)); // limit for mobile
            setError(null);
        } catch (err) {
            setError("Can't connect to coffee community. Check your internet!");
        } finally {
            setLoading(false);
        }
      }
      fetchCoffeeFeed();
    }, []);

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
                <Text>Loading coffee community...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>{error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={coffeePosts}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.feedCard}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.body}>{item.body}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    feedCard: {backgroundColor: '#ffa946'},
    title: {color: '#3E1F00'},
    body: {color: '#147a0b'},
});
