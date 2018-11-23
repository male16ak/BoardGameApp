import React from "react";
import { Image, Alert, View, StyleSheet, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: "Details"
  };

  lejSpil() {
    Alert.alert("Lej spil", "Er du sikker på du vil leje spillet?", [
      { text: "Nej tak", onPress: () => console.log("Nej tak trykket") },
      { text: "Ja", onPress: () => console.log("Ja trykket"), style: "cancel" }
    ]);
  }

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "No title");
    const genre = navigation.getParam("genre", "No genre defined");
    const aldersgruppe = navigation.getParam(
      "aldersgruppe",
      "Ingen aldersgrænse"
    );
    const image = navigation.getParam("image", "Intet billede defineret");
    const antal = navigation.getParam("antal", "Intet specificerede antal");
    const ejer = navigation.getParam("ejer", "Ingen specificerede ejer");

    return (
      <View>
        <Card title={title}>
          <Image
            style={{ width: 310, height: 300, marginBottom: 15 }}
            source={{ uri: image }}
          />
          <Text style={{ marginBottom: 10 }}> Genre: {genre}</Text>
          <Text style={{ marginBottom: 10 }}>
            {" "}
            Anbefalet alder: {aldersgruppe}{" "}
          </Text>
          <Text style={{ marginBottom: 10 }}> Antal spillere: {antal}</Text>
          <Text style={{ marginBottom: 10 }}> Ejer: {ejer}</Text>

          <Button
            icon={{ name: "code" }}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="Lej Spil"
          />
        </Card>
        <Image style={{ width: 105, height: 135 }} source={{ uri: image }} />

        <Text>Titel: {title}</Text>
        <Text>Genre: {genre}</Text>
        <Text>Anbefalet alder: {aldersgruppe} </Text>
        <Text>Antal spillere: {antal}</Text>
        <Text>Ejer: {ejer}</Text>

        <Button
          icon={<Icon name="arrow-right" size={15} color="white" />}
          title="lej spil"
          onPress={this.lejSpil}
        />
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
