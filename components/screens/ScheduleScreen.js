import React from "react";
import { View, Text } from "react-native";
import ScheduleRow from "../schedule/ScheduleRow";
import _ from "lodash"

class ScheduleScreen extends React.Component {
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
      }}>
        {_.map([-1, 0, 1], (w) => <ScheduleRow key={w} week={w} uid={this.props.screenProps.uid}/>)}
      </View>
    );
  }
}

export default ScheduleScreen;
 