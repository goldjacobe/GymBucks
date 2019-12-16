import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { getPlaneDetection } from "expo/build/AR";

const PoolListItem = props => {
  const poolData = props.poolData.item;
  return (
    <View style={styles.container}>
      <View style={styles.topBlock}>
        <Text style={{ fontSize: 18 }}>{getDate(poolData.date)}</Text>
        <Text style={{ color: "#666" }}>
          Reward Pool #{getPoolNumber(poolData.date).toString()}
        </Text>
      </View>
      <View style={styles.bottomBlock}>
        <View style={styles.bottomBlockItem}>
          <Text style={{ fontSize: 20 }}>
            {"$" + poolData.pool_value.toString()}
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>Total Pool Value</Text>
        </View>
        <View style={styles.bottomBlockItem}>
          <Text style={{ fontSize: 20 }}>
            {poolData.participants.toString()}
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            Total Participants
          </Text>
        </View>
        <View style={styles.bottomBlockItem}>
          <Text style={{ fontSize: 20 }}>
            {poolData.completion * 100 + "%"}
          </Text>
          <Text style={{ fontSize: 14, color: "#666" }}>Completion Ratio</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 5,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  topBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  bottomBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 5
  },
  bottomBlockItem: {
    alignItems: "center"
  }
});

const getPoolNumber = time => {
  const date = new Date(time);
  const firstDay = new Date("12/10/2019");
  const timeDiff = date.getTime() - firstDay.getTime();
  const poolNumber = timeDiff / (1000 * 3600 * 24);
  return poolNumber;
};

const getDate = time => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const date = new Date(time);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return monthNames[monthIndex] + " " + day + " " + year;
};

export default PoolListItem;
