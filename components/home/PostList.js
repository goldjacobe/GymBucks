import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import PostItem from "./PostItem";

class PostList extends React.Component {
  render() {
    const postDataList = [
      {
        postId: "0001",
        userId: "jonhisfun",
        userName: "john",
        content: "This is the content of a post",
        image: "",
        time: "11-12-2019",
        likes: "10"
      },
      {
        postId: "0002",
        userId: "daveisfunnnnn",
        userName: "Dave",
        content:
          "This is the content of a post test.This is the content of a post test.This is the content of a post test.This is the content of a post test.This is the content of a post test.",
        image: "",
        time: "11-18-2019",
        likes: "20"
      },
      {
        postId: "0003",
        userId: "Jisherehaha",
        userName: "Aidenbear",
        content: "This is the content of a post from aiden",
        image: "",
        time: "11-16-2019",
        likes: "0"
      },
      {
        postId: "0004",
        userId: "Jisherehaha",
        userName: "Aidenbear",
        content: "This is the content of a post from aiden",
        image: "",
        time: "11-16-2019",
        likes: "0"
      }
    ];
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => item.postId}
          data={postDataList}
          renderItem={itemData => (
            <View style={styles.listItem}>
              <PostItem postData={itemData} />
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "blue"
  },
  listItem: {}
});

export default PostList;