import React from "react";
import { View, Button, Text } from "react-native";
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
