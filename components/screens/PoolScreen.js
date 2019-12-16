import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import apigClientFactory from "../../apig/apigClient";

import PoolTopBanner from "../pool/PoolTopBanner";
import PoolList from "../pool/PoolList";
import PoolTile from "../pool/PoolTile";

const PoolScreen = props => {
  const [poolState, setpoolState] = useState({
    poolList: [],
    poolToday: {
      completion: 1,
      date: "1/1/2021",
      participants: 0,
      pool_value: 0,
      expected: 0
    },
    balance: 0
  });

  get_state(props.screenProps.uid, setpoolState);

  return (
    <View style={styles.container}>
      <PoolTopBanner
        style={styles.poolTopBanner}
        poolToday={poolState.poolToday}
      />
      <View style={styles.poolTilesContainer}>
        <View style={styles.poolTilesRow}>
          <PoolTile
            style={styles.poolTile}
            poolData={{
              title: "Current Pool Value",
              value: poolState.poolToday["pool_value"].toString(),
              iconName: "md-checkmark",
              iconColor: "#bfdf8e"
            }}
          />
          <PoolTile
            style={styles.poolTile}
            poolData={{
              title: "Total Participants",
              value: poolState.poolToday.participants.toString(),
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
              value: poolState.poolToday.expected.toString(),
              iconName: "md-trophy",
              iconColor: "#d2b2d5"
            }}
          />
          <PoolTile
            style={styles.poolTile}
            poolData={{
              title: "My Balance",
              value: poolState.balance,
              iconName: "md-cash",
              iconColor: "#97cbeb"
            }}
          />
        </View>
      </View>
      <PoolList style={styles.poolList} poolList={poolState.poolList} />
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

const get_state = (query, setpoolState) => {
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

      var poolList = result.data;
      const poolTodayT = poolList[0];
      poolList.shift();
      const poolToday = get_expected_earning(poolTodayT);

      // get balance
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
          setpoolState({
            poolList: poolList,
            poolToday: poolToday,
            balance: result.data.balance
          });
        })
        .catch(function(result) {
          console.log(result);
        });
    })
    .catch(function(result) {
      console.log(result);
    });
};

const get_expected_earning = poolData => {
  if (poolData.participants * poolData.completion == 0) {
    poolData["expected"] = 0;
  } else {
    poolData["expected"] =
      (poolData.pool_value * (1 - poolData.completion)) /
      (poolData.participants * poolData.completion);
  }
  return poolData;
};

export default PoolScreen;
