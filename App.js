import React, { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import Navigator from "./components/navigators/TabNavigator";
import apigClientFactory from "./apig/apigClient"

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState("3106223581");
  const [password, setPassword] = useState("123");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");

  const logIn = () => {
    var apigClient = apigClientFactory.newClient({
      apiKey: "hp3cPqP6Ml9jTtt579YcH7qzQkDtBUUJ4QdQlq7A"
    });
    var params = {
      phone: phone,
      password: password
    };
    apigClient
      .signinGet(params)
      .then(function(result) {
        // This is executed if get a 200 response
        if (result.data) { // Check to make sure that log in was successful
          setError(false);
          setLoggedIn(true);
        } else {
          setError(true);
        }
      })
      .catch(function(result) {
        setError(true);
        console.log(result);
      });
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
        {error && <Text style={{color: 'red'}}>Invalid login</Text>}
      </View>
    )
  }
};
