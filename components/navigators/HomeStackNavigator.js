import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import { Header } from "react-native/Libraries/NewAppScreen";
import ScheduleScreen from "../screens/ScheduleScreen";

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home"
    })
  },
  Schedule: {
    screen: ScheduleScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Schedule"
    })
  }
});

export default HomeStackNavigator;
