import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button } from 'react-native';
import styles from "./styles";
import heart from '../../assets/heartIcon.png';
import arrowDown from '../../assets/arrowDown.png';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';


const YourThoughts = ({ userId, username, location }) => {
    const [activeThoughts, setActiveThoughts] = useState([]);
    const [inactiveThoughts, setInactiveThoughts] = useState([]);
    const [activeUnparkedThoughts, setActiveUnparkedThoughts] = useState([]);
    const [content, setContent] = useState("");
    const [parked, setParked] = useState(false);
    const [active, setActive] = useState(true);

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

    const fetchData = async () => {
        try {
            const activeResponse = await fetch(`http://localhost:4000/endpoints/thoughts/${userId}/active`);
            const inactiveResponse = await fetch(`http://localhost:4000/endpoints/thoughts/${userId}/inactive`);
            const activeUnparkedResponse = await fetch(`http://localhost:4000/endpoints/thoughts/${userId}/active/unparked`);

            if (activeResponse.ok && inactiveResponse.ok && activeUnparkedResponse.ok) {
                const activeThoughtsJson = await activeResponse.json();
                const inactiveThoughtsJson = await inactiveResponse.json();
                const activeUnparkedResponseJson = await activeUnparkedResponse.json()
                setActiveThoughts(activeThoughtsJson);
                setInactiveThoughts(inactiveThoughtsJson);
                setActiveUnparkedThoughts(activeUnparkedResponseJson);
            } else {
                console.error('Faied to fetch thoughts:', activeResponse.status, inactiveResponse.status);
            }
        } catch (error) {
            console.error('Error fetching thoughts:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const postThought = async () => {
        try {
            if (content) {
                let location = await Location.getCurrentPositionAsync({});
                const coords = [location.coords.longitude, location.coords.latitude];
                const response = await axios.post(`http://localhost:4000/endpoints/thoughts/createThought`, {
                    userId,
                    username,
                    content,
                    active,
                    parked,
                    location: {
                        type: "Point",
                        coordinates: coords,
                    },
                    expireAt: "04/21/2025",
                    likeCount: 0,
                });
                if (response.status === 200) {
                    Toast.show({
                        type: 'success',
                        text1: 'Thought posted successfully!',
                    });
                    setContent("");
                    setParked(false);
                    setActive(true);
                    fetchData();
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to post thought',
                    });
                }
            }
        } catch (error) {
            console.error('Error posting thought:', error.message);
            Toast.show({
                type: 'error',
                text1: 'Error posting thought',
            });
        }
    };

    const deleteThought = async (thoughtId) => {
        try {
            const response = await axios.delete(`http://localhost:4000/endpoints/thoughts/${thoughtId}`);
            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Thought deleted successfully!',
                });
                fetchData();
            } else {
                console.error('Failed to delete thought. Status:', response.status);
                Toast.show({
                    type: 'error',
                    text1: 'Failed to delete thought',
                });
            }
        } catch (error) {
            console.error('Error deleting thought:', error.message);
            Toast.show({
                type: 'error',
                text1: 'Error deleting thought',
            });
        }
    };

    const patchActiveStatus = async (thoughtId, desiredStatus) => {
        try {
            const response = await axios.patch(`http://localhost:4000/endpoints/thoughts/${thoughtId}/${desiredStatus}`)
            if (response.status === 200) {
                fetchData();
            } else {
                console.error('Failed to delete thought. Status:', response.status);
            }
        } catch (error) {
            console.error('Error patching thought:', error.message);
        }
    }

    useEffect(() => {
        const patchLocation = async () => {
            try {
                await Promise.all(activeUnparkedThoughts.map(async (thought) => {
                    const { _id } = thought;
                    let currentLocation = await Location.getCurrentPositionAsync({});
                    const coords = [currentLocation.coords.longitude, currentLocation.coords.latitude];
                    await axios.patch(`http://localhost:4000/endpoints/thoughts/${_id}`, {
                        newLocation: {
                            coordinates: coords,
                        }
                    });
                }));
                console.log("Successfully updated all active unparked thoughts");
            } catch (error) {
                console.log('Error patching thought:', error.message);
            }
        };

        if (activeUnparkedThoughts.length > 0) {
            patchLocation();
        }
    }, [activeUnparkedThoughts]);



    return (
        <View style={styles.container}>
            <View style={styles.postThoughtContainer}>
                <View style={styles.inputTopContainer}>
                    <Text style={styles.username}>Hey, {username}</Text>
                    <TouchableOpacity style={styles.postButton} onPress={postThought}>
                        <Text>Post</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    multiline
                    style={styles.input}
                    placeholder="What's on your mind..."
                    placeholderTextColor={"#ffffffa6"}
                    value={content}
                    onChangeText={setContent} />
                <View style={styles.inputBottomContainer}>
                    <TouchableOpacity onPress={() => setActive(!active)}>
                        <Text style={styles.parkText}>{active ? "Posting as active" : "Posting as inactive"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.parkText}>|</Text>
                    <TouchableOpacity onPress={() => setParked(!parked)}>
                        <Text style={styles.parkText}>{parked ? "Unpark" : "Park"}</Text>
                    </TouchableOpacity>
                    <Text style={styles.parkText}>|</Text>
                    <Text style={styles.date}>Expiry date: 04/21/2025</Text>
                </View>
            </View>

            <View style={styles.thoughtsContainer}>
                <Text style={styles.sectionTitle}>Actively thinking</Text>
                {activeThoughts.map(thought => (
                    <View key={thought._id} style={styles.thoughtBubble}>
                        <View style={styles.thoughtBubbleTopContainer}>
                            <Text style={styles.thoughtText}>{thought.content}</Text>
                            <TouchableOpacity style={{ position: "absolute", top: "0%", right: "0%" }} onPress={() => patchActiveStatus(thought._id, false)}>
                                <Image style={styles.arrowDown} source={arrowDown} />
                            </TouchableOpacity>
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
                                <TouchableOpacity onPress={() => deleteThought(thought._id)}>
                                    <Text style={styles.delete}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.thoughtsContainer}>
                <Text style={styles.sectionTitle}>In memory</Text>
                {inactiveThoughts.map(thought => (
                    <View key={thought._id} style={styles.thoughtBubble}>
                        <View style={styles.thoughtBubbleTopContainer}>
                            <Text style={styles.inactiveThoughtText}>{thought.content}</Text>
                            <TouchableOpacity onPress={() => patchActiveStatus(thought._id, true)} style={{ position: "absolute", top: "0%", right: "0%" }}>
                                <Image style={styles.arrowUp} source={arrowDown} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.metadataContainer}>
                            <View style={styles.likeCountContainer}>
                                <View style={styles.inactiveHeartContainer}>
                                    <Image style={styles.heartIcon} source={heart}></Image>
                                </View>
                                <Text style={styles.likeCount}>{thought.likeCount}</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                {thought.parked ? (<Text style={styles.createdAt}>parked</Text>) : (<Text style={styles.createdAt}>unparked</Text>)}
                                <Text style={styles.createdAt}>
                                    {timeAgo(thought.createdAt)}
                                </Text>
                                <TouchableOpacity onPress={() => deleteThought(thought._id)}>
                                    <Text style={styles.delete}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
            <Text style={{ color: "white" }}>location: {location[0]}, {location[1]}</Text>
        </View>
    );
}

export default YourThoughts;
