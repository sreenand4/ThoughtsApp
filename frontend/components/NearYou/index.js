import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import heart from '../../assets/heartIcon.png';
import axios from "axios";
import styles from "./styles";

const NearYou = ({ location }) => {
    const [nearbyThoughts, setNearbyThoughts] = useState([]);

    function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const seconds = Math.floor((now - past) / 1000);

        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) {
            return `${interval} years ago`;
        }

        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return `${interval} months ago`;
        }

        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return `${interval} days ago`;
        }

        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return `${interval} hours ago`;
        }

        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return `${interval} minutes ago`;
        }

        return 'just now';
    }

    useEffect(() => {
        const fetchThoughts = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/endpoints/thoughts/nearby`, {
                    params: {
                        longitude: location[0],
                        latitude: location[1]
                    }
                });
                console.log('Full response:', response);
                if (Array.isArray(response.data)) {
                    setNearbyThoughts(response.data);
                } else {
                    console.error('Unexpected data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching nearby thoughts:', error.message);
            }
        };

        if (location.length > 0) {
            fetchThoughts();
        }
    }, []);

    return (
        <View style={styles.container}>
            {location.length === 0 ? (
                <Text style={{ alignSelf: "center", color: "white" }}>{"Location was not permitted"}</Text>
            ) : (
                <>
                    <View style={styles.thoughtsContainer}>
                        {nearbyThoughts.map(thought => (
                            <View key={thought._id} style={styles.thoughtBubble}>
                                <View style={styles.thoughtBubbleTopContainer}>
                                    <Text style={styles.username}>{thought.username}</Text>
                                    <Text style={styles.thoughtText}>{thought.content}</Text>
                                </View>
                                <View style={styles.metadataContainer}>
                                    <View style={styles.likeCountContainer}>
                                        <View style={styles.heartContainer}>
                                            <Image style={styles.heartIcon} source={heart}></Image>
                                        </View>
                                        <Text style={styles.likeCount}>{thought.likeCount}</Text>
                                    </View>
                                    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                        {thought.parked ? (<Text style={styles.parkedText}>parked</Text>) : (<Text style={styles.createdAt}>unparked</Text>)}
                                        <Text style={styles.createdAt}>
                                            {timeAgo(thought.createdAt)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </>
            )}
            <Text style={{ color: "white" }}>location: {location[0]}, {location[1]}</Text>
        </View>
    );
};

export default NearYou;
