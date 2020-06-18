import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  StatusBar,
} from "react-native";
import WavyHeader from "../components/WavyHeader";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
  state = {
    email: "",
    displayName: "",
  };

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={{ fontSize: 32 }}>Hi {this.state.displayName}!</Text>
        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
