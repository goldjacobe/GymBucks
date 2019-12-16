import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import apigClientFactory from "../../apig/apigClient";

import ProfileTopBanner from "../profile/ProfileTopBanner";
import ProfileTile from "../profile/ProfileTile";
import SettingList from "../profile/SettingList";

const ProfileScreen = props => {
  const [userData, setuserData] = useState({
    balance: 10000,
    completed_workout: 100,
    curpollnum: 0,
    curpollbal: 0
  });
  console.log("PROFILE SCREEN PROPS: ", props);
  get_user(props.screenProps.uid, setuserData);

  return (
    <View style={styles.container}>
      <ProfileTopBanner userData={userData} />
      <View style={styles.profileTilesContainer}>
        <View style={styles.profileTilesRow}>
          <ProfileTile
            style={styles.profileTile}
            profileData={{
              title: "Total Money In Pool ",
              value: userData.curpollbal.toString(),
              iconName: "md-trophy",
              iconColor: "#ea8e50"
            }}
          />
          <ProfileTile
            style={styles.profileTile}
            profileData={{
              title: "Pools Participated In",
              value: userData.curpollnum.toString(),
              iconName: "md-people",
              iconColor: "#ab6d5e"
            }}
          />
        </View>
        <View style={styles.profileTilesRow}>
          <ProfileTile
            style={styles.profileTile}
            profileData={{
              title: "Completed Workouts",
              value: userData.completed_workout.toString(),
              iconName: "md-checkmark",
              iconColor: "#827a60"
            }}
          />
          <ProfileTile
            style={styles.profileTile}
            profileData={{
              title: "My Balance",
              value: "$" + userData.balance.toString(),
              iconName: "md-cash",
              iconColor: "#d1c18d"
            }}
          />
        </View>
      </View>
      <SettingList
        onLogOut={props.screenProps.logOut}
        userData={userData}
        navigation={props.navigation}
      />
    </View>
  );
};

function update_user() {
  var query = document.getElementById("uid").value;

  var apigClient = apigClientFactory.newClient({
    apiKey: "hp3cPqP6Ml9jTtt579YcH7qzQkDtBUUJ4QdQlq7A"
  });

  //you need to input all the current info to update this user in the database
  var params = {
    uid: query,
    name: "Ashley",
    username: "ashleywu",
    phone: "3106223581",
    email: "tw2725@columbia.edu",
    profilepic: "default.png",
    balance: 10000,
    completed_workout: 100,
    curpollnum: 0,
    curpollbal: 0
  };
  apigClient
    .updateinfoPut({}, params, {})
    .then(function(result) {
      //returned response
      // {
      // "statusCode": 200,
      // "body": "\"success\""
      // }
      show_result(result.data);
    })
    .catch(function(result) {
      console.log(result);
    });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  profileTilesContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 5
  },
  profileTilesRow: {
    flexDirection: "row"
  },
  profileTile: {
    flex: 1
  }
});

const get_user = (query, setuserData) => {
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
      setuserData(result.data);
    })
    .catch(function(result) {
      console.log(result);
    });
};

export default ProfileScreen;
