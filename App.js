import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./screens/LoadingScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ChatScreen from "./screens/ChatScreen";
import QuestionnaireScreen from "./screens/QuestionnaireScreen";
import MatchScreen from "./screens/MatchScreen";
import ChatRoomScreen from "./screens/ChatRoomScreen";
import YesScreen from "./screens/YesScreen";

import * as firebase from "firebase";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
}; //to ignore firebase bug

var firebaseConfig = {
  apiKey: "AIzaSyBYAU4HtlWWSSB6ZXX6kcy8WTXsmtCT5HM",
  authDomain: "social-c0c7c.firebaseapp.com",
  databaseURL: "https://social-c0c7c.firebaseio.com",
  projectId: "social-c0c7c",
  storageBucket: "social-c0c7c.appspot.com",
  messagingSenderId: "784147964809",
  appId: "1:784147964809:web:e1cad1839419c69f8c3758",
};
firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={24} color={tintColor} />
        ),
      },
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: {
        headerTitle: "Chat",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-chatboxes" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      header: null,
      headerMode: "none",
      activeTintColor: "#161F3D",
      inactiveTintColor: "#B8BBC4",
      showLabel: false,
    },
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
  },
  {
    navigationOptions: {
      header: null,
      headerMode: "none",
    },
  }
);

const AppStack = createStackNavigator({
  App: {
    screen: AppTabNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  Questionnaire: QuestionnaireScreen,
  ChatRoom: {
    screen: ChatRoomScreen,
    navigationOptions: {
      title: "Chat Room",
    },
  },
  YesScreen: {
    screen: YesScreen,
    navigationOptions: {
      title: "Revelation Form",
    },
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
      navigationOptions: {
        header: null,
        headerMode: "none",
      },
    }
  )
);
