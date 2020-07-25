import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  StatusBar,
  Alert,
} from "react-native";
import WavyHeader from "../components/WavyHeader";
import * as firebase from "firebase";

const fire = require("firebase");
require("firebase/firestore");

export default class HomeScreen extends React.Component {
  _isMounted = false;
  state = {
    email: "",
    displayName: "",
  };
  intervalID;
  getData = () => {
    const { email, displayName } = firebase.auth().currentUser;
    if (this._isMounted) {
      this.setState({ email, displayName });
    }
  };
  componentDidMount() {
    this._isMounted = true;
    this.getData();
    this.intervalID = setInterval(this.getData.bind(this), 5000);

    var id = firebase.auth().currentUser.uid;
    fire
      .firestore()
      .collection("questionnaire")
      .doc(id)
      .get()
      .then((docSnapshot) => {
        if (!docSnapshot.exists) {
          this.props.navigation.navigate("Home");
          Alert.alert(
            "No profile found",
            "Please complete questionnaire first..",
            [
              {
                text: "Take me there",
                onPress: () => this.props.navigation.navigate("Questionnaire"),
              },
            ]
          );
        }
      });
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.intervalID);
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  editProfile = () => {
    this.props.navigation.navigate("Questionnaire");
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <WavyHeader />

        <Text style={{ fontSize: 32 }}>Hi {this.state.displayName}!</Text>
        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.editProfile}>
          <Text>Edit Questionnaire</Text>
        </TouchableOpacity>
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
    backgroundColor: "#F5FCFF",
  },
});
