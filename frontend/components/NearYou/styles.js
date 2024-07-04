import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 750,
    },
    title: {
        color: "white"
    },
    thoughtsContainer: {
        backgroundColor: "#211F1F",
        paddingHorizontal: 18,
        paddingTop: 15,
        paddingBottom: 20,
        width: "100%",
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        gap: 21,
    },
    thoughtText: {
        color: "white",
        width: "90%"
    },
    inactiveThoughtText: {
        color: "#ffffff82",
        width: "90%",
    },
    sectionTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "600"
    },
    thoughtBubble: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
        backgroundColor: "#2C2C2C",
        paddingHorizontal: 25,
        paddingTop: 15,
        paddingBottom: 10,
        borderBottomRightRadius: 18,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        borderWidth: 1,
        borderColor: "#ffffff1e",
    },
    thoughtBubbleTopContainer: {
        position: "relative"
    },
    username: {
        color: "white",
        fontWeight: "600",
        marginBottom: 7
    },
    arrowDown: {
        width: 15,
        height: 18,
    },
    arrowUp: {
        width: 15,
        height: 18,
        transform: [{ rotate: '180deg' }],
    },
    metadataContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    likeCount: {
        color: "white",
        paddingHorizontal: 5
    },
    createdAt: {
        color: "#ffffff8c",
        fontSize: 8
    },
    parkedText: {
        color: "yellow",
        fontSize: 8
    },
    likeCountContainer: {
        height: 20,
        paddingRight: 7,
        borderWidth: 1,
        backgroundColor: "#202124",
        borderRadius: 40,
        display: "flex",
        flexDirection: "row",
        gap: 2,
        borderColor: "#ffffff1e",
    },
    heartContainer: {
        width: 18,
        height: 18,
        borderRadius: 20,
        backgroundColor: "#FBD157",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inactiveHeartContainer: {
        width: 18,
        height: 18,
        borderRadius: 20,
        backgroundColor: "#3E3E3E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    heartIcon: {
        width: 13,
        height: 13,
        alignSelf: "center",
    },
    postThoughtContiner: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        marginBottom: 24
    },
    inputTopContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10
    },
})

export default styles;