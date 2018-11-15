import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import firebase from "firebase";

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: "Details"
  };

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "No title");
    const genre = navigation.getParam("genre", "No genre defined");

    return (
      <View>
        <Text>Titlen på albummet er: {title}</Text>
        <Text>Genren på spillet er: {genre}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "rgba(92, 99,216, 1)",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
});
