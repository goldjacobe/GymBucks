import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

import PostList from "../PostList";
import AddPostModal from "../AddPostModal";
export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const switchModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <PostList />
      <AddPostModal visable={modalVisible} onSetVisable={switchModalVisible} />
      <ActionButton
        buttonColor="#1abc9c"
        title="Add Post"
        onPress={() => {
          setModalVisible(true);
          console.log(modalVisible);
        }}
      >
        <Icon name="md-done-all" style={styles.actionButtonIcon} />
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
