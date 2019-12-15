import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PostList from "../PostList";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PostList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  }
});

export default HomeScreen;
