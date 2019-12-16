import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PoolTopBanner = props => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.percentText}>
          {props.poolToday.completion * 100 + "%"}
        </Text>
        <Text style={styles.leftText}>Workout</Text>
        <Text style={styles.leftText}>Completion</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.dayText}>{getDayOfWeek()}</Text>
        <Text style={styles.dateText}>{getDate()}</Text>
        <Text style={styles.rightText}>
          Reward Pool #{getPoolNumber(props.poolToday.date).toString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
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

const getPoolNumber = time => {
  const date = new Date(time);
  const firstDay = new Date("12/10/2019");
  const timeDiff = date.getTime() - firstDay.getTime();
  const poolNumber = timeDiff / (1000 * 3600 * 24);
  return poolNumber;
};

export default PoolTopBanner;
