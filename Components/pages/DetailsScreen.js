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
    const artist = navigation.getParam("artist", "No artist defined");

    return (
      <View>
        <Text>Titlen på albummet er: {title}</Text>
        <Text>Kunstneren på albummet er: {artist}</Text>
      </View>
    );
  }
}
