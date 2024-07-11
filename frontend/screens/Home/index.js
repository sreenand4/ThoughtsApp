import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Animated, ScrollView } from 'react-native';
import styles from './styles';
import LogoHeader from '../../components/LogoHeader';
import { useRoute, useNavigation } from '@react-navigation/native';
import YourThoughts from '../../components/YourThoughts';
import NearYou from '../../components/NearYou';
import axios from "axios";
import * as Location from 'expo-location';
import { RefreshControl } from "react-native";

const Home = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const highlightPosition = useRef(new Animated.Value(0)).current;
    const { userId, username } = route.params;
    const [title, setTitle] = useState("Your Thoughts");
    const [titleId, setTitleId] = useState("1");
    const [location, setLocation] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const section = [
        {
            id: "1",
            title: "Your Thoughts"
        },
        {
            id: "2",
            title: "Near You"
        }
    ];

    const titleIdFunc = (id, title) => {
        setTitleId(id);
        setTitle(title);
        Animated.spring(highlightPosition, {
            toValue: id === "1" ? 0 : 1,
            useNativeDriver: true
        }).start();
    };

    const highlightStyle = {
        transform: [
            {
                translateX: highlightPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 170]
                })
            }
        ]
    };

    const fetchLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation([currentLocation.coords.longitude, currentLocation.coords.latitude]);
            console.log("location refreshed")
        } catch (error) {
            console.log(`Cannot obtain current location: ${error.message}`);
            console.log("Location error:", error.message);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        fetchLocation();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchLocation();
    }, []);

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
            <ScrollView showsVerticalScrollIndicator={false} showVerticalScrollIndicator={false} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                {title === "Your Thoughts" && <YourThoughts userId={userId} username={username} location={location} />}
                {title === "Near You" && <NearYou userId={userId} username={username} location={location} />}
            </ScrollView>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Go back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;
