import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

class PostItem extends React.Component {
  render() {
    return (
      <ActionButton
        buttonColor="#1abc9c"
        title="Add Post"
        onPress={() => {
          console.log("btn pressed");
        }}
      >
        <Icon name="md-done-all" style={styles.actionButtonIcon} />
      </ActionButton>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});

export default PostItem;
