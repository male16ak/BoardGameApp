import React from "react";
import { ActivityIndicator, FlatList, View, Button, Image } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import firebase from "firebase";
import _ from "lodash";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      query: "",
      data: [],
      fullData: []
    };
    //Android viser en warning med en timer. Dette får RN til at ignorere fejlen. Der kan læses mere om fejlen her
    // https://github.com/firebase/firebase-js-sdk/issues/97
    console.ignoredYellowBox = ["Setting a timer"];
  }

  static navigationOptions = {
    title: "Board Games"
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
          dataSource: boardGames,
          data: boardGames
        });
        return boardGames;
      });
  }

  searchFunction = ({ title, genre }, query) => {
    if (title.includes(query) || genre.includes(query)) {
      return true;
    }
    return false;
  };

  handleSearch = async text => {
    const data = _.filter(this.State.data, boardGames => {
      return this.searchFunction(boardGames);
    });
    this.setState({ query: text, data });
  };

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
        <SearchBar
          lightTheme
          onChangeText={this.handleSearch}
          /*onClear={someMethod}*/
          placeholder="Type Here..."
        />
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
