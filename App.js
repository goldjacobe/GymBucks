import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Navigator from "./components/navigators/TabNavigator";
import apigClientFactory from "./apig/apigClient";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { RNS3 } from "react-native-aws3";
import { withTheme } from "react-native-elements";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");

  const [image, setImage] = useState(null);

  const reset = () => {
    setError("");
    setPassword("");
    setConfirm("");
    setName("");
  };

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
        if (result.data) {
          // Check to make sure that log in was successful
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
  };
  const cancel = () => {
    setSignUp(false);
  };
  const signUpPressed = () => {
    if (password != confirm) {
      setError("Password mismatch");
      return;
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
        if (result.data) {
          // Check to make sure that log in was successful
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
  };

  if (loggedIn) {
    return (
      <View style={{ flex: 1 }}>
        <Navigator screenProps={{ uid: phone, logOut: logOut }} />
      </View>
    );
  } else if (signUp) {
    return (
      <ScrollView
        contentContainerStyle={styles.loginView}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text style={styles.logoSignup}>GymBucks</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder={"Phone"}
          style={styles.inputField}
        />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={"Name"}
          style={styles.inputField}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"Password"}
          style={styles.inputField}
        />
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder={"Confirm password"}
          style={styles.inputField}
        />
        <TouchableOpacity
          onPress={signUpPressed}
          style={styles.signupViewButton}
          activeOpacity={0.8}
        >
          <Text style={styles.signinButtonText}>Sign up</Text>
        </TouchableOpacity>
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Cancel" onPress={cancel} color="grey" />
      </ScrollView>
    );
  } else {
    return (
      <ScrollView
        contentContainerStyle={styles.loginView}
        keyboardShouldPersistTaps={"handled"}
      >
        <Text style={styles.logoLogin}>GymBucks</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder={"Phone"}
          style={styles.inputField}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"Password"}
          style={styles.inputField}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={logIn}
            style={styles.signinButton}
            activeOpacity={0.8}
          >
            <Text style={styles.signinButtonText}>Sign in</Text>
          </TouchableOpacity>
          <View style={styles.signupButtonContainer}>
            <Button title="Sign up" onPress={startSignUp} color="grey" />
          </View>
        </View>
        <Text style={{ color: "red" }}>{error}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  logoLogin: {
    fontSize: 50,
    marginBottom: 100
  },
  logoSignup: {
    fontSize: 50,
    marginBottom: 50
  },
  loginView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    paddingHorizontal: 50
  },
  inputField: {
    backgroundColor: "white",
    width: "90%",
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 40,
    fontSize: 16
  },
  signinButton: {
    marginTop: 20,
    backgroundColor: "green",
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  signupViewButton: {
    marginTop: 20,
    backgroundColor: "#933a16",
    height: 40,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  signinButtonText: {
    color: "white",
    fontSize: 18
  },
  signupButtonContainer: {
    marginTop: 10
  }
});
