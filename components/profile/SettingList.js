import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const SettingList = props => {
  exportUserData(props);
  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            props.navigation.navigate("ProfileEdit", {
              key: "name",
              value: props.userData.name,
              onSave: updateUser
            })
          }
        >
          <View style={styles.listItem}>
            <Text style={styles.keyText}>Name</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>{props.userData.name + "  "}</Text>
              <Icon name="ios-arrow-forward" size={24} color="#888" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            props.navigation.navigate("ProfileEdit", {
              key: "username",
              value: props.userData.name,
              onSave: updateUser
            })
          }
        >
          <View style={styles.listItem}>
            <Text style={styles.keyText}>Username</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>
                {props.userData.username + "  "}
              </Text>
              <Icon name="ios-arrow-forward" size={24} color="#888" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            props.navigation.navigate("ProfileEdit", {
              key: "phone",
              value: props.userData.name,
              onSave: updateUser
            })
          }
        >
          <View style={styles.listItem}>
            <Text style={styles.keyText}>Phone Number</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>
                {props.userData.phone + "  "}
              </Text>
              <Icon name="ios-arrow-forward" size={24} color="#888" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            props.navigation.navigate("ProfileEdit", {
              key: "email",
              value: props.userData.name,
              onSave: updateUser
            })
          }
        >
          <View style={styles.listItem}>
            <Text style={styles.keyText}>Email</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>
                {props.userData.email + "  "}
              </Text>
              <Icon name="ios-arrow-forward" size={24} color="#888" />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={props.onLogOut}>
          <View style={styles.listItem}>
            <Text style={styles.keyText}>Sign out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 10
  },
  listItem: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center"
  },
  keyText: {
    fontSize: 20
  },
  valueText: {
    fontSize: 18,
    color: "#888",
    flexDirection: "row",
    alignItems: "center"
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});

var userData = {};

const exportUserData = props => {
  userData = props.userData;
};

const updateUser = updateData => {
  var updateDataF = {};
  updateDataF[updateData.key] = updateData.value;
  const updatedUserData = {
    ...userData,
    ...updateDataF
  };
  console.log(updatedUserData);
};

export default SettingList;
