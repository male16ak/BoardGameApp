import React from "react";
import { ActivityIndicator, FlatList, View, Button, Image, backgroundColor} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import firebase from "firebase";
import _ from "lodash";

export default class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          data: []
          
        };
     
      }
      static navigationOptions = {
        title: "NotificationScreen"
      };
      componentDidMount() {
        this.getNotificationsFromApiAsync();
      }


    getNotificationsFromApiAsync() {
        var that = this;
    
        return firebase
          .database()
          .ref("Notifications")
          .on("value", function(snapshot) {
            var notifications = Object.values(snapshot.val());

            const yourNotifications = notifications.filter( item =>{
                if(item.modtager === global.bruger ) {
                  return item;
                }
              })


        that.setState({
            isLoading: false,
            data: yourNotifications
        })
         
 })}
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
          
          <FlatList
          contentContainerStyle ={{justifyContent:'center',alignSelf:'stretch'}}
            data={this.state.data}
            
            
            renderItem={({ item }) => (
              <ListItem
                leftAvatar={{
                  
                    source: { uri: item.image }
                  
                }}
                title={item.type}
                titleStyle={{ color: "black", fontWeight: "bold", textDecorationLine: "underline"
              }}
                subtitleStyle={{ color: "grey" }}
                subtitle={item.besked}
                chevron= {false}
                bottomDivider={true}
                topDivider={true}
                chevronColor="black"
                containerStyle={{ backgroundColor: "white" }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          
        </View>
      );

}

}
