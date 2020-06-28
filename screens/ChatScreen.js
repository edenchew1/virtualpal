import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Icon } from "react-native-elements";
import firebase, { firestore } from "firebase";

const fire = require("firebase");
require("firebase/firestore");

export default class ChatScreen extends React.Component {
  _isMounted = false;
  state = {
    gender: null,
    preference: null,
    zodiac: null,
    hobby: null,
    personality: null,
    religion: null,
    pet: null,
    intro: null,
    matchID: null,
  };

  loadMatch = () => {
    var id = firebase.auth().currentUser.uid;
    var docRef = fire.firestore().collection("singleUsers");
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
    fire.firestore().collection("singleUsers").doc(id).set({ uid: id });
    docRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());

      if (data[0].uid) {
        if (data[0].uid === id) {
          if (data[1]) {
            this.setState({ matchID: data[1].uid });
            //console.log(data[1].uid);
          } else {
            Alert.alert("OOPS!", "No match yet! Try again later...");
          }
        } else {
          this.setState({ matchID: data[0].uid });
          //console.log(data[0].uid);
        }
      }
    });

    if (this.state.matchID !== null) {
      fire.firestore().collection("match").doc(id).set({
        match: this.state.matchID,
      });
      docRef.doc(id).delete();
      fire.firestore().collection("match").doc(this.state.matchID).set({
        match: id,
      });
      docRef.doc(this.state.matchID).delete();
      Alert.alert("We found a match!");
    }
  };

  componentDidMount() {
    this._isMounted = true;

    var id = firebase.auth().currentUser.uid;
    var dbRef = fire.firestore().collection("questionnaire");

    dbRef
      .where("uid", "==", id)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const gender = data.map((data) => data.gender);
        const preference = data.map((data) => data.preference);
        const zodiac = data.map((data) => data.zodiac);
        const hobby = data.map((data) => data.hobby);
        const personality = data.map((data) => data.personality);
        const religion = data.map((data) => data.religion);
        const pet = data.map((data) => data.pet);
        const intro = data.map((data) => data.intro);
        const genderData = gender[0];
        const preferenceData = preference[0];
        const zodiacData = zodiac[0];
        const hobbyData = hobby[0];
        const personalityData = personality[0];
        const religionData = religion[0];
        const petData = pet[0];
        const introData = intro[0];
        //console.log(genderData);
        if (this._isMounted) {
          this.setState({
            gender: genderData,
            preference: preferenceData,
            zodiac: zodiacData,
            hobby: hobbyData,
            personality: personalityData,
            religion: religionData,
            pet: petData,
            intro: introData,
          });
        }
      })
      .catch((error) => console.log(error));
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 26, textAlign: "center" }}>
          Find your{"\n"}VirtualPal Partner
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.loadMatch}>
          <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 30 }}>
            Here
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#F5FCFF',
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: "dodgerblue",
    borderRadius: 4,
    height: 45,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
});
