import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
        <Text style={{ fontSize: 30 }}>Chat Screen</Text>
        <TouchableOpacity style={styles.button} onPress={this.addData}>
          <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 25 }}>
            Find new pal
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
    marginHorizontal: 30,
    backgroundColor: "#3B5998",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
