import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableHighlight } from "react-native-gesture-handler";

import PostList from "../home/PostList";
import AddPostModal from "../home/AddPostModal";
import ScheduleRow from "../schedule/ScheduleRow";

export default function HomeScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const switchModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight underlayColor='#dddddd' activeOpacity={0.1} onPress={() => props.navigation.navigate("Schedule")}>
        <ScheduleRow uid={props.screenProps.uid}/>
      </TouchableHighlight>
      <PostList uid={props.screenProps.uid} />
      <AddPostModal
        visable={modalVisible}
        onSetVisable={switchModalVisible}
        uid={props.screenProps.uid}
      />
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
    alignItems: "stretch",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
