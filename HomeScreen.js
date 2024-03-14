import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [animes, setAnimes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.0.185:5000/top-airing');
                if (response.data.error && response.data.error === "Content div not found") {
                    navigation.navigate('Error');
                    return;
                }
                setAnimes(response.data.results);
            } catch (error) {
                console.error(error);
                navigation.navigate('Error');
            }
        };

        fetchData();
    }, []);

    const totalPages = Math.ceil(animes.length / itemsPerPage);
    const currentPageItems = animes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <View style={styles.container}>
            <FlatList
                data={currentPageItems}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
                        <View style={styles.listItem}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                // Adds padding at the bottom to avoid overlap with pagination controls
                contentContainerStyle={{ paddingBottom: 50 }}
            />
            <View style={styles.paginationContainer}>
                <Button
                    title="Prev"
                    onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                />
                <Text style={styles.pageInfo}>Page {currentPage} of {totalPages}</Text>
                <Button
                    title="Next"
                    onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures the container uses full height
    },
    listItem: {
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
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        position: 'absolute', // Positions pagination controls at the bottom
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white', // Ensures visibility against any background
    },
    pageInfo: {
        alignSelf: 'center', // Centers page info text vertically
    },
});

export default HomeScreen;
