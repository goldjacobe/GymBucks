import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Button } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import { Header } from "react-native/Libraries/NewAppScreen";

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home",
      headerRight: () => (
        <Button
          title="Notifications"
          onPress={() => navigation.navigate("Notifications")}
        />
      )
    })
  },
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Notifications"
    })
  }
});

export default HomeStackNavigator;
