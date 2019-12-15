import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class PostItem extends React.Component {
  render() {
    const post = this.props.postData.item;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text>{"  "}</Text>
          <Text style={styles.userId}>{"@" + post.userId}</Text>
        </View>
        <View>
          <View style={styles.postContent}>
            <Text>{post.content}</Text>
          </View>
          <View>
            <Image style={styles.postImage} />
          </View>
        </View>
        <View style={styles.footer}>
          <Text>{post.time}</Text>
          <Text>{"  "}</Text>
          <Text>{post.likes + " likes"}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    padding: 5,
    marginVertical: 5
  },
  header: {
    flexDirection: "row",
    marginVertical: 3
  },
  userName: {
    fontWeight: "bold"
  },
  userId: {
    color: "grey"
  },
  postContent: {
    marginVertical: 3
  },
  postImage: {
    height: 100,
    borderWidth: 1,
    marginVertical: 3
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "green",
    marginVertical: 3,
    direction: "rtl"
  }
});

export default PostItem;
