import React from "react";
import { ActivityIndicator, FlatList, View, Button, Image, backgroundColor} from "react-native";
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
      text: ""
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
        global.antalSpil = 1;

        boardGames.forEach(item => {
         global.antalSpil ++;
        });

        
          
        
        const freeBoardGames = boardGames.filter( item =>{
          if(item.lejer === 'tom') {
            return item;
          }
        })

        that.setState({
          isLoading: false,
          dataSource: freeBoardGames,
          data: boardGames
        });
        return boardGames;
      });
  }


  
  handleClear = () => {

    const forReals = this.state.data
    

    this.setState ({dataSource: forReals,
                    text: ""})
    


  };

  handleSearch = text => {

    const result = this.state.dataSource.filter(item => {
      if (item.title.includes(text) || item.genre.includes(text)) {
        return item;
      }

    })

    this.setState ({dataSource: result,
                    text: text})

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
      <View style = {{flex: 1, backgroundColor: 'white'}}>
        <SearchBar
          lightTheme
          value ={this.state.text}
          onChangeText={this.handleSearch}
          onClear={this.handleClear}
          placeholder="Type Here..."
        />
        
        <FlatList
        contentContainerStyle ={{justifyContent:'center',alignSelf:'stretch'}}
          data={this.state.dataSource}
          
          
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{
                
                  source: { uri: item.image }
                
              }}
              title={item.title}
              titleStyle={{ color: "black", fontWeight: "bold", textDecorationLine: "underline"
            }}
              subtitleStyle={{ color: "grey" }}
              subtitle={item.genre}
              chevron= {true}
              bottomDivider={true}
              topDivider={true}
              chevronColor="black"
              onPress={() => this.props.navigation.navigate("Details", item ) }
              containerStyle={{ backgroundColor: "white" }}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        
      </View>
    );
  }
}
