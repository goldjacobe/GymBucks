import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileTile = props => {
  const iconColorStyle = {
    backgroundColor: props.profileData.iconColor
  };
  return (
    <View style={styles.container}>
      <Text style={styles.statText}>{props.profileData.value}</Text>
      <Text style={styles.titleText}>{props.profileData.title}</Text>
      <View style={[styles.iconWrapper, iconColorStyle]}>
        <Icon name={props.profileData.iconName} size={22} color="#f2f2f2" />
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: "white",
    margin: 5,
    justifyContent: "flex-end",
    padding: 10
  },
  statText: {
    fontSize: 30
  },
  titleText: {
    color: "#888",
    fontSize: 16
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    position: "absolute",
    right: 10,
    top: 10
  }
});

export default ProfileTile;
