import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import ProfileTopBanner from "../profile/ProfileTopBanner";
import ProfileTile from "../profile/ProfileTile";

const ProfileScreen = props => {
  return (
    <View style={styles.container}>
      <ProfileTopBanner />
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
              value: "50",
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
              value: "28",
              iconName: "md-checkmark",
              iconColor: "#827a60"
            }}
          />
          <ProfileTile
            style={styles.profileTile}
            profileData={{
              title: "My Balance",
              value: "$89.55",
              iconName: "md-cash",
              iconColor: "#d1c18d"
            }}
          />
        </View>
      </View>
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
