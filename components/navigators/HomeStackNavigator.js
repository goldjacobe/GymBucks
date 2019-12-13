import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

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
          type="clear"
          icon={<Icon name="ios-mail" size={24} />}
          title=""
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
