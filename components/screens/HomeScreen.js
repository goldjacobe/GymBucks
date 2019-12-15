import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PostList from "../PostList";
import PostBtn from "../PostBtn";
import ScheduleRow from "../schedule/ScheduleRow";
import { TouchableHighlight } from "react-native-gesture-handler";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate("Schedule")}>
          <ScheduleRow />
        </TouchableHighlight>
        <PostList />
        <PostBtn />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "red"
  }
});

export default HomeScreen;
