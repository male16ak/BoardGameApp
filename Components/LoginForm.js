import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  View,
  ImageBackground
} from "react-native";
import firebase from "firebase";
import SignUpForm from "./SignUpForm";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
      hasLogin: true
    };
  }

  // Metode til at authentikere med firebase med email og password.

  signIn() {
    const { email, password } = this.state;

    this.setState({ error: "", loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));

    global.bruger = this.state.email;
  }

  onLoginSuccess() {
    this.setState({ email: "", password: "", loading: false, error: "" });
  }

  onLoginFail(err) {
    this.setState({ loading: false, error: err.message });
  }

  /* 
  Denne render metode benytter sig af en switch der viser Login hvis brugeren har et login, 
  og Sign Up hvis ikke. Her er der vist text input felter hvor brugeren skal skrive deres email og password. 
*/

  render() {
    switch (this.state.hasLogin) {
      case true:
        return (
          <ImageBackground
            source={require("../assets/images/BG.jpg")}
            style={styles.container}
          >
            <View style={styles.container}>
              <Text style={styles.signIn}>Sign in Here</Text>
              <TextInput
                style={styles.inputText}
                label="Username"
                placeholder="your@email.com"
                placeholderTextColor="blue"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="blue"
                style={styles.inputText}
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={password => this.setState({ password })}
              />

              <Text style={styles.errorTextStyle}>{this.state.error}</Text>

              {this.renderButton()}
              <Button
                title="Sign up"
                icon={<Icon name="pencil" size={20} color="white" />}
                style={styles.buttonStyle}
                titleStyle={{ fontWeight: "700" }}
                containerStyle={{ marginTop: 20, width: 300, height: 45 }}
                onPress={() => this.setState({ hasLogin: false })}
              />
            </View>
          </ImageBackground>
        );
      case false: {
        return (
          <ImageBackground
            source={require("../assets/images/BG.jpg")}
            style={styles.container}
          >
            <View>
              <SignUpForm />

              <Button
                style={styles.buttonStyle}
                title="Go Back"
                icon={<Icon name="arrow-left" size={20} color="white" />}
                onPress={() => this.setState({ hasLogin: true })}
                titleStyle={{ fontWeight: "700" }}
                containerStyle={{ marginTop: 20, width: 300, height: 45 }}
              />
            </View>
          </ImageBackground>
        );
      }
    }
  }
  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="small" />;
    }
    return (
      <Button
        style={styles.buttonStyle}
        title="Log in"
        onPress={this.signIn.bind(this)}
        icon={<Icon name="unlock" size={20} color="white" />}
        titleStyle={{ fontWeight: "700" }}
        containerStyle={{ marginTop: 20, width: 300, height: 45 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20
  },

  buttonStyle: {
    backgroundColor: "#03A9F4",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 30
  },
  inputText: {
    margin: 5,
    height: 35,
    borderColor: "black",
    borderWidth: 1,
    fontStyle: "italic",
    width: 300
  },
  signIn: {
    fontSize: 25
  }
});
