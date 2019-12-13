import React from "react";
import { Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeStackNavigator from "./HomeStackNavigator";
import PoolStackNavigator from "./PoolStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} name="ios-home" size={24} />
        )
      }
    },
    Pool: {
      screen: PoolStackNavigator,
      navigationOptions: {
        tabBarLabel: "Reward Pool",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} name="ios-trophy" size={24} />
        )
      }
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon color={tintColor} name="ios-person" size={24} />
        )
      }
    }
  },
  {
    // router config
    initialRouteName: "Home",
    order: ["Home", "Pool", "Profile"],
    // navigation options
    navigationOptions: {},
    tabBarOptions: {}
  }
);

export default createAppContainer(TabNavigator);
