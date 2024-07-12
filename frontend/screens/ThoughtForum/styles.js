import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#252525",
        paddingVertical: 50,
        flex: 1
    },
    thoughtContainer: {
        borderColor: "white",
        borderBottomWidth: 0.2,
        borderBottomColor: "lightgray",
        paddingBottom: 20,
        paddingHorizontal: 18
    },
    thoughtUsernameContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    thoughtUsername: {
        marginBottom: 12,
        color: "white"
    },
    thoughtContent: {
        color: "white",
        fontSize: 12,
        color: "gray"
    },
    commentThoughtContainer: {
        marginTop: 20,
        paddingHorizontal: 18
    },
    commentThoughtInput: {

    },
    commentInput: {
        color: "white",
        fontSize: 12
    },
    commentContainer: {
        marginBottom: 18
    },
    commentsContainer: {
        paddingHorizontal: 18,
    },
    commentsTitle: {
        fontSize: 20,
        marginTop: 16,
        color: "white"
    },
    commentsSection: {
        marginTop: 14
    },
    author: {
        color: "white",
        fontWeight: "500"
    },
    comment: {
        color: "white",
        marginTop: 8
    },
    likes: {
        marginRight: 50,
        color: "yellow",
    },
    replyContainer: {
        marginBottom: 12
    },
    reply: {
        color: "white"
    }
})

export default styles;