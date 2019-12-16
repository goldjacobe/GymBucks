import React, { useState } from "react";
import { View, TextInput, Text, Button, Image } from "react-native";
import Navigator from "./components/navigators/TabNavigator";
import apigClientFactory from "./apig/apigClient";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [error, setError] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [phone, setPhone] = useState("3106223581");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null)

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

    if (image) { 
      const imageUri = image;
      const uriSplit = imageUri.split(".");
      const ext = uriSplit[uriSplit.length - 1];
      const name = uid + "." + ext
      const type = "image/" + ext;
      const im = {
        name: name,
        type: type,
        uri: imageUri
      }
      const options = {
        bucket: "cloud-project-user-profile-pic",
        region: "us-east-1",
        accessKey: "AKIA4DYHWUTBMWY73UQF ",
        secretKey: "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"
      };
      console.log("UPLOADING")

      RNS3.put(im, options).then(response => {console.log(response)});
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
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder={"Phone"}
          style={{ margin: 10 }}
        />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={"Name"}
          style={{ margin: 10 }}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"Password"}
          style={{ margin: 10 }}
        />
        <TextInput
          value={confirm}
          onChangeText={setConfirm}
          placeholder={"Confirm password"}
          style={{ margin: 10 }}
        />
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <Button
            title="Pick a profile image from camera roll"
            onPress={pickImage}
          />
          <View>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
          </View>
        </View>

        <Button title="Sign up" onPress={signUpPressed} />
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Cancel" onPress={cancel} />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder={"Phone"}
          style={{ margin: 10 }}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"Password"}
          style={{ margin: 10 }}
        />
        <Button title="Sign in" onPress={logIn} />
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Sign up" onPress={startSignUp} />
      </View>
    );
  }
}
