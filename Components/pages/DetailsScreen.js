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
    {
      firebase
      .database()
      .ref("BoardGames")
      .on("value", function(snapshot) {
        global.itemId --;
        global.id = Object.keys(snapshot.val())[parseInt(global.itemId, 10)];
        console.log(global.id);
      })
     }

    Alert.alert("Lej spil", "Er du sikker på du vil leje spillet?", [
      { text: "Nej tak", onPress: () => console.log("Nej tak trykket") },
      { text: "Ja", onPress: () =>
      
    firebase
    .database()
    .ref("BoardGames/" + global.id)
    .update({
      lejer: global.bruger
    })   }
    ]);
  }

  findKey() {

  }
  render() {
    const { navigation } = this.props;
    global.itemId = navigation.getParam("id","Intet id")
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
      <View style={{ backgroundColor: "grey", flex: 1 }}>
        <Card title={title} titleStyle={{ fontSize: 30 }} style={{ flex: 2 }}>
          <Image
            style={{
              width: 310,
              height: 270,
              marginBottom: 15
            }}
            source={{ uri: image }}
          />
          <View style={{ alignItems: "center" }}>
            <Text style={{ marginBottom: 10 }}> Genre: {genre}</Text>
            <Text style={{ marginBottom: 10 }}>
              {" "}
              Anbefalet alder: {aldersgruppe}{" "}
            </Text>
            <Text style={{ marginBottom: 10 }}> Antal spillere: {antal}</Text>
            <Text style={{ marginBottom: 10 }}> Ejer: {ejer}</Text>
          </View>
          <Button
            title="Lej Spil"
            icon={{ name: "check" }}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 30,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            onPress={this.lejSpil}
          />
        </Card>
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
