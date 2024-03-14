import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const AnimeDetailsScreen = ({ route, navigation }) => { // Include navigation here
    const { id } = route.params;
    const [animeDetails, setAnimeDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://192.168.0.185:5000/info/${id}`);
                setAnimeDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDetails();
    }, [id]);

    if (!animeDetails) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView>
            <Image source={{ uri: animeDetails.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{animeDetails.title}</Text>
            <Text style={styles.description}>{animeDetails.description}</Text>
            <Text style={styles.episodeHeader}>Episodes:</Text>
            {animeDetails.episodes.map((episode) => (
                <View key={episode.id} style={styles.card}>
                    <Text style={styles.episodeTitle}>Episode {episode.number}: {episode.title}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('VideoPlayer', { animeid: animeDetails.id, epid: episode.id })} style={styles.playButton}>
                        <Text style={styles.playButtonText}>Play</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
    },
    description: {
        padding: 10,
    },
    episodeHeader: {
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    episodeTitle: {
        flex: 1,
    },
    playButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    playButtonText: {
        color: '#ffffff',
    },
});

export default AnimeDetailsScreen;
