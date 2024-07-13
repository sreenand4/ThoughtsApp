import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
import thumbIconFill from '../../assets/hand.thumbsup.fill.png';
import Toast from 'react-native-toast-message';
import ReplyComment from "../../components/ReplyComment";

const ThoughtForum = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { thought, userId, username } = route.params;
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState({});
    const [replyLength, setReplyLength] = useState(0);
    const [replyContents, setReplyContents] = useState({}); // State to store reply contents for each comment
    const [oReply, setOReply] = useState(true);

    const commentOnThought = async (thought) => {
        try {
            if (commentContent) {
                const comment = await axios.post(`http://localhost:4000/endpoints/comments/commentOnThought`, {
                    parentThoughtId: thought._id,
                    authorId: userId,
                    authorUsername: username,
                    content: commentContent,
                    likeCount: 0,
                });
                if (comment.status === 200) {
                    Toast.show({
                        type: 'success',
                        text1: 'Thought posted your comment!',
                    });
                    setCommentContent("");
                    getComments(); // Refresh comments after posting
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Failed to post your comment',
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getComments = async () => {
        try {
            const fetchedComments = await axios.get(`http://localhost:4000/endpoints/comments/commentsOnThought/${thought._id}`);
            setComments(fetchedComments.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getComments();
    }, []);

    const openReplyButton = (commentId) => {
        setReplies((prevReplies) => ({
            ...prevReplies,
            [commentId]: !prevReplies[commentId], // Toggle reply state for the clicked comment ID
        }));
    }

    const replyToComment = async (comment) => {
        try {
            const reply = await axios.post('http://localhost:4000/endpoints/comments/replyToComment', {
                authorId: userId,
                authorUsername: username,
                parentCommentId: comment._id,
                content: replyContents[comment._id] || '',
                likeCount: 0
            });
            if (reply.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'reply posted!',
                });
                handleReplyContentChange(comment._id, "")
                setOReply(!oReply);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to post your reply',
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleReplyContentChange = (commentId, text) => {
        setReplyContents((prevReplyContents) => ({
            ...prevReplyContents,
            [commentId]: text,
        }));
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: 'white', marginLeft: 20, marginBottom: 30 }}>&lt;</Text>
            </TouchableOpacity>
            <View style={styles.thoughtContainer}>
                <Text style={styles.thoughtUsername}>{username}</Text>
                <Text style={styles.thoughtContent}>{thought.content}</Text>
            </View>
            <View style={styles.commentThoughtContainer}>
                <TextInput multiline={true} style={styles.commentInput} placeholder="Comment on this thought..." placeholderTextColor={"gray"} onChangeText={setCommentContent} value={commentContent} />
                <TouchableOpacity onPress={() => commentOnThought(thought)}>
                    <Text style={{ color: "yellow" }}>Submit</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.commentsContainer}
                data={comments}
                keyExtractor={(item) => item._id}
                ListHeaderComponent={<Text style={styles.commentsTitle}>Comments</Text>}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Text style={styles.author}>{item.authorUsername}</Text>
                        <Text style={styles.comment}>{item.content}</Text>
                        <View style={{ flexDirection: "row", marginTop: 12 }}>
                            <TouchableOpacity>
                                <Image source={thumbIconFill} style={{ width: 16, height: 16, marginRight: 15 }} />
                            </TouchableOpacity>
                            <Text style={styles.likes}>{item.likeCount}</Text>
                            <TouchableOpacity style={styles.replyContainer} onPress={() => openReplyButton(item._id)}>
                                <Text style={styles.reply}>{replies[item._id] ? "hide replies" : "reply"}</Text>
                            </TouchableOpacity>
                        </View>
                        {replies[item._id] && (
                            <View>
                                <TextInput
                                    multiline={true}
                                    value={replyContents[item._id] || ''}
                                    placeholder="Reply to this comment..."
                                    placeholderTextColor={"gray"}
                                    onChangeText={(text) => handleReplyContentChange(item._id, text)}
                                    style={{ color: "yellow", marginBottom: 10 }}
                                />
                                <TouchableOpacity onPress={() => replyToComment(item)}>
                                    <Text style={{ color: "yellow", marginBottom: 15 }}>Submit</Text>
                                </TouchableOpacity>
                                {item.replies.length > 0 &&
                                    <ReplyComment parentComment={item} oReply={oReply} />
                                }
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
}

export default ThoughtForum;
