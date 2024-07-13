import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import axios from "axios";

import styles from "./styles";

const ReplyComment = ({ parentComment, oReply }) => {
    const [replies, setReplies] = useState([]);
    const [displayCount, setDisplayCount] = useState(5);

    const getReplies = async () => {
        try {
            const fetchedReplies = await axios.get(`http://localhost:4000/endpoints/comments/repliesOnComment/${parentComment._id}`);
            setReplies(fetchedReplies.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getReplies();
    }, [oReply]);

    const handleSeeMore = () => {
        setDisplayCount(prevCount => prevCount + 5);
    };

    const handleSeeLess = () => {
        setDisplayCount(prevCount => prevCount - 5);
    };

    return (
        <View>
            {replies.slice(0, displayCount).map((reply) => (
                <Text key={reply._id} style={{ color: "white", marginLeft: 10, marginBottom: 5 }}>
                    {reply.authorUsername}: {reply.content}
                </Text>
            ))}
            {displayCount < replies.length && (
                <View>
                    <TouchableOpacity onPress={handleSeeMore}>
                        <Text style={{ color: "yellow" }}>See more</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSeeLess}>
                        <Text style={{ color: "Gray" }}>See Less</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default ReplyComment;
