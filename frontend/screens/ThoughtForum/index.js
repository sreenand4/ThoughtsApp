import React, { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import thumbIcon from "../../assets/thumbsUp.png"
import thumbIconFill from '../../assets/hand.thumbsup.fill.png'

const ThoughtForum = () => {
    const [content, setContent] = useState("");
    const [liked, setLiked] = useState(false);
    const [replied, setReplied] = useState(false);
    const [commentId, setCommentId] = useState("");
    const route = useRoute();
    const navigation = useNavigation();
    const { thought, userId, username } = route.params;

    const commentsData = [
        {
            id: "1",
            parentThoughtId: thought.id,
            author: "jordandeeds",
            comment: "This is a comment",
            likeCount: 255,
        },
        {
            id: "2",
            parentThoughtId: thought.id,
            author: "sreem",
            comment: "This is another comment",
            likeCount: 118,
        },
    ]

    const commentOnThought = async (thought) => {
        try {
            const comment = await axios.post(`http://localhost:4000/endpoints/comments/commentOnThought/${thought.id}`, {
                content: content,
                authorId: userId,
                authorUsername: username,
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>Go back</Text>
            </TouchableOpacity>
            <View style={styles.thoughtContainer}>
                <Text style={styles.thoughtUsername}>{thought.username}</Text>
                <Text style={styles.thoughtContent}>{thought.content}</Text>
            </View>
            <View style={styles.commentThoughtContainer}>
                <TextInput multiline={true} style={styles.commentInput} placeholder="Comment on this thought..." placeholderTextColor={"gray"} onChangeText={setContent} />
                <TouchableOpacity onPress={() => commentOnThought(thought)}>
                    <Text>Submit</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.commentsContainer}>
                <Text style={styles.commentsTitle}>Comments</Text>
                <View style={styles.commentsSection}>
                    {commentsData.map((comment, index) => (
                        <View key={index} style={styles.commentContainer}>
                            <Text style={styles.author}>{comment.author}</Text>
                            <Text style={styles.comment}>{comment.comment}</Text>
                            <View style={{ flexDirection: "row", marginTop: 12 }}>
                                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                    <TouchableOpacity>
                                        <Image source={thumbIconFill} style={{ width: 16, height: 16 }} />
                                    </TouchableOpacity>
                                    <Text style={styles.likes}>{comment.likeCount}</Text>
                                </View>
                                <TouchableOpacity style={styles.replyContainer}>
                                    <Text style={styles.reply}>Reply</Text>
                                </TouchableOpacity>
                            </View>
                            {replied &&
                                <View>
                                    <TextInput multiline={true} placeholder="Reply to this comment..." placeholderTextColor={"gray"} />
                                </View>
                            }
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default ThoughtForum;