import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  ScrollView,
  Button,
} from "react-native";
import { Formik } from "formik";
//import { OptionsButton } from 'react-native-options-button';
import DropDownPicker from "react-native-dropdown-picker";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import firebase from "firebase";

const fire = require("firebase");
require("firebase/firestore");

export default class Questionnaire extends React.Component {
  state = {
    zodiac: "aries",
    hobby: "watch films/drama",
    personality: "",
    religion: "no",
    pet: "no",
    intro: "introvert",
    nickname: '',
    petpeeve: '',
    favplace: '',
    best: '',
    country: '',
    badhabits: '',
    favbook: '',
    celebcrush: '',
  }; 

  submitQuestion = () => {
    var id = firebase.auth().currentUser.uid;
    fire.firestore().collection("questionnaire").add({
      zodiac: this.state.zodiac,
      hobby: this.state.hobby,
      personality: this.state.personality,
      religion: this.state.religion,
      pet: this.state.pet,
      intro: this.state.intro,
      nickname: '',
      petpeeve: '',
      favplace: '',
      best: '',
      country: '',
      badhabits: '',
      favbook: '',
      celebcrush: '',
    });
  }
  
//   submitQuestionnaire = () => {
//     const firestore = firebase.firestore();
//     firestore.collection('questionnaires').add({
//         uid: firebase.auth().currentUser.uid
//     }).then(() => {
        
//     }).catch((err) => {

//     })
//     console.log("testtesttest");
// };

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
            q7: "",
            q8: "",
          }}
          onSubmit={(values) => 
            this.setState ({
              nickname: value.q1,
              petpeeve: value.q2,
              favplace: value.q3,
              best: value.q4,
              country: value.q5,
              badhabits: value.q6,
              favbook: value.q7,
              celebcrush: value.q8,
            })
          }
        >
          {(props) => (
            <View>
              <Text style={styles.question}>What is your Zodiac sign?</Text>
              <DropDownPicker
                items={[
                  { label: "Aries", value: "aries" },
                  { label: "Taurus", value: "taurus" },
                  { label: "Gemini", value: "gemini" },
                  { label: "Cancer", value: "cancer" },
                  { label: "Leo", value: "leo" },
                  { label: "Virgo", value: "virgo" },
                  { label: "Libra", value: "libra" },
                  { label: "Scorpio", value: "scorpio" },
                  { label: "Sagittarius", value: "sagittarius" },
                  { label: "Capricorn", value: "capricorn" },
                  { label: "Aquarius", value: "aquarius" },
                  { label: "Pisces", value: "pisces" },
                ]}
                defaultValue={this.state.zodiac}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa" }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) =>
                  this.setState({
                    zodiac: item.value,
                  })
                }
              />
              <Text style={styles.question}>
                What do you like to do during your free time?
              </Text>
              <DropDownPicker
                items={[
                  { label: "Watch films/drama", value: "watch films/drama" },
                  {
                    label: "Spending time with their family and friends",
                    value: "spending time with their family and friends",
                  },
                  { label: "Reading", value: "reading" },
                  { label: "Volunteer Work", value: "volunteer work" },
                  { label: "Cleaning", value: "cleaning" },
                  { label: "Sleeping", value: "sleeping" },
                  {
                    label: "Surfing the internet",
                    value: "surfing the internet",
                  },
                  { label: "Working", value: "working" },
                  { label: "Cooking/Baking", value: "cooking/baking" },
                  { label: "Shopping", value: "shopping" },
                  { label: "Exercising", value: "exercising" },
                  { label: "Fishing", value: "fishing" },
                ]}
                defaultValue={this.state.hobby}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa" }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) =>
                  this.setState({
                    hobby: item.value,
                  })
                }
              />
              <Text style={styles.question}>
                How do friends usually describe you as? (Choose Top 3)
              </Text>
              <DropDownPicker
                items={[
                  { label: "Friendly", value: "friendly" },
                  { label: "Considerate", value: "considerate" },
                  { label: "Fun", value: "fun" },
                  { label: "Curious", value: "curious" },
                  { label: "Optimistic", value: "optimistic" },
                  { label: "Caring", value: "caring" },
                  { label: "Confident", value: "confident" },
                  { label: "Helpful", value: "helpful" },
                  { label: "Independent", value: "independent" },
                  { label: "Detail-Oriented", value: "detail-oriented" },
                  { label: "Quiet", value: "quiet" },
                  { label: "Energetic", value: "energetic" },
                  { label: "Expressive", value: "expressive" },
                ]}
                multiple={true}
                multipleText="%d items have been selected."
                min={1}
                max={3}
                defaultValue={this.state.personality}
                containerStyle={{ height: 40 }}
                onChangeItem={(item) =>
                  this.setState({
                    personality: item, // an array of the selected items
                  })
                }
              />

              <Text style={styles.question}>Are you a religious person?</Text>
              <DropDownPicker
                items={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                defaultValue={this.state.religion}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa" }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) =>
                  this.setState({
                    religion: item.value,
                  })
                }
              />

              <Text style={styles.question}>Do you own a pet?</Text>
              <DropDownPicker
                items={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
                defaultValue={this.state.pet}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa" }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) =>
                  this.setState({
                    pet: item.value,
                  })
                }
              />
              <Text style={styles.question}>
                Are you an introvert/extrovert?
              </Text>
              <DropDownPicker
                items={[
                  { label: "Introvert", value: "introvert" },
                  { label: "Extrovert", value: "extrovert" },
                ]}
                defaultValue={this.state.intro}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa" }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={(item) =>
                  this.setState({
                    intro: item.value,
                  })
                }
              />
              <Text style={styles.question}>
                What is your nickname in school?{" "}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Type here"
                onChangeText={(q1) => this.setState ({nickname:q1})}
              />
              <Text style={styles.question}>
                What is your biggest pet peeve?
              </Text>
              <TextInput
                style={styles.input}
                maxLength={100}
                placeholder="Describe in no more than 100 characters"
                onChangeText={(q2) => this.setState ({petpeeve:q2})}
              />
              <Text style={styles.question}>
                {" "}
                Name your favorite place on Earth.
              </Text>
              <TextInput
                style={styles.input}
                maxLength={100}
                placeholder="eg. My bed"
                onChangeText={(q3) => this.setState ({favplace:q3})}
              />

              <Text style={styles.question}> What are you best at?</Text>
              <TextInput
                style={styles.input}
                maxLength={100}
                placeholder="Name one"
                onChangeText={(q4) => this.setState ({best:q4})}
              />

              <Text style={styles.question}>
                {" "}
                Which country do you want to travel to?
              </Text>
              <TextInput
                style={styles.input}
                maxLength={100}
                placeholder="eg. North Korea"
                onChangeText={(q5) => this.setState ({country:q5})}
              />

              <Text style={styles.question}>
                {" "}
                What are some of your bad habits?
              </Text>
              <TextInput
                multiline
                style={styles.input}
                maxLength={200}
                placeholder="Name at least 3"
                onChangeText={(q6) => this.setState ({badhabits:q6})}
              />
              <Text style={styles.question}>
                {" "}
                Name 3 of your favorite movies/books.
              </Text>
              <TextInput
                style={styles.input}
                maxLength={200}
                placeholder="eg. Parasite (2019)"
                onChangeText={(q7) => this.setState ({favbook:q7})}
              />
              <Text style={styles.question}> Who is your celebrity crush?</Text>
              <TextInput
                style={styles.input}
                maxLength={100}
                placeholder="Do not include yourself"
                onChangeText={(q8) => this.setState ({celebcrush:q8})}
              />
              <Button
                title="submit"
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
    marginTop: 42,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});
