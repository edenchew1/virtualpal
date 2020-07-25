import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
//import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Overlay from "react-native-modal-overlay";
//import AnimatedEllipsis from 'react-native-animated-ellipsis';

export default class MatchScreen extends React.Component {
  state = { modalVisible: false };

  showOverlay() {
    this.setState({ modalVisible: true });
  }

  hideOverlay() {
    this.setState({ modalVisible: false });
  }
  onClose = () => this.setState({ modalVisible: false });
  goChat = () => this.props.navigation.navigate("Chat");

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>- Instruction -</Text>
        <Text style={styles.instructions}>
          Please note that we will match you based {"\n"}
          on how you answer your questionnaire, {"\n"}
          however, all information of you and your pal{"\n"}
          will be kept in strict confidence.
        </Text>
        <Text style={styles.instructions}>
          We seek for your cooperation in maintaining confidentiality, thank
          you.
          {"\n"}
        </Text>
        <Button onPress={this.showOverlay.bind(this)} title="OK" />

        <Overlay
          visible={this.state.modalVisible}
          onClose={this.onClose}
          closeOnTouchOutside
          animationType="zoomIn"
          containerStyle={{ backgroundColor: "lightslategrey" }}
          childrenWrapperStyle={{ backgroundColor: "#eee" }}
          animationDuration={500}
        >
          {() => (
            <Fragment>
              <Text style={{ fontWeight: "300", fontSize: 20 }}>Sorry! </Text>
              <View
                style={{ borderBottomWidth: 1, width: 100, paddingTop: 10 }}
              >
                <Image
                  source={require("../assets/mysteryicon1.png")}
                  style={{ alignSelf: "center" }}
                />
                <Text style={{ textAlign: "center" }}>
                  {" "}
                  Revealation will not take place..{"\n"}
                </Text>
              </View>
              <Text
                style={{
                  fontWeight: "300",
                  fontSize: 16,
                  paddingTop: 20,
                  textAlign: "center",
                }}
              >
                Seems like one or more party have decided not to reveal their
                identity! {"\n"} Better luck next time!
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Button title="OK" color="dodgerblue" onPress={this.goChat} />
              </View>
            </Fragment>
          )}
        </Overlay>
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
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
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
