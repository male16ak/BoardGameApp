import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Alert
} from "react-native";
import firebase from "firebase";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

//Pagen hvor vi tilføjer nye spil.
export default class AddNewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      genre: "",
      antal: "",
      aldersgruppe: "",
      error: ""
    };
  }

  static navigationOptions = {
    title: "Add a Board Game"
  };

  //Metoden der opretter den nye spil i databasen
  //Bruger værdierne fra tekstboksene, gemmer dem som variable og bruger disse variable til oprettelse af
  //boardGame objektet.

  writeGame() {
    
    const title = this.state.title;
    const genre = this.state.genre;
    const antal = this.state.antal;
    const aldersgruppe = this.state.aldersgruppe;
    const id = global.antalSpil.toString();
    const ejer = global.bruger;
    const lejer = "tom"
    

    if (title === "" || genre === "" || antal === "" || aldersgruppe === "") {
      Alert.alert("Fejl", "Du skal udfylde alle felter");

      this.setState({
        title: "",
        genre: "",
        antal: "",
        aldersgruppe: "",
        error: ""
      });
    } else
      firebase
        .database()
        .ref("BoardGames/")
        .push({
          title,
          genre,
          antal,
          aldersgruppe,
          id,
          ejer,
          lejer
        })
        .then(data => {
          alert("Game created successfully");
          this.setState({
            title: "",
            genre: "",
            antal: "",
            aldersgruppe: "",
            error: ""
          });
        })
        .catch(error => {
          console.log("error ", error);
        });
  }
//REnder metode. Består af en baggrund og en masse textInputs, som bruges til oprettelsen af et spil.
  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/BG.jpg")}
        style={styles.container}
      >
        <View style={styles.container}>
          <TextInput
            style={styles.inputText}
            placeholderTextColor="black"
            label="Game Title"
            placeholder="Game Title"
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <TextInput
            style={styles.inputText}
            placeholderTextColor="black"
            label="Game Genre"
            placeholder="Genre"
            value={this.state.genre}
            onChangeText={genre => this.setState({ genre })}
          />
          <TextInput
            style={styles.inputText}
            placeholderTextColor="black"
            label="Antal Spillere"
            placeholder="Antal Spillere"
            value={this.state.antal}
            onChangeText={antal => this.setState({ antal })}
          />
          <TextInput
            style={styles.inputText}
            placeholderTextColor="black"
            label="Aldersgruppe"
            placeholder="Aldersgruppe"
            value={this.state.aldersgruppe}
            onChangeText={aldersgruppe => this.setState({ aldersgruppe })}
          />

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          <Button
            icon={<Icon name="plus-circle" size={20} color= 'white'></Icon>}
            title="Add New Game"
            style={styles.buttonStyle}
            onPress={this.writeGame.bind(this)}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonStyle: {
    backgroundColor: "rgba(92, 99,216, 1)",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    width: 300
  },
  inputText: {
    margin: 5,
    height: 35,
    borderColor: "black",
    borderWidth: 1,
    fontStyle: "italic",
    width: 300,
    textAlign: "center"
  }
});
