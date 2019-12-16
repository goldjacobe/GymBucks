import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import PoolTopBanner from "../pool/PoolTopBanner";
import PoolList from "../pool/PoolList";
import PoolTile from "../pool/PoolTile";
import apigClientFactory from "../../apig/apigClient";

const PoolScreen = props => {
  const [poolList, setpoolList] = useState([]);
  const [poolToday, setpoolToday] = useState({});

  get_pool(props.screenProps.uid, setpoolList, setpoolToday);

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
              value: poolToday["Expected Earning"],
              iconName: "md-trophy",
              iconColor: "#d2b2d5"
            }}
          />
          <PoolTile
            style={styles.poolTile}
            poolData={{
              title: "My Balance",
              value: poolToday["Balance"],
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
      case "expected":
        poolDataF["Expected Earning"] = "$" + value;
        break;
      case "balance":
        poolDataF["Balance"] = "$" + value;
        break;
      default:
        break;
    }
  }
  return poolDataF;
};

const get_balance = query => {
  var apigClient = apigClientFactory.newClient({
    apiKey: "hp3cPqP6Ml9jTtt579YcH7qzQkDtBUUJ4QdQlq7A"
  });
  var params = {
    uid: query
  };
  apigClient
    .searchinfoGet(params)
    .then(function(result) {
      // returned result
      // {
      //   "uid" : "3106223581",
      //   "name" : "Ashley",
      //   "username" : "ashleywu",
      //   "phone" : "3106223581",
      //   "email" : "tw2725@columbia.edu",
      //   "profilepic":"default.png",
      //   "balance" : 10000,
      //   "completed_workout" : 100,
      //   "curpollnum":0,
      //   "curpollbal":0
      // }
      console.log("balance: ", result.data.balance);
      return result.data.balance;
    })
    .catch(function(result) {
      console.log(result);
    });
};

const get_today_stats = (poolToday, uid) => {
  balance = get_balance(uid);
  if (poolToday.participants * poolToday.completion == 0) {
    expected = 0;
  } else {
    expected =
      (poolToday.pool_value * (1 - poolToday.completion)) /
      (poolToday.participants * poolToday.completion);
  }

  poolToday["expected"] = expected;
  poolToday["balance"] = balance;
  return poolToday;
};

const get_pool = (query, setpoolList, setpoolToday) => {
  var apigClient = apigClientFactory.newClient({
    apiKey: "hp3cPqP6Ml9jTtt579YcH7qzQkDtBUUJ4QdQlq7A"
  });
  var params = {};
  apigClient
    .poolstatGet(params)
    .then(function(result) {
      // returned a list of pool info
      // {
      //   "pool_value": 20,
      //   "date": "12/14/2019",
      //   "participants": 1,
      //   "completion": 0.5
      // }
      var poolList = result.data.reverse();
      const poolToday = poolList.pop();
      setpoolList(formatPoolList(poolList));
      setpoolToday(formatPoolData(get_today_stats(poolToday, query)));
    })
    .catch(function(result) {
      console.log(result);
    });
};

export default PoolScreen;
