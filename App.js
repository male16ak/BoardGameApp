import React from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import LoginForm from "./Components/LoginForm";
import Home from "./Components/pages/Home";
import firebase from "firebase";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCCOI0XSWfhlcRTpQj_Z-EJ91_EJLNBDJc",
      authDomain: "muchachos-34937.firebaseapp.com",
      databaseURL: "https://muchachos-34937.firebaseio.com",
      projectId: "muchachos-34937",
      storageBucket: "muchachos-34937.appspot.com",
      messagingSenderId: "434387696280"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.container}>
            <Home />
          </View>
        );
      case false:
        return (
          <View style={styles.container}>
            <LoginForm />
          </View>
        );
      default:
        return <ActivityIndicator size="large" />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center"
  }
});
