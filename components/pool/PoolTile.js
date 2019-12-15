import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PoolTile = props => {
  const iconColorStyle = {
    backgroundColor: props.poolData.iconColor
  };
  return (
    <View style={styles.container}>
      <Text style={styles.statText}>{props.poolData.value}</Text>
      <Text style={styles.titleText}>{props.poolData.title}</Text>
      <View style={[styles.iconWrapper, iconColorStyle]}>
        <Icon name={props.poolData.iconName} size={22} color="#ddd" />
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    backgroundColor: "yellow",
    margin: 5,
    justifyContent: "flex-end",
    padding: 5
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

export default PoolTile;
