import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import DetailsScreen from "./DetailsScreen";
import AddNewScreen from "./AddNewScreen";
import ProfileScreen from "./ProfileScreen";
import GameForRentScreen from "./GameForRentScreen";
import NotificationScreen from "./NotificationScreen"
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

/* Opretter i denne klasse tre stacks, som gør vi kan navigere frem og tilbage mellem flere views*/ 
const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen }
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen },
  AddNew: { screen: AddNewScreen },
  GameForRent: {screen: GameForRentScreen},
  Notification: {screen: NotificationScreen}

});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: DetailsScreen }
});

//Herefter laver vi en bottom navigator, som er den bar vi har i nbunden af appen hvor vi kan navigere rundt.
//her tilfjer vi vores tre stacks.
export default createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Profile: { screen: ProfileStack },
    Settings: { screen: SettingsStack }
  },

  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        var iconName;

        if (routeName === "Home") {
          iconName = "home";
        } else if (routeName === "Profile") {
          iconName = "user";
        } else if (routeName === "Settings") {
          iconName = "cog";
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#03A9F4",
      inactiveTintColor: "gray"
    }
  }
);
