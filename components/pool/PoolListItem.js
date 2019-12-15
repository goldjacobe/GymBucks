import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

const PoolListItem = props => {
  const poolData = props.poolData.item;
  console.log(poolData);
  return (
    <View style={styles.container}>
      <View style={styles.topBlock}>
        <Text style={{ fontSize: 18 }}>{poolData["Date"]}</Text>
        <Text style={{ color: "#666" }}>
          Reward Pool #{poolData["Pool Number"]}
        </Text>
      </View>
      <View style={styles.bottomBlock}>
        <View style={styles.bottomBlockItem}>
          <Text style={{ fontSize: 20 }}>{poolData["Total Pool Value"]}</Text>
          <Text style={{ fontSize: 14, color: "#666" }}>Total Pool Value</Text>
        </View>
        <View style={styles.bottomBlockItem}>
          <Text style={{ fontSize: 20 }}>{poolData["Total Participants"]}</Text>
          <Text style={{ fontSize: 14, color: "#666" }}>
            Total Participants
          </Text>
        </View>
        <View style={styles.bottomBlockItem}>
          <Text style={{ fontSize: 20 }}>{poolData["Completion Ratio"]}</Text>
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

export default PoolListItem;
