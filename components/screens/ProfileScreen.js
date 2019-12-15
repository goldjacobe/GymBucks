import React from "react";
import { View, Button } from "react-native";

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Sign out" onPress={this.props.screenProps.logOut}/>
      </View>
    );
  }
}

export default ProfileScreen;
