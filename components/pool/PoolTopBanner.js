import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PoolTopBanner = props => {
  console.log(props);
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.percentText}>
          {props.poolToday["Completion Ratio"]}
        </Text>
        <Text style={styles.leftText}>Workout</Text>
        <Text style={styles.leftText}>Completion</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.dayText}>{getDayOfWeek()}</Text>
        <Text style={styles.dateText}>{getDate()}</Text>
        <Text style={styles.rightText}>
          Reward Pool #{props.poolToday["Pool Number"]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#eee",
    height: 200,
    marginBottom: 5
  },
  left: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  percentText: {
    fontSize: 60
  },
  leftText: {
    fontSize: 16,
    color: "#444"
  },
  right: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 40,
    flex: 1
  },
  dayText: {
    fontSize: 35
  },
  dateText: {
    fontSize: 20
  },
  rightText: {
    fontSize: 16,
    color: "#444"
  }
});

const getDayOfWeek = () => {
  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const date = new Date();
  return dayList[date.getDay()];
};

const getDate = () => {
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
  const date = new Date();
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return monthNames[monthIndex] + " " + day + " " + year;
};

export default PoolTopBanner;
