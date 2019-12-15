import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const ProfileEditScreen = props => {
  const [inputValue, setInputValue] = useState(
    props.navigation.getParam("value")
  );
  const key = props.navigation.getParam("key");
  const onSave = props.navigation.getParam("onSave");
  console.log(onSave);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setInputValue(text)}
        value={inputValue}
      />
      <Button
        title="Save"
        onPress={() => {
          onSave({
            key: key,
            value: inputValue
          });
          props.navigation.navigate("Profile");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 15
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    marginTop: 30,
    marginBottom: 20
  }
});

export default ProfileEditScreen;
