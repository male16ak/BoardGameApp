import React from "react";
import { ActivityIndicator, FlatList, View, Button, Image } from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    //Android viser en warning med en timer. Dette får RN til at ignorere fejlen. Der kan læses mere om fejlen her
    // https://github.com/firebase/firebase-js-sdk/issues/97
    console.ignoredYellowBox = ["Setting a timer"];
  }

  static navigationOptions = {
    title: "Albums"
  };

  componentDidMount() {
    this.getAlbumsFromApiAsync();
    this.getBoardGamesFromApiAsync();
  }

  getBoardGamesFromApiAsync() {
    var that = this;

    return firebase
      .database()
      .ref("BoardGames")
      .on("value", function(snapshot) {
        var boardGames = Object.values(snapshot.val());
        //Brug artist ID til at hente fulde navn og erstat dataen.
        //Da dataen i øvelserne kun er fra Taylor Swift, går vi bare ind i første object i Arrayet,
        //da vi ved alle objekter har samme artist. Er der forskellige, kan man loope igennem arrayet og erstatte variabler
        var artistID = albums[0].artist;

        //Lav et nyt database-kald:
        firebase
          .database()
          .ref("artists/" + artistID)
          .once("value", function(snapshotArtist) {
            //loop over albums og erstat
            albums.forEach(function(album) {
              album.artist =
                snapshotArtist.val().firstName +
                " " +
                snapshotArtist.val().lastName;
            });
            that.setState({
              isLoading: false,
              dataSource: albums
            });
          });
      });
  }

  getAlbumsFromApiAsync() {
    var that = this;

    return firebase
      .database()
      .ref("Albums")
      .on("value", function(snapshot) {
        var albums = Object.values(snapshot.val());
        //Brug artist ID til at hente fulde navn og erstat dataen.
        //Da dataen i øvelserne kun er fra Taylor Swift, går vi bare ind i første object i Arrayet,
        //da vi ved alle objekter har samme artist. Er der forskellige, kan man loope igennem arrayet og erstatte variabler
        var artistID = albums[0].artist;

        //Lav et nyt database-kald:
        firebase
          .database()
          .ref("artists/" + artistID)
          .once("value", function(snapshotArtist) {
            //loop over albums og erstat
            albums.forEach(function(album) {
              album.artist =
                snapshotArtist.val().firstName +
                " " +
                snapshotArtist.val().lastName;
            });
            that.setState({
              isLoading: false,
              dataSource: albums
            });
          });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: "center",
            alignItems: "stretch"
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <ListItem
              avatar={
                <Image
                  style={{ width: 65, height: 65 }}
                  source={{ uri: item.image }}
                />
              }
              title={item.title}
              titleStyle={{ color: "tomato", fontWeight: "bold" }}
              subtitleStyle={{ color: "tomato" }}
              subtitle={item.artist}
              chevronColor="tomato"
              onPress={() => this.props.navigation.navigate("Details", item)}
              containerStyle={{ backgroundColor: "white" }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
