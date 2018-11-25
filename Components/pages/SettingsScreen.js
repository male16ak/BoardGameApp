import React from "react";
import { View, Linking, ImageBackground, StyleSheet } from "react-native";
import { Text, Button, SocialIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import firebase from "firebase";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Settings"
  };
  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/BG.jpg")}
        style={styles.container}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}
        >
          <View style={{ flex: 3 }}>
            <Button
              title="Go to Home"
              icon={<Icon name="home" size={20} color="white" />}
              buttonStyle={{
                backgroundColor:"#03A9F4",
                height: 50,
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
                borderRadius: 30,
                marginBottom: 10
              }}
              onPress={() => this.props.navigation.navigate("Home")}
            />

            <Button
              title="Log Out"
              icon={<Icon name="sign-out" size={20} color="white" />}
              buttonStyle={{
                backgroundColor:"#03A9F4",
                height: 50,
                borderRadius: 30,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 10
              }}
              onPress={() => firebase.auth().signOut()}
            />
          </View>

          <SocialIcon
            title="Like us on Facebook"
            button
            raised={true}
            type="facebook"
            onPress={() =>
              Linking.openURL("https://www.facebook.com/ronnie.gejl")
            }
          />

          <SocialIcon
            title="Follow us on Twitter"
            button
            type="twitter"
            raised={true}
          />

          <SocialIcon
            title="Like us on Instagram"
            button
            light
            type="instagram"
            raised={true}
            onPress={() =>
              Linking.openURL("https://www.instagram.com/ronniegejl/?hl=da")
            }
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
