import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import firebase from "firebase";
import { Button } from "react-native-elements";

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
    title: "Add New Game"
  };

  writeGame() {
    const title = this.state.title;
    const genre = this.state.genre;
    const antal = this.state.antal;
    const aldersgruppe = this.state.aldersgruppe;

    firebase
      .database()
      .ref("BoardGames/")
      .push({
        title,
        genre,
        antal,
        aldersgruppe
      })
      .then(data => {
        alert("Game created successfully");
      })
      .catch(error => {
        //error callback
        console.log("error ", error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          label="Game Title"
          placeholder="Game Title"
          value={this.state.title}
          onChangeText={title => this.setState({ title })}
        />
        <TextInput
          label="Game Genre"
          placeholder="Game Genre"
          value={this.state.genre}
          onChangeText={genre => this.setState({ genre })}
        />
        <TextInput
          label="Antal Spillere"
          placeholder="Antal Spillere"
          value={this.state.antal}
          onChangeText={antal => this.setState({ antal })}
        />
        <TextInput
          label="Aldersgruppe"
          placeholder="Aldersgruppe"
          value={this.state.aldersgruppe}
          onChangeText={aldersgruppe => this.setState({ aldersgruppe })}
        />

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <Button
          title="Add new Game"
          style={styles.buttonStyle}
          onPress={this.writeGame.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center"
  },

  buttonStyle: {
    backgroundColor: "rgba(92, 99,216, 1)",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
});
