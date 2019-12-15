import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileTile = props => {
  return (
    <View style={styles.container}>
      <Text>ProfileTile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProfileTile;
