import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import PoolListItem from "./PoolListItem";

const PoolList = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>Previous Reward Pools</Text>
      <FlatList
        keyExtractor={(item, index) => Math.random()}
        data={props.poolList.reverse()}
        renderItem={itemData => (
          <View style={styles.listItem}>
            <PoolListItem poolData={itemData} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    alignSelf: "stretch",
    marginVertical: 10,
    paddingTop: 5
  },
  sectionHeader: {
    fontSize: 16,
    paddingLeft: 15,
    paddingVertical: 5
  }
});

export default PoolList;
