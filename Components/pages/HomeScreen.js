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
    this.getBoardGamesFromApiAsync();
  }

  getBoardGamesFromApiAsync() {
    var that = this;

    return firebase
      .database()
      .ref("BoardGames")
      .on("value", function(snapshot) {
        var boardGames = Object.values(snapshot.val());
        
            that.setState({
              isLoading: false,
              dataSource: boardGames 
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
              subtitle={item.genre}
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
