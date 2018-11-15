import React from "react";
import {Image, Alert, View, StyleSheet, Text } from "react-native";
import {Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from "firebase";

export default class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: "Details"
  };
  
  
  lejSpil () {
  Alert.alert(
    'Lej spil',
    'Er du sikker på du vil leje spillet?',
    [
      {text: 'Nej tak', onPress: () => console.log("Nej tak trykket")},
      {text: 'Ja', onPress: () => console.log("Ja trykket"), style: 'cancel'},
    ]
  )
  }

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "No title");
    const genre = navigation.getParam("genre", "No genre defined");
    const aldersgruppe = navigation.getParam("aldersgruppe","Ingen aldersgrænse" )
    const image = navigation.getParam("image", "Intet billede defineret")

    return (
      <View>
        <Text>Titel: {title}</Text>
        <Text>Genre: {genre}</Text>
        <Text>Antal spillere: {aldersgruppe} </Text>
        <Image style={{ width: 65, height: 65 }}
                source={{ uri: image }}></Image>
        <Button
  icon={
        <Icon
        name='arrow-right'
        size={15}
        color='white'/>
      }
        title='lej spil'
        onPress = {this.lejSpil}
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
