import React, { Component, useState } from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TextInput
} from "react-native";
import { Header } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { RNS3 } from "react-native-aws3";

export default class AddPostModal extends Component {
  state = {
    image: null,
    text: ""
  };

  render() {
    const props = this.props;
    let { image } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visable}
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <View style={styles.modalBody}>
            <Header
              leftComponent={
                <Button
                  title="Cancel"
                  color="white"
                  onPress={() => {
                    props.onSetVisable();
                    this.clearInput();
                  }}
                />
              }
              centerComponent={
                <Text style={styles.headerCenterText}>Add New</Text>
              }
              rightComponent={
                <Button
                  title="Post"
                  color="white"
                  onPress={() => {
                    props.onSetVisable();
                    this.clearInput();
                  }}
                />
              }
            />
            <View style={styles.modalContent}>
              <View style={styles.uploadImage}>
                <Button
                  title="Pick an image from camera roll"
                  onPress={this._pickImage}
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
              <View style={styles.textInputContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={text => {
                    this.setState({ text: text });
                  }}
                  value={this.state.text}
                  multiline
                />
              </View>
            </View>
            <Text>Hello World!</Text>
          </View>
        </View>
      </Modal>
    );
  }

  clearInput() {
    // clear the input
    this.setState({ image: null, text: "" });
  }

  postLog() {
    var image = this.state.image;
    const text = this.state.text;
    const date = new Date();
    const ext = image.uri.split(".")[-1];
    image["name"] = "ashley-" + date.getTime() + "." + ext;
    console.log(image);
    const options = {
      bucket: "cloud-project-log-pic",
      region: "us-east-1",
      accessKey: "AKIA4DYHWUTBMWY73UQF ",
      secretKey: "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"
    };
    console.log("updating");
    RNS3.put(image, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log(response.body);
    });
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log("hi");
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modalBody: {
    backgroundColor: "#f2f2f2",
    flex: 1
  },
  headerCenterText: {
    fontSize: 20,
    color: "white"
  },
  modalContent: {
    flex: 1,
    margin: 5,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "stretch"
  },
  uploadImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInputContainer: {
    flex: 1,
    alignItems: "stretch"
  },
  textInput: {
    height: 150,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "white",
    fontSize: 16
  }
});
