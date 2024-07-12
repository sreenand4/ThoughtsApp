import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#252525",
        width: "100%",
        paddingHorizontal: 17,
        paddingTop: 50
    },
    navigator: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#2C2C2C",
        borderRadius: 25,
        width: "100%",
        height: 44,
        position: "relative",
        marginBottom: 20
    },
    highlight: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#FBD157",
        borderRadius: 25,
        width: "50%",
        zIndex: -1,
    },
    navigatorText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        marginBottom: 16,
        color: "white"
    },
    activeThoughtText: {
        fontSize: 24,
        marginBottom: 16,
        color: "blue",
    },
    inactiveThoughtText: {
        fontSize: 24,
        marginBottom: 16,
        color: "gray",
    }
});

export default styles;
