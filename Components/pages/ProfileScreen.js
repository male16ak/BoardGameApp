import React from "react";
import { ActivityIndicator, FlatList, View, Text, Image, ImageBackground, StyleSheet} from "react-native";
import { ListItem, SearchBar, Avatar, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import firebase from "firebase";


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        isLoading: true,
        data: []
        
        };
    }

    static navigationOptions = {
        title: "ProfileScreen"
      };

      componentDidMount() {
        this.getYourBoardGamesFromApiAsync();
      }

      getYourBoardGamesFromApiAsync() {
          var that = this;
          return firebase
          .database()
          .ref("BoardGames")
          .on("value", function (snapshot) {
              var yourBoardGames = Object.values(snapshot.val());

              const freeBoardGames = yourBoardGames.filter( item =>{
                if(item.ejer === "Jonathan_gauguin@hotmail.dk") {
                  return item;
                }
              })

              that.setState({
                  data: freeBoardGames,
                  isLoading: false
              }) 
          }
          
          )
          

      }



      render () {
          console.log(this.state.data);
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
            
              <View style = {{flex: 1, backgroundColor:"white"}}>
                  <View style = {{alignItems: 'center', flexDirection:'row', marginLeft: 20, marginTop: 20}}>
                  <Avatar
                  title=/*{global.bruger[0]}*/ 'J'
                  rounded
                  size="large"
                  icon = {{name: 'user', type: 'font-awesome'}}
                  onPress={() => this.props.navigation.navigate("Settings")}
                  activeOpacity={0.7}
/>
                  <Text font= 'bold' style= {{ fontSize: 16, fontWeight: "bold", color:"#03A9F4"}}> Jonathan_gauguin@hotmail.dk </Text>
                  </View>
                  <View alignItems="center"><Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 20}}>Mine spil: </Text></View>
                
                
                <View style ={{flex: 1}}>
                <FlatList
        contentContainerStyle ={{ justifyContent:'center'}}
          data={this.state.data}
          
          
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
              onPress={() => this.props.navigation.navigate("GameForRent", item ) }
              containerStyle={{ backgroundColor: "white" }}
             />
            
                
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
        
        <View style = {{alignItems: "stretch"}}>
        <Button
            title="Udlej Spil"
            titleStyle={{fontSize: 22}}
            icon={<Icon name="plus-circle" color="white" size={25} ></Icon>}
            buttonStyle={{
              backgroundColor:"#03A9F4",
              height: 70,
              borderRadius: 30,
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10
            }} onPress={()=> this.props.navigation.navigate("AddNew")}></Button>
        </View> </View>
          );
      }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }});