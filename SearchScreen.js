import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://192.168.0.185:5000/search?q=${query}`);
            setResults(response.data.results); // Assuming the API response structure is similar to the one used in HomeScreen
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search here..."
                value={query}
                onChangeText={setQuery}
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={results}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
    },
    title: {
        marginLeft: 10,
        alignSelf: 'center',
    },
});

export default SearchScreen;
