import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  LayoutAnimation,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "firebase";
import WavyHeader from "../components/WavyHeader";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    email: "",
    password: "",
    errorMessage: null,
  };
  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <WavyHeader />
        <Image
          source={require("../assets/appicon.png")} //temp logo
          style={{ marginTop: 32, alignSelf: "center" }}
        />
        <Text style={styles.greeting}>{"VirtualPal"}</Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 32 }}
          onPress={() => {
            this.props.navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "#414959", fontSize: 13 }}>
            New to VirtualPal?{" "}
            <Text style={{ fontWeight: "500", color: "#3B5998" }}>
              Sign up here
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 5,
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
  },
  errorMessage: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  form: {
    marginTop: 10,
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "black",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 48,
    fontSize: 15,
    color: "#161F3D",
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
