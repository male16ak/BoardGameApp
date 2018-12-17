import React from "react";
import { ActivityIndicator, FlatList, View, Button, Image, backgroundColor} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import firebase from "firebase";
import _ from "lodash";

//constructor med variable gemt state 
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      query: "",
      data: [],
      text: ""
    };
    
    console.ignoredYellowBox = ["Setting a timer"];
  }

  //opretter navigationsOptions, så der kan navigeres til view'et fra de andre.
  static navigationOptions = {
    title: "Board Games"
  };

  //Når vores render metode er kørt, køres componentDidMount som kalder getBoardGamesFromApiAsync metoden
  componentDidMount() {
    this.getBoardGamesFromApiAsync();
  }

  //Metode vi bruger til at hente alle ledige brætspil ned, så de kan ses
  getBoardGamesFromApiAsync() {
    var that = this;

    return firebase
      .database()
      .ref("BoardGames")
      .on("value", function(snapshot) {
        //Her gemmes alle brætspil i vores DB som var boardGames
        var boardGames = Object.values(snapshot.val());
        global.antalSpil = 1;

        //Vi løber herigennem hvor mange brætspil der er alt i alt i DB'en, denne variabel bruges andetsteds i programet
        boardGames.forEach(item => {
         global.antalSpil ++;
        });

        
          
        //tager vores list boardGames, frasorterer alle der ikke er "ledige" (hvor lejer ikke = tom)
        const freeBoardGames = boardGames.filter( item =>{
          if(item.lejer === 'tom') {
            return item;
          }
        })

        //Gemmer listen med alle vores spil og alle vores ledige brætspil i state
        that.setState({
          isLoading: false,
          dataSource: freeBoardGames,
          data: boardGames
        });
        return boardGames;
      });
  }


  //Metode der er tilknyttet clear knappen i vores søgebar. Bruges nå teksten skal cleares fra søgebaren
  handleClear = () => {

    const forReals = this.state.data
    

    this.setState ({dataSource: forReals,
                    text: ""})
    


  };

  //Metode der bruges når der skrives i vores søgebar. 
  //Tager det der bliver skadet, og tjekker om det matcher på navn eller kategori med nogen af spillene
  handleSearch = text => {

    const result = this.state.dataSource.filter(item => {
      if (item.title.includes(text) || item.genre.includes(text)) {
        return item;
      }

    })

    this.setState ({dataSource: result,
                    text: text})

  };
//Render metode, med vores UI. Bruger en flatlist til at vise brætspils elementer.
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
