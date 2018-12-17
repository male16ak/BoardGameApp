import React, { Component } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ActivityIndicator
} from "react-native";
import firebase from "firebase";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  // Metode til at oprette brugeren med firebase med email og password når brugeren trykker på sign-up.

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({
      error: "",
      loading: true
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(this.onSignUpSuccess.bind(this))
      .catch(this.onSignUpFailed.bind(this));
  }

  onSignUpSuccess() {
    this.setState({
      email: "",
      password: "",
      loading: false,
      error: ""
    });
    alert("User created successfully");
  }

  onSignUpFailed(err) {
    this.setState({
      loading: false,
      error: err.message
    });
  }

  // Denne render metode viser 2 text input felter til brugeren, som kan skrive deres email og password.

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signIn}>Sign up</Text>

        <TextInput
          style={styles.inputText}
          label="Username"
          placeholder="your@email.com"
          placeholderTextColor="blue"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="blue"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
        />
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        {this.renderButton()}
      </View>
    );
  }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size="small" />;
    }
    return (
      <Button
        title="Sign up"
        icon={<Icon name="sign-in" size={20} color="white" />}
        onPress={this.onButtonPress.bind(this)}
        style={styles.buttonStyle}
        titleStyle={{ fontWeight: "700" }}
        containerStyle={{ marginTop: 20, width: 300, height: 45 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyle: {
    backgroundColor: "rgba(92, 99,216, 1)",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
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
