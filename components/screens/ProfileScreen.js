import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ProfileScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Top banner</Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Sign out" onPress={props.screenProps.logOut} />
      </View>
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

export default ProfileScreen;
