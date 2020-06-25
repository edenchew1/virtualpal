import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import firebase from "firebase";

const fire = require("firebase");
require("firebase/firestore");

export default class ChatScreen extends React.Component {
  addData = () => {
    var id = firebase.auth().currentUser.uid;
    fire.firestore().collection("users").doc(id).set({
      name: firebase.auth().currentUser.displayName,
      uid: id,
    }); 
     }   
    render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 26, textAlign: "center" }}>Find your{'\n'}VirtualPal Partner</Text>
        <TouchableOpacity style={styles.button} onPress={this.addData}>
          <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 30 }}>
            Here
          </Text>
        </TouchableOpacity>
      </View>
 );
}}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: "#3B5998",
    borderRadius: 4,
    height: 45,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
});
