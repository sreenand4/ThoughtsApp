import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Animated, ScrollView } from 'react-native';
import styles from './styles'
import LogoHeader from '../../components/LogoHeader';
import { useRoute, useNavigation } from '@react-navigation/native';
import YourThoughts from '../../components/YourThoughts'
import NearYou from '../../components/NearYou'
import axios from "axios";

const Home = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { userId, username } = route.params;
    const [title, setTitle] = useState("Your Thoughts");
    const [titleId, setTitleId] = useState("1");

    const highlightPosition = useRef(new Animated.Value(0)).current;

    const section = [
        {
            id: "1",
            title: "Your Thoughts"
        },
        {
            id: "2",
            title: "Near You"
        }
    ]

    const titleIdFunc = (id, title) => {
        setTitleId(id);
        setTitle(title);
        Animated.spring(highlightPosition, {
            toValue: id === "1" ? 0 : 1,
            useNativeDriver: true
        }).start();
    }

    const highlightStyle = {
        transform: [
            {
                translateX: highlightPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 170]
                })
            }
        ]
    }

    return (
        <View style={styles.container}>
            <LogoHeader />
            <View style={styles.navigator}>
                <Animated.View style={[styles.highlight, highlightStyle]} />
                {section.map((data, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => titleIdFunc(data.id, data.title)}
                        style={styles.navigatorText}
                    >
                        <Text style={{ color: data.id == titleId ? "black" : "white" }}>
                            {data.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {title === "Your Thoughts" && <YourThoughts userId={userId} username={username} />}
                {title === "Near You" && <NearYou />}
            </ScrollView>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Go back</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Home;