import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import DropDownPicker from "react-native-dropdown-picker";
import { Button } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import firebase from "firebase";

const fire = require("firebase");
require("firebase/firestore");

export default class Questionnaire extends React.Component {
  state = {
    gender: 'male',
    preference: 'male',
    zodiac: "aries",
    hobby: "watch films/drama",
    personality: "",
    religion: "yes",
    pet: "yes",
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
    fire.firestore().collection("questionnaire").doc(id).set({
      uid: id,
      gender: this.state.gender,
      preference: this.state.preference,
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
    this.props.navigation.navigate('Home');
  }

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
          onSubmit={(value) => 
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
          {() => (
            <View>
              <Text style={styles.question}>Are you a...</Text>
              <RadioButton.Group
                onValueChange={(value) => this.setState({ gender:value })}
                value={this.state.gender}
              >
                  <RadioButton.Item label="Male" value="male" color="dodgerblue"/>
                  <RadioButton.Item label="Female" value="female" color="dodgerblue"/>
              </RadioButton.Group>
              <Text style={styles.question}>Do you prefer your VirtualPal to be a...</Text>
              <RadioButton.Group
                onValueChange={(value) => this.setState({ preference:value })}
                value={this.state.preference}
              >
                  <RadioButton.Item label="Male" value="male" color="dodgerblue"/>
                  <RadioButton.Item label="Female" value="female" color="dodgerblue"/>
                  <RadioButton.Item label="No Preference" value="no preference" color="dodgerblue"/>
              </RadioButton.Group>
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
              <RadioButton.Group
                onValueChange={(value) => this.setState({ religion:value })}
                value={this.state.religion}
              >
                  <RadioButton.Item label="Yes" value="yes" color="dodgerblue"/>
                  <RadioButton.Item label="No" value="no" color="dodgerblue"/>
              </RadioButton.Group>
              <Text style={styles.question}>Do you own a pet?</Text>
              <RadioButton.Group
                onValueChange={(value) => this.setState({ pet:value })}
                value={this.state.pet}
              >
                  <RadioButton.Item label="Yes" value="yes" color="dodgerblue"/>
                  <RadioButton.Item label="No" value="no" color="dodgerblue"/>
              </RadioButton.Group>
              <Text style={styles.question}>
                Are you an introvert/extrovert?
              </Text>
              <RadioButton.Group
                onValueChange={(value) => this.setState({ intro:value })}
                value={this.state.intro}
              >
                  <RadioButton.Item label="Erm... Introvert" value="introvert" color="dodgerblue"/>
                  <RadioButton.Item label="Definitely Extrovert!" value="extrovert" color="dodgerblue"/>
                  <RadioButton.Item label="I'm not sure myself" value="not sure" color="dodgerblue"/>
              </RadioButton.Group>
              <Text style={styles.question}>
                What is your nickname in school?{" "}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Name one"
                returnKeyType="next"
                onChangeText={(q1) => this.setState ({nickname:q1})}
                onSubmitEditing= {() => {this.secondTextInput.focus()}}
                blurOnSubmit = {false}
              />
              <Text style={styles.question}>
                What is your biggest pet peeve?
              </Text>
              <TextInput
                ref={(input) => { this.secondTextInput = input; }}
                style={styles.input}
                maxLength={100}
                placeholder="Describe in no more than 100 characters"
                returnKeyType="next"
                onChangeText={(q2) => this.setState ({petpeeve:q2})}
                onSubmitEditing= {() => {this.thirdTextInput.focus()}}
                blurOnSubmit = {false}
              />
              <Text style={styles.question}>
                {" "}
                Name your favorite place on Earth.
              </Text>
              <TextInput
                ref={(input) => { this.thirdTextInput = input; }}
                style={styles.input}
                maxLength={100}
                placeholder="eg. My bed"
                returnKeyType="next"
                onChangeText={(q3) => this.setState ({favplace:q3})}
                onSubmitEditing= {() => {this.fourthTextInput.focus()}}
                blurOnSubmit = {false}
              />

              <Text style={styles.question}> What are you best at?</Text>
              <TextInput
                ref={(input) => { this.fourthTextInput = input; }}
                style={styles.input}
                maxLength={100}
                placeholder="Name one"
                returnKeyType="next"
                onChangeText={(q4) => this.setState ({best:q4})}
                onSubmitEditing= {() => {this.fifthTextInput.focus()}}
                blurOnSubmit = {false}
              />

              <Text style={styles.question}>
                {" "}
                Which country do you want to travel to?
              </Text>
              <TextInput
                ref={(input) => { this.fifthTextInput = input; }}
                style={styles.input}
                maxLength={100}
                placeholder="eg. North Korea"
                returnKeyType="next"
                onChangeText={(q5) => this.setState ({country:q5})}
                onSubmitEditing= {() => {this.sixthTextInput.focus()}}
                blurOnSubmit = {false}
              />

              <Text style={styles.question}>
                {" "}
                What are some of your bad habits?
              </Text>
              <TextInput
                ref={(input) => { this.sixthTextInput = input; }}
                style={styles.input}
                maxLength={200}
                placeholder="eg. bad habit #1, #2, #3"
                returnKeyType="next"
                onChangeText={(q6) => this.setState ({badhabits:q6})}
                onSubmitEditing= {() => {this.seventhTextInput.focus()}}
                blurOnSubmit = {false}
              />
              <Text style={styles.question}>
                {" "}
                Name 3 of your favorite movies/books.
              </Text>
              <TextInput
                ref={(input) => { this.seventhTextInput = input; }}
                style={styles.input}
                maxLength={200}
                placeholder="eg. book #1, movie #2, movie #3"
                returnKeyType="next"
                onChangeText={(q7) => this.setState ({favbook:q7})}
                onSubmitEditing= {() => {this.eigthTextInput.focus()}}
                blurOnSubmit = {false}
              />
              <Text style={styles.question}> Who is your celebrity crush?</Text>
              <TextInput
                ref={(input) => { this.eigthTextInput = input; }}
                style={styles.input}
                maxLength={100}
                placeholder="Note: Do not include yourself"
                onChangeText={(q8) => this.setState ({celebcrush:q8})}
              />
              <Text style={styles.question}>{" "}</Text>
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
