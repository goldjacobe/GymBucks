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
import { RNS3 } from "react-native-aws3";

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
    setImage(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
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
    var imgName = "default.png";
    if (image) {
      console.log("image: ", image);
      const imageUri = image;
      const uriSplit = imageUri.split(".");
      const ext = uriSplit[uriSplit.length - 1];
      imgName = phone + "." + ext;
      const type = "image/" + ext;
      const im = {
        name: imgName,
        type: type,
        uri: imageUri
      };
      const options = {
        bucket: "cloud-project-user-profile-pic",
        region: "us-east-1",
        accessKey: "AKIA4DYHWUTBMWY73UQF ",
        secretKey: "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"
      };
      console.log("UPLOADING");

      RNS3.put(im, options).then(response => {});
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
          if (image) {
            params = {
              uid: phone
            };
            apigClient
              .searchinfoGet(params)
              .then(function(result) {
                // returned result
                // {
                //   "uid" : "3106223581",
                //   "name" : "Ashley",
                //   "username" : "ashleywu",
                //   "phone" : "3106223581",
                //   "email" : "tw2725@columbia.edu",
                //   "profilepic":"default.png",
                //   "balance" : 10000,
                //   "completed_workout" : 100,
                //   "curpollnum":0,
                //   "curpollbal":0
                // }
                console.log("updating profile picture!!!!!!");
                params = result.data;
                params.profilepic = imgName;
                apigClient
                  .updateinfoPut({}, params, {})
                  .then(function(result) {
                    //returned response
                    // {
                    // "statusCode": 200,
                    // "body": "\"success\""
                    // }
                    console.log(result.data);
                  })
                  .catch(function(result) {
                    console.log(result);
                  });
              })
              .catch(function(result) {
                console.log(result);
              });
          }

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
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.7}
            style={{
              height: 100,
              width: 100,
              backgroundColor: "white",
              borderRadius: 100,
              marginBottom: 20
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 100 }}
              />
            )}
          </TouchableOpacity>
        </View>
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
