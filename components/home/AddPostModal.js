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
import apigClientFactory from "../../apig/apigClient";

export default class AddPostModal extends Component {
  state = {
    image: null,
    text: ""
  };

  render() {
    const props = this.props;
    console.log("addpostmodal props: ", props);
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
                    this.postLog();
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
    const uid = this.props.uid;

    // upload image to s3
    var imageUri = this.state.image;
    const text = this.state.text;
    const date = new Date();
    const uriSplit = imageUri.split(".");
    const ext = uriSplit[uriSplit.length - 1];
    const name = uid + "-" + date.getTime() + "." + ext;
    const type = "image/" + ext;
    const image = {
      name: name,
      type: type,
      uri: imageUri
    };
    console.log(image);
    const options = {
      bucket: "cloud-project-log-pic",
      region: "us-east-1",
      accessKey: "AKIA4DYHWUTBMWY73UQF ",
      secretKey: "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"
    };
    RNS3.put(image, options).then(response => {});

    // call post log api
    this.update_log(uid, text, name);
  }

  update_log(uid, content, post_pic) {
    var apigClient = apigClientFactory.newClient({
      apiKey: "hp3cPqP6Ml9jTtt579YcH7qzQkDtBUUJ4QdQlq7A"
    });
    var params = {
      uid: uid,
      content: content,
      post_pic: post_pic
    };
    apigClient
      .updatelogPut({}, params, {})
      .then(function(result) {
        //returned response
        // {
        // "statusCode": 200,
        // "body": "\"success\""
        // }
      })
      .catch(function(result) {
        console.log(result);
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
