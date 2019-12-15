import React from "react";
import { View, Text } from "react-native";
import ScheduleRow from "../schedule/ScheduleRow";

class ScheduleScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        backgroundColor: "red"
      }}>
        <ScheduleRow />
      </View>
    );
  }
}

export default ScheduleScreen;
 