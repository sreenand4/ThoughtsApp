import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Button } from 'react-native';
import styles from "./styles";
import heart from '../../assets/heartIcon.png';
import arrowDown from '../../assets/arrowDown.png';
import axios from 'axios';
import Toast from 'react-native-toast-message';


const YourThoughts = ({ userId, username }) => {
    const [activeThoughts, setActiveThoughts] = useState([]);
    const [inactiveThoughts, setInactiveThoughts] = useState([]);
    const [content, setContent] = useState("");
    const [parked, setParked] = useState(false);
    const [active, setActive] = useState(false);

    const fetchData = async () => {
        try {
            const activeResponse = await fetch(`http://localhost:4000/endpoints/thoughts/${userId}/active`);
            const inactiveResponse = await fetch(`http://localhost:4000/endpoints/thoughts/${userId}/inactive`);

            if (activeResponse.ok && inactiveResponse.ok) {
                const activeThoughtsJson = await activeResponse.json();
                const inactiveThoughtsJson = await inactiveResponse.json();

                setActiveThoughts(activeThoughtsJson);
                setInactiveThoughts(inactiveThoughtsJson);

                console.log("Active thoughts:", activeThoughtsJson);
                console.log("Inactive thoughts:", inactiveThoughtsJson);
            } else {
                console.error('Faied to fetch thoughts:', activeResponse.status, inactiveResponse.status);
            }
        } catch (error) {
            console.error('Error fetching thoughts:', error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    const postThought = async () => {
        try {
            if (content) {
                const response = await axios.post(`http://localhost:4000/endpoints/thoughts/${userId}/${encodeURIComponent(content)}/${parked}/${active}`);
                if (response.status === 200) {
                    Toast.show({
                        type: 'success',
                        text1: 'Thought posted successfully!',
                    });
                    setContent("");
                    setParked(false);
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
                        <Text style={styles.parkText}>{active ? "Post as active" : "Post as inactive"}</Text>
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
                <Text style={styles.sectionTitle}>Active</Text>
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
                                <Text style={styles.createdAt}>
                                    {thought.createdAt}
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
                <Text style={styles.sectionTitle}>Inactive</Text>
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
                                <Text style={styles.createdAt}>
                                    {thought.createdAt}
                                </Text>
                                <TouchableOpacity onPress={() => deleteThought(thought._id)}>
                                    <Text style={styles.delete}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

export default YourThoughts;
