import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

class PostItem extends React.Component {
  render() {
    const post = this.props.postData.item;

    return (
      <View style={styles.container}>
        <View style={styles.postProfilePicContainer}>
          <Image
            source={require("../../assets/default.png")}
            style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />
        </View>
        <View style={styles.postBody}>
          <View style={styles.header}>
            <Text style={styles.userName}>{post.userName}</Text>
            <Text>{"  "}</Text>
            <Text style={styles.userId}>{"@" + post.userId}</Text>
          </View>
          <View>
            <View style={styles.postContent}>
              <Text>{post.content}</Text>
            </View>
            <View style={styles.postImageContainer}>
              <Image
                source={require("../../assets/default.png")}
                style={styles.postImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={{ color: "#888" }}>{post.time}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: "flex-start"
  },
  postProfilePicContainer: {
    paddingTop: 5,
    paddingRight: 10
  },
  postBody: {
    flex: 1
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
  postImageContainer: {
    height: 180
  },
  postImage: {
    flex: 1,
    width: 300,
    marginVertical: 3
  },
  footer: {
    marginVertical: 3,
    alignItems: "flex-end",
    paddingRight: 10
  }
});

export default PostItem;
