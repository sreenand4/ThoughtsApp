import React, { useState, useEffect } from "react";
import styles from './styles'
import { Text, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(false);

    const navigation = useNavigation();

    const handlePress = async () => {
        if (username) {
            try {
                const response = await axios.get(`http://localhost:4000/endpoints/users/${username}`);
                setError(false);
                const userId = response.data.userId;
                navigation.navigate('Main', { userId, username });
            } catch (err) {
                console.log(err.message);
            }
        } else {
            setError(true)
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter Username:</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            {error && <Text style={styles.error}>Please enter a valid uername</Text>}
            <Button title="Continue" onPress={handlePress} />
        </View>
    )
}

export default Signin;