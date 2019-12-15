import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import Navigator from "./components/navigators/TabNavigator";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    setLoggedIn(false);
  };
  if (loggedIn) {
    return (
      <View style={{flex: 1}}>
        <Navigator screenProps={{phone: phone, logOut: logOut}}/>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder={'Phone'}
          style={{margin: 10}}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={'Password'}
          style={{margin: 10}}
        />
        <Button title="Sign in" onPress={logIn} />
      </View>
    )
  }
};
