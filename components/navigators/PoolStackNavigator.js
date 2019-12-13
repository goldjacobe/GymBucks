import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import PoolScreen from "../screens/PoolScreen";

const PoolStackNavigator = createStackNavigator({
  Pool: {
    screen: PoolScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Reward Pool"
    })
  }
});

export default PoolStackNavigator;
