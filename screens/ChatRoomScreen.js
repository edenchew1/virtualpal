import React, { useState, useCallback, useEffect } from "react";
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  scrollToBottomComponent,
  SystemMessage,
} from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import firebase, { firestore } from "firebase";
import { State, TouchableOpacity } from "react-native-gesture-handler";

const fire = require("firebase");
require("firebase/firestore");

export default function ChatRoomScreen() {
  const quota = false;
  // const [chatID, setchatID] = useState();
  // const uid = firebase.auth().currentUser.uid;
  // const name = firebase.auth().currentUser.displayName;
  // const dbRef = fire.firestore().collection("match");
  // dbRef
  //   .where("uid", "==", uid)
  //   .get()
  //   .then((snapshot) => {
  //     const data = snapshot.docs.map((doc) => doc.data());
  //     const matchID = data.map((data) => data.match);
  //     const chatID = JSON.stringify(matchID[0] + uid);
  //     if (matchID[0] > uid) {
  //       setchatID(JSON.stringify(uid + matchID[0]));
  //     } else {
  //       setchatID(chatID);
  //     }
  //   })
  //   .catch((error) => console.log(error));
  const chatID = firebase.auth().currentUser.photoURL;
  const uid = firebase.auth().currentUser.uid;
  const name = firebase.auth().currentUser.displayName;
  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B5998" />
      </View>
    );
  }
  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }
  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "grey",
          },
          right: {
            backgroundColor: "#3B5998",
          },
        }}
        textStyle={{
          left: {
            color: "#fff",
          },
          right: {
            color: "#fff",
          },
        }}
      />
    );
  }
  function renderInputToolbar(props) {
    if (!quota) {
      return <InputToolbar {...props} />;
    }
  }
  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#3B5998" />
        </View>
      </Send>
    );
  }
  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#3B5998" />
      </View>
    );
  }

  // const {chatroom} = route.params;
  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: "New room created.",
      createdAt: new Date().getTime(),
      system: true,
    },
    // example of chat message
    // {
    //   _id: 1,
    //   text: "Hello!",
    //   createdAt: new Date().getTime(),
    //   user: {
    //     _id: 2,
    //     name: "Test User",
    //   },
    // },
  ]);

  // helper method that is sends a message
  // function handleSend(newMessage = []) {
  //   setMessages(GiftedChat.append(messages, newMessage));
  // }
  async function handleSend(messages) {
    const text = messages[0].text;
    // console.log(chatID);
    // console.log(text);
    console.log(name);
    await fire
      .firestore()
      .collection("chatrooms")
      .doc(chatID)
      .collection("messages")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: uid,
          name: name,
        },
      });
    await fire
      .firestore()
      .collection("chatrooms")
      .doc(chatID)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true }
      );
  }

  useEffect(() => {
    const messagesListener = fire
      .firestore()
      .collection("chatrooms")
      .doc(chatID)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, []);
  // return (

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: uid }}
      renderBubble={renderBubble}
      placeholder="Type your message here..."
      renderAvatar={null}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
      renderInputToolbar={renderInputToolbar}
      renderSystemMessage={renderSystemMessage}
    />
  );
}
const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  systemMessageText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  systemMessageWrapper: {
    backgroundColor: "#3B5998",
    borderRadius: 4,
    padding: 5,
  },
});
