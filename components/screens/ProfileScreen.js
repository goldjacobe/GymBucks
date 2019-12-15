import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import ProfileTopBanner from "../profile/ProfileTopBanner";
import ProfileTile from "../profile/ProfileTile";
import SettingList from "../profile/SettingList";

const ProfileScreen = props => {
  const userData = {
    balance: 10000,
    completed_workout: 100,
    curpollbal: 0,
    curpollnum: 0,
    email: "tw2725@columbia.edu",
    name: "Ashley",
    phone: "3106223581",
    profilepic: "default.png",
    uid: "3106223581",
    username: "ashleywu"
  };
  return (
    <View style={styles.container}>
      <ProfileTopBanner userData={userData} />
      <View style={styles.profileTilesContainer}>
        <View style={styles.profileTilesRow}>
          <ProfileTile
            style={styles.profileTile}
            profileData={{
              title: "Total Earning",
              value: "$132.00",
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

export default ProfileScreen;
