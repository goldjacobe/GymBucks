import React, { Component } from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Button
} from "react-native";
import { Header } from "react-native-elements";

const AddPostModal = props => {
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
                onPress={props.onSetVisable}
              />
            }
            centerComponent={
              <Text style={styles.headerCenterText}>Add New</Text>
            }
            rightComponent={
              <Button title="Post" color="white" onPress={props.onSetVisable} />
            }
          />
          <View style={styles.modalContent}></View>
          <Text>Hello World!</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  },
  modalBody: {
    backgroundColor: "blue",
    flex: 1
  },
  headerCenterText: {
    fontSize: 20,
    color: "white"
  },
  modalContent: {
    flex: 1,
    margin: 5,
    backgroundColor: "yellow"
  }
});

export default AddPostModal;
