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
import * as firebase from "firebase";

export default class Questionnaire extends React.Component {
  state = {
    zodiac: "aries",
    hobby: "watch films/drama",
    personality: "",
    religion: "no",
    pet: "no",
    intro: "introvert",
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
            q7: "",
            q8: "",
          }}
          onSubmit={(values) => {}}
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
                onChangeText={props.handleChange("q1")}
                value={props.values.q1}
              />
              <Text style={styles.question}>
                What is your biggest pet peeve?
              </Text>
              <TextInput
                style={styles.input}
                maxLength={100}
                placeholder="Describe in no more than 100 characters"
                onChangeText={props.handleChange("q2")}
                value={props.values.q2}
              />
              <Text style={styles.question}>
                {" "}
                Name your favorite place on Earth.
              </Text>
              <TextInput
                style={styles.input}
                maxLength={100}
                placeholder="eg. My bed"
                onChangeText={props.handleChange("q3")}
                value={props.values.q3}
              />

              <Text style={styles.question}> What are you best at?</Text>
              <TextInput
                style={styles.input}
                maxLength={100}
                placeholder="Name one"
                onChangeText={props.handleChange("q4")}
                value={props.values.q4}
              />

              <Text style={styles.question}>
                {" "}
                Which country do you want to travel to?
              </Text>
              <TextInput
                style={styles.input}
                maxLength={100}
                placeholder="eg. North Korea"
                onChangeText={props.handleChange("q5")}
                value={props.values.q5}
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
                onChangeText={props.handleChange("q6")}
                value={props.values.q6}
              />
              <Text style={styles.question}>
                {" "}
                Name 3 of your favorite movies/books.
              </Text>
              <TextInput
                style={styles.input}
                maxLength={200}
                placeholder="eg. Parasite (2019)"
                onChangeText={props.handleChange("q7")}
                value={props.values.q7}
              />
              <Text style={styles.question}> Who is your celebrity crush?</Text>
              <TextInput
                style={styles.input}
                maxLength={100}
                placeholder="Do not include yourself"
                onChangeText={props.handleChange("q8")}
                value={props.values.q8}
              />
              <Button
                title="submit"
                color="grey"
                onPress={props.handleSubmit}
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
