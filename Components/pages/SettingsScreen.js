import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import firebase from "firebase";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}
      >
        <Text>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate("Details")}
        />

        <Button title="Log Out" onPress={() => firebase.auth().signOut()} />
      </View>
    );
  }
}
