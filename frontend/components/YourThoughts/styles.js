import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#252525",
        display: "flex",
        flexDirection: "column",
        gap: 12,
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
        color: "white"
    },
    createdAt: {
        color: "#ffffff8c",
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
        justifyContent: "center"
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
        alignSelf: "center"
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
    username: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    postButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: 30,
        backgroundColor: "white",
        borderRadius: 25
    },
    input: {
        color: "white",
        width: "100%",
        height: 20,
        height: 75,
        fontSize: 16,
        paddingRight: 10
    },
    inputBottomContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        width: "100%",
        marginBottom: 12
    },
    parkText: {
        color: "white",
    },
    date: {
        color: "white",
    },
    delete: {
        color: "#ff0000b5",
        fontSize: 8
    }

})

export default styles;