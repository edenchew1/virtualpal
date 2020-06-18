import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class ChatScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>Chat Screen</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "#FFF", fontWeight: "500", fontSize: 25 }}>
            Find new pal
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
