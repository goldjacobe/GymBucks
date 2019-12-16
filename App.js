import React, { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import Navigator from "./components/navigators/TabNavigator";
import apigClientFactory from "./apig/apigClient"

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");

  const reset = () => {
    setPhone("");
    setError("");
    setPassword("");
    setConfirm("")
    setName("");
  }

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
          reset();
          setLoggedIn(true);
        } else {
          reset();
          setError("Invalid login");
        }
      })
      .catch(function(result) {
        setError("Invalid response");
        console.log(result);
      });
  };
  const logOut = () => {
    setLoggedIn(false);
  };
  const startSignUp = () => {
    setSignUp(true);
    setError(false);
  }
  const cancel = () => {
    setSignUp(false);
  }
  const signUpPressed = () => {
    if (password != confirm) {
      setError("Password mismatch")
      return
    }

    var apigClient = apigClientFactory.newClient({
      apiKey: "hp3cPqP6Ml9jTtt579YcH7qzQkDtBUUJ4QdQlq7A"
    });
    var params = {
      phone: phone,
      password: password,
      name: name
    };
    apigClient
      .signupGet(params)
      .then(function(result) {
        // This is executed if get a 200 response
        if (result.data) { // Check to make sure that log in was successful
          setLoggedIn(true);
          setSignUp(false);
          reset();
        } else {
          reset();
          setError("You already have an account");
        }
      })
      .catch(function(result) {
        setError("Invalid response");
        console.log(result);
      });

  }

  if (loggedIn) {
    return (
      <View style={{flex: 1}}>
        <Navigator screenProps={{phone: phone, logOut: logOut}}/>
      </View>
    );
  } else if (signUp) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder={'Phone'}
        style={{margin: 10}}
      />
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={'Name'}
        style={{margin: 10}}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder={'Password'}
        style={{margin: 10}}
      />
      <TextInput
        value={confirm}
        onChangeText={setConfirm}
        placeholder={'Confirm password'}
        style={{margin: 10}}
      />
      <Button title="Sign up" onPress={signUpPressed} />
      <Text style={{color: 'red'}}>{error}</Text>
      <Button title="Cancel" onPress={cancel} />
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
        <Text style={{color: 'red'}}>{error}</Text>
        <Button title="Sign up" onPress={startSignUp} />
      </View>
    )
  }
};
