import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Navigator from "./components/navigators/TabNavigator";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    setLoggedIn(false);
  };
  if (loggedIn) {
    return (
      <View style={{flex: 1}}>
        <Navigator screenProps={{hello: "hello", what: 1, logOut: logOut}}/>
      </View>
    );
  } else {
    return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Button title="Sign in" onPress={logIn}></Button></View>
  }
};
