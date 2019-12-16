import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import PoolListItem from "./PoolListItem";

const PoolList = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Previous Reward Pools</Text>
      <FlatList
        keyExtractor={(item, index) => item["Pool Number"].toString()}
        data={props.poolList.reverse()}
        renderItem={itemData => (
          <View style={styles.listItem}>
            <PoolListItem poolData={itemData} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    alignSelf: "stretch",
    paddingTop: 5,
    flex: 1
  },
  sectionHeader: {
    fontSize: 16,
    paddingLeft: 15,
    paddingVertical: 5,
    fontWeight: "bold",
    color: "#666"
  }
});

export default PoolList;
