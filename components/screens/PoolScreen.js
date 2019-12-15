import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PoolTopBanner from "../pool/PoolTopBanner";
import PoolList from "../pool/PoolList";
import PoolTile from "../pool/PoolTile";

const PoolScreen = props => {
  var poolList = [
    {
      completion: 0.3,
      date: "12/12/2019",
      participants: 89,
      pool_value: 234
    },
    {
      completion: 0.46,
      date: "12/13/2019",
      participants: 34,
      pool_value: 545
    },
    {
      completion: 0.5,
      date: "12/14/2019",
      participants: 1,
      pool_value: 5643
    },
    {
      completion: 1,
      date: "12/15/2019",
      participants: 1,
      pool_value: 10
    }
  ];
  poolList = formatPoolList(poolList);
  const poolToday = poolList.pop();
  return (
    <View style={styles.container}>
      <PoolTopBanner style={styles.poolTopBanner} poolToday={poolToday} />
      <View style={styles.poolTilesContainer}>
        <View style={styles.poolTilesRow}>
          <PoolTile
            style={styles.poolTile}
            poolData={{
              title: "Current Pool Value",
              value: poolToday["Total Pool Value"],
              iconName: "md-checkmark",
              iconColor: "#bfdf8e"
            }}
          />
          <PoolTile
            style={styles.poolTile}
            poolData={{
              title: "Total Participants",
              value: poolToday["Total Participants"],
              iconName: "md-people",
              iconColor: "#dcc8c6"
            }}
          />
        </View>
        <View style={styles.poolTilesRow}>
          <PoolTile
            style={styles.poolTile}
            poolData={{
              title: "My Expected Earning",
              value: "$10.52",
              iconName: "md-trophy",
              iconColor: "#d2b2d5"
            }}
          />
          <PoolTile
            style={styles.poolTile}
            poolData={{
              title: "My Balance",
              value: "$89.55",
              iconName: "md-cash",
              iconColor: "#97cbeb"
            }}
          />
        </View>
      </View>
      <PoolList style={styles.poolList} poolList={poolList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  poolTopBanner: {},
  poolTilesContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 5
  },
  poolTilesRow: {
    flexDirection: "row"
  },
  poolTile: {},
  poolList: {}
});

const formatPoolList = poolList => {
  var poolListF = [];
  for (i = 0; i < poolList.length; i++) {
    poolListF.push(formatPoolData(poolList[i]));
  }
  return poolListF;
};

const formatPoolData = poolData => {
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
  var poolDataF = {};
  for (const [key, value] of Object.entries(poolData)) {
    switch (key) {
      case "completion":
        poolDataF["Completion Ratio"] = parseFloat(value) * 100 + "%";
        break;
      case "date":
        const date = new Date(value);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        poolDataF["Date"] = monthNames[monthIndex] + " " + day + " " + year;

        // add pool number
        const firstDay = new Date("12/10/2019");
        const timeDiff = date.getTime() - firstDay.getTime();
        const poolNumber = timeDiff / (1000 * 3600 * 24);
        poolDataF["Pool Number"] = poolNumber.toString();
        break;
      case "participants":
        poolDataF["Total Participants"] = value;
        break;
      case "pool_value":
        poolDataF["Total Pool Value"] = "$" + value;
        break;
      default:
        break;
    }
  }
  return poolDataF;
};

export default PoolScreen;
