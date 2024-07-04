import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import heart from "../../assets/heartIcon.png";

const NearYou = ({ userId, username, location }) => {
    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <View style={styles.container}>
            {location.length === 0 ? (
                <Text style={{ alignSelf: "center", color: "white" }}>{"Location was not permitted"}</Text>
            ) : (
                <>
                    <View style={styles.thoughtsContainer}>
                        {location && (
                            <Text style={{ color: "white", textAlign: "center" }}>
                                Latitude: {location[1]}, Longitude: {location[0]}
                            </Text>
                        )}
                    </View>
                </>
            )}
        </View>
    );
};

export default NearYou;
