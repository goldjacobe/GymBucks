import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/ProfileScreen";

const ProfileStackNavigator = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Profile"
    })
  }
});

export default ProfileStackNavigator;
