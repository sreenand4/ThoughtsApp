import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import axios from "axios";
import heart from "../../assets/heartIcon.png";

const NearYou = ({ userId, username }) => {
    const [activeThoughts, setActiveThoughts] = useState([]);
    const [user, setUser] = useState("");

    useEffect(() => {
        const getAllActiveThoughs = async () => {
            try {
                const activeThoughts = await axios.get(`http://localhost:4000/endpoints/thoughts/active`);
                setActiveThoughts(activeThoughts.data);
            } catch (err) {
                console.log(err.message)
            }
        }
        getAllActiveThoughs();
    }, [activeThoughts])

    return (
        <View style={styles.container}>
            <View style={styles.thoughtsContainer}>
                {activeThoughts.map(thought => (
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
                                <Text style={styles.createdAt}>
                                    {thought.createdAt}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default NearYou

