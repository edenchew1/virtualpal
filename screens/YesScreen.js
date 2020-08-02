import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Formik } from "formik";
import { Button } from "react-native-elements";
import firebase from "firebase";

const fire = require("firebase");
require("firebase/firestore");

export default class YesScreen extends React.Component {
  state = {
    Name: "",
    School: "",
    Course: "",
    Age: "",
    Telegram: "",
    Instagram: "",
    matchID: "",
  };
  submitQuestion = async () => {
    var id = firebase.auth().currentUser.uid;
    var matchdb = fire.firestore().collection("match");
    await matchdb
      .where("uid", "==", id)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const matchID = data.map((data) => data.match);
        this.setState({ matchID: matchID[0] });
      });
    fire.firestore().collection("revelation").doc(this.state.matchID).set({
      uid: this.state.matchID,
      status: "yes",
      name: this.state.Name,
      school: this.state.School,
      course: this.state.Course,
      age: this.state.Age,
      telegram: this.state.Telegram,
      instagram: this.state.Instagram,
    });
    this.props.navigation.navigate("Chat");
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Formik
          initialValues={{
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            q6: "",
          }}
        >
          {() => (
            <View>
              <Text
                style={{
                  marginTop: 8,
                  fontSize: 16,
                  textAlign: "center",
                  color: "blue",
                }}
              >
                Please fill in the details you would {"\n"} like to reveal to
                your pal
              </Text>
              <Text style={{ textAlign: "center", color: "red" }}>
                You can choose to skip fields by simply indicating a "NIL"
              </Text>
              <Text
                style={{ fontSize: 18, textAlign: "center", marginTop: 20 }}
              >
                Real Name{" "}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                returnKeyType="next"
                onChangeText={(q1) => this.setState({ Name: q1 })}
                onSubmitEditing={() => {
                  this.secondTextInput.focus();
                }}
                blurOnSubmit={false}
              />
              <Text style={styles.question}>School / Company</Text>
              <TextInput
                ref={(input) => {
                  this.secondTextInput = input;
                }}
                style={styles.input}
                maxLength={100}
                placeholder="Enter your school or company"
                returnKeyType="next"
                onChangeText={(q2) => this.setState({ School: q2 })}
                onSubmitEditing={() => {
                  this.thirdTextInput.focus();
                }}
                blurOnSubmit={false}
              />
              <Text style={styles.question}> Course / Job</Text>
              <TextInput
                ref={(input) => {
                  this.thirdTextInput = input;
                }}
                style={styles.input}
                maxLength={100}
                placeholder="Enter your course or job "
                returnKeyType="next"
                onChangeText={(q3) => this.setState({ Course: q3 })}
                onSubmitEditing={() => {
                  this.fourthTextInput.focus();
                }}
                blurOnSubmit={false}
              />

              <Text style={styles.question}>Age</Text>
              <TextInput
                ref={(input) => {
                  this.fourthTextInput = input;
                }}
                style={styles.input}
                maxLength={100}
                placeholder="Enter your age"
                returnKeyType="next"
                onChangeText={(q4) => this.setState({ Age: q4 })}
                onSubmitEditing={() => {
                  this.fifthTextInput.focus();
                }}
                blurOnSubmit={false}
              />

              <Text style={styles.question}>Telegram handle</Text>
              <TextInput
                ref={(input) => {
                  this.fifthTextInput = input;
                }}
                style={styles.input}
                maxLength={100}
                placeholder="Enter telegram handle / alternative contact"
                returnKeyType="next"
                onChangeText={(q5) => this.setState({ Telegram: q5 })}
                onSubmitEditing={() => {
                  this.sixthTextInput.focus();
                }}
                blurOnSubmit={false}
              />

              <Text style={styles.question}>Instagram handle</Text>
              <TextInput
                ref={(input) => {
                  this.sixthTextInput = input;
                }}
                style={styles.input}
                maxLength={200}
                placeholder="Enter Instagram handle"
                onChangeText={(q6) => this.setState({ Instagram: q6 })}
              />

              <Text style={styles.question}> </Text>
              <Button
                title="SUBMIT"
                color="blue"
                onPress={this.submitQuestion}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});
