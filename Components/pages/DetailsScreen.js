import React from "react";
import {
  Image,
  Alert,
  View,
  StyleSheet,
  Text,
  ImageBackground
} from "react-native";
import { Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";

//View der vises når brugeren klikker på et spil han/hun vil leje

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: "Details"
  };
  //metoder der bruges når man vil leje et spil. Kalder først LejSpil, som lejer spillet i databasen
  //derefter kaldes sendNotification som sender en notifikation til udlejren om spillet er lejet.

  databaseUdlejning =() => {
   this.lejSpil();
   this.sendNotification();

  }

  //Metoden der sender en noti, når et spil bliver udlejet
  sendNotification () {
    const spil = this.props.navigation.getParam("title");
    const afsender = global.bruger;
    const modtager = this.props.navigation.getParam("ejer");
    const type = "Udlejning"
    const spilId = global.id
    const besked = "Dit spil " + this.props.navigation.getParam("title") + " er blevet lejet af " + this.props.navigation.getParam("ejer");

    firebase
      .database()
      .ref("Notifications/")
      .push({
        spil,
        afsender,
        modtager,
        type,
        spilId,
        besked

      })
      .then(data => {
        console.log("Notification created successfully");
      })}

      //Metoden til spillejningen. MInder meget om vores sletspil i GamesForRent. Spillet bliver bare ikke slettet her
      //men i steddet for bliver der ændret på lejer attributen i databssen.

  lejSpil() {
    {
      firebase
        .database()
        .ref("BoardGames")
        .on("value", function(snapshot) {
          global.itemId--;
          global.id = Object.keys(snapshot.val())[parseInt(global.itemId, 10)];
          console.log(global.id);
        });
    }


    

    Alert.alert("Lej spil", "Er du sikker på du vil leje spillet?", [
      { text: "Nej tak", onPress: () => console.log("Nej tak trykket") },
      {
        text: "Ja",
        onPress: () =>

        firebase
        .database()
        .ref("BoardGames/" + global.id)
        .update({
          lejer: global.bruger
        })
       },
    ])
  }

  
//Vores render metode. Bruger ligesom GameForREntScreen card tag til at vise de spil brugeren kan leje.
  render() {
    const { navigation } = this.props;
    global.itemId = navigation.getParam("id", "Intet id");
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
      <ImageBackground
        source={require("../../assets/images/BG.jpg")}
        style={styles.container}
      >
        <View style={{ flex: 1 }}>
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
              icon={<Icon name="check" size={20} color="white" />}
              buttonStyle={{
                backgroundColor:"#03A9F4",
                borderRadius: 30,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              onPress={this.databaseUdlejning}
            />
          </Card>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#03A9F4",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  container: {
    flex: 1
  }
});
