import React, { Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import firebase, { firestore } from "firebase";
import Overlay from "react-native-modal-overlay";
import { YellowBox } from "react-native";
import _ from "lodash";
import HomeScreen from "./HomeScreen";
import YesScreen from "./YesScreen";

const fire = require("firebase");
require("firebase/firestore");

YellowBox.ignoreWarnings(["Possible Unhandled Promise Rejection"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Possible Unhandled Promise Rejection") <= -1) {
    _console.warn(message);
  }
}; //to ignore firebase bug
export default class ChatScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  intervalID;

  _isMounted = false;
  state = {
    chatID: null,
    displayName: null,
    gender: null,
    preference: null,
    zodiac: null,
    hobby: null,
    personality: null,
    religion: null,
    pet: null,
    intro: null,
    matchID: null,
    matchName: null,
    matchDate: null,
    exist: false,
    modalVisible: false,
    taskTitle: null,
    taskDetail: null,
    startDate: null,
    startMonth: null,
    currDay: null,
    shown: null,
    header: null,
    imageLink: null,
    revelation: false,
    yeschoice: false,
    noreveal: false,
    yesreveal: false,
    mutual: false,
    matchRName: null,
    matchSchool: null,
    matchCourse: null,
    matchAge: null,
    matchTele: null,
    matchInsta: null,
  };
  showOverlay() {
    this.setState({ modalVisible: true });
  }

  hideOverlay() {
    this.setState({ modalVisible: false });
  }
  onClose = () => {
    this.setState({ modalVisible: false });
  };
  getData = () => {
    if (firebase.auth().currentUser !== null) {
      const uid = firebase.auth().currentUser.uid;
      fire
        .firestore()
        .collection("match")
        .doc(uid)
        .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            if (this._isMounted) {
              this.setState({ exist: true });
            }
          } else {
            if (this._isMounted) {
              this.setState({ exist: false });
            }
          }
        });
    }
  };
  tapNo = async () => {
    var id = firebase.auth().currentUser.uid;
    var matchdb = fire.firestore().collection("match");
    const doc = fire.firestore().collection("revelation");
    await matchdb
      .where("uid", "==", id)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const matchID = data.map((data) => data.match);
        this.setState({ matchID: matchID[0] });
      });
    doc
      .doc(this.state.matchID)
      .set({
        uid: this.state.matchID,
        status: "no",
      })
      .then(this.unMatch);
  };
  unMatch = () => {
    if (this._isMounted) {
      this.setState({ revelation: false, matchRName: null });
    }
    var id = firebase.auth().currentUser.uid;
    var matchdb = fire.firestore().collection("match");
    var revelation = fire.firestore().collection("revelation");
    revelation.doc(id).delete();
    matchdb.doc(id).delete();
  };
  forceUnmatch = async () => {
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
    matchdb.doc(this.state.matchID).delete();
    matchdb.doc(id).delete();
  };
  checkReveal = async (matchID) => {
    const uid = firebase.auth().currentUser.uid;
    var doc = fire.firestore().collection("revelation");
    doc
      .where("uid", "==", matchID[0])
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const status = data.map((data) => data.status);
        if (status[0] === "yes") {
          this.setState({ yeschoice: true });
        }
      });
    await doc
      .doc(uid)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          if (this.state.yeschoice) {
            this.setState({ mutual: true });
          }
        }
      });
    if (this.state.mutual) {
      doc
        .where("uid", "==", uid)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          const status = data.map((data) => data.status);
          if (status[0] === "no") {
            this.setState({ noReveal: true });
            Alert.alert(
              "Sorry",
              "Looks like your pal decided not to reveal their identity! Better luck next time!",
              [
                {
                  text: "Ok",
                  onPress: this.unMatch,
                },
              ]
            );
          } else {
            this.setState({ yesReveal: true });
            const name = data.map((data) => data.name);
            const school = data.map((data) => data.school);
            const course = data.map((data) => data.course);
            const age = data.map((data) => data.age);
            const instagram = data.map((data) => data.instagram);
            const telegram = data.map((data) => data.telegram);
            this.setState({
              matchRName: name[0],
              matchSchool: school[0],
              matchCourse: course[0],
              matchAge: age[0],
              matchInsta: instagram[0],
              matchTele: telegram[0],
            });
          }
        });
    }
  };
  loadReveal = () => {
    const uid = firebase.auth().currentUser.uid;
    var doc = fire.firestore().collection("revelation");
    doc
      .where("uid", "==", uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const status = data.map((data) => data.status);
        if (status[0] === "no") {
          this.setState({ noReveal: true });
          Alert.alert(
            "Sorry",
            "Looks like your pal decided not to reveal their identity! Better luck next time!",
            [
              {
                text: "Ok",
                onPress: this.unMatch,
              },
            ]
          );
        } else if (status[0] === "yes") {
          this.setState({ yesReveal: true });
          this.props.navigation.navigate("YesScreen");
        } else {
          this.props.navigation.navigate("YesScreen");
        }
      });
  };

  loadTask = (day) => {
    var doc = fire.firestore().collection("task");
    doc
      .where("day", "==", day)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const detail = data.map((data) => data.detail);
        const title = data.map((data) => data.title);

        if (this._isMounted) {
          if (title[0] === undefined && detail[0] === undefined) {
            this.setState({ taskDetail: null, taskTitle: null });
          } else {
            this.setState({
              taskDetail: detail[0],
              taskTitle: title[0],
              header: "New Task",
              imageLink: require("../assets/task-icon.png"),
            });
            this.setState({ modalVisible: true });
          }
        }
      });
  };

  loadFacts = (day, matchID) => {
    var doc = fire.firestore().collection("questionnaire");
    doc
      .where("uid", "==", matchID[0])
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const nickname = data.map((data) => data.nickname);
        const petpeeve = data.map((data) => data.petpeeve);
        const favplace = data.map((data) => data.favplace);
        const best = data.map((data) => data.best);
        const country = data.map((data) => data.country);
        const badhabits = data.map((data) => data.badhabits);
        const favbook = data.map((data) => data.favbook);
        const celebcrush = data.map((data) => data.celebcrush);
        if (day === "3") {
          this.setState({
            header: "Fun Fact",
            taskTitle: "Your pal's nickname in school",
            taskDetail: nickname[0],
            modalVisible: true,
            imageLink: require("../assets/light-on.png"),
          });
        } else if (day === "6") {
          this.setState({
            header: "Fun Fact",
            taskTitle: "Your pal's pet peeve",
            taskDetail: petpeeve[0],
            modalVisible: true,
            imageLink: require("../assets/light-on.png"),
          });
        } else if (day === "9") {
          this.setState({
            header: "Fun Fact",
            taskTitle: "Your pal's favourite place",
            taskDetail: favplace[0],
            modalVisible: true,
            imageLink: require("../assets/light-on.png"),
          });
        } else if (day === "12") {
          this.setState({
            header: "Fun Fact",
            taskTitle: "Your pal is best at",
            taskDetail: best[0],
            modalVisible: true,
            imageLink: require("../assets/light-on.png"),
          });
        } else if (day === "16") {
          this.setState({
            header: "Fun Fact",
            taskTitle: "Your pal wants to travel to",
            taskDetail: country[0],
            modalVisible: true,
            imageLink: require("../assets/light-on.png"),
          });
        } else if (day === "19") {
          this.setState({
            header: "Fun Fact",
            taskTitle: "Your pal's bad habits are",
            taskDetail: badhabits[0],
            modalVisible: true,
            imageLink: require("../assets/light-on.png"),
          });
        } else if (day === "23") {
          this.setState({
            header: "Fun Fact",
            taskTitle: "Your pal's favourite movie/book",
            taskDetail: favbook[0],
            modalVisible: true,
            imageLink: require("../assets/light-on.png"),
          });
        } else if (day === "27") {
          this.setState({
            header: "Fun Fact",
            taskTitle: "Your pal's celeb crush",
            taskDetail: celebcrush[0],
            modalVisible: true,
            imageLink: require("../assets/light-on.png"),
          });
        }
      });
  };

  load = () => {
    var id = firebase.auth().currentUser.uid;
    var matchdb = fire.firestore().collection("match");
    const currMonth = new Date().getMonth() + 1;
    const currDate = new Date().getDate();
    matchdb
      .where("uid", "==", id)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const matchName = data.map((data) => data.displayName);
        const matchID = data.map((data) => data.match);
        const start = data.map((data) => data.startDay);
        const month = data.map((data) => data.startMonth);
        const year = data.map((data) => data.startYear);
        const taskDate = data.map((data) => data.taskDate);
        if (matchID[0] > id) {
          firebase.auth().currentUser.updateProfile({
            photoURL: JSON.stringify(id + matchID[0]),
          });
          this.setState({ chatID: JSON.stringify(id + matchID[0]) });
        } else {
          firebase.auth().currentUser.updateProfile({
            photoURL: JSON.stringify(matchID[0] + id),
          });
          this.setState({ chatID: JSON.stringify(matchID[0] + id) });
        }
        const displayNameData = matchName[0];
        const startDay = start[0];
        const startMonth = month[0];
        const startYear = year[0];
        this.setState({
          matchName: displayNameData,
          startDate: startDay,
          startMonth: startMonth,
          startYear: startYear,
        });

        if (currMonth === Number(this.state.startMonth)) {
          if (currDate === Number(this.state.startDate)) {
            const curr = 1;
            this.setState({ currDay: JSON.stringify(curr) });
          } else {
            const curr = 1 + (currDate - Number(this.state.startDate));
            this.setState({ currDay: JSON.stringify(curr) });
            if (curr === 30) {
              this.setState({ revelation: true });
              this.checkReveal(matchID);
            }
          }
        } else {
          const noDays = new Date(
            this.state.startYear,
            this.state.startMonth,
            0
          ).getDate();
          const curr = currDate + noDays + 1 - Number(this.state.startDate);
          this.setState({ currDay: JSON.stringify(curr) });
          if (curr === 30) {
            this.setState({ revelation: true });
            this.checkReveal(matchID);
          }
        }
        // if (this.state.currDay === "30") {
        //   this.setState({ revelation: "true" });
        // }
        if (taskDate[0] !== new Date().getDate()) {
          this.loadTask(this.state.currDay);
          this.loadFacts(this.state.currDay, matchID);
          matchdb
            .doc(id)
            .set({ taskDate: new Date().getDate() }, { merge: true });
        }
      });
  };
  loadMatch = async () => {
    var id = firebase.auth().currentUser.uid;
    var docRef = fire.firestore().collection("singleUsers");

    // fire
    //   .firestore()
    //   .collection("questionnaire")
    //   .doc(id)
    //   .get()
    //   .then((docSnapshot) => {
    //     if (!docSnapshot.exists) {
    //       this.props.navigation.navigate("Home");
    //       Alert.alert(
    //         "No profile found",
    //         "Please complete questionnaire first..",
    //         [
    //           {
    //             text: "Take me there",
    //             onPress: () => this.props.navigation.navigate("Questionnaire"),
    //           },
    //         ]
    //       );
    //     }
    //   });

    await docRef
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        const eligibleMatch = data.filter(
          (data) => data.uid !== this.state.uid
        );
        if (this.state.preference === "no preference") {
          const matchPrefFilter = eligibleMatch.filter(
            (data) =>
              data.preference === "no preference" ||
              data.preference === this.state.gender
          );
          if (matchPrefFilter[0] !== undefined && matchPrefFilter[0] !== null) {
            this.setState({ matchID: matchPrefFilter[0].uid });
            this.setState({ matchName: matchPrefFilter[0].displayName });
          }
        } else {
          const filter = data.filter(
            (data) => data.gender === this.state.preference
          );
          const result = filter.filter(
            (data) =>
              data.preference === "no preference" ||
              data.preference === this.state.gender
          );
          if (result[0] !== undefined && result[0] !== null) {
            this.setState({ matchID: result[0].uid });
            this.setState({ matchName: result[0].displayName });
          }
        }
      })
      .catch((error) => console.log(error));

    fire.firestore().collection("singleUsers").doc(id).set({
      uid: id,
      gender: this.state.gender,
      preference: this.state.preference,
      displayName: this.state.displayName,
    });
    if (this.state.matchID !== null) {
      fire
        .firestore()
        .collection("match")
        .doc(id)
        .set({
          uid: id,
          match: this.state.matchID,
          displayName: this.state.matchName,
          startDay: new Date().getDate(),
          startMonth: new Date().getMonth() + 1,
          startYear: new Date().getFullYear(),
          taskDate: 1,
        });
      docRef.doc(id).delete();
      docRef.doc(this.state.matchID).delete();
      fire
        .firestore()
        .collection("match")
        .doc(this.state.matchID)
        .set({
          uid: this.state.matchID,
          match: id,
          displayName: this.state.displayName,
          startDay: new Date().getDate(),
          startMonth: new Date().getMonth() + 1,
          startYear: new Date().getFullYear(),
          taskDate: 1,
        });
      Alert.alert(
        "Its a match!",
        "Your pal display name:  " + this.state.matchName
      );
    } else {
      Alert.alert("Sorry no match found", "Try again later...");
    }
    component.forceUpdate(callback);
  };

  componentDidMount() {
    this.getData();
    this.intervalID = setInterval(this.getData.bind(this), 5000);
    this._isMounted = true;
    this.load();
    this.intervalID = setInterval(this.load.bind(this), 5000);

    if (firebase.auth().currentUser !== null) {
      var id = firebase.auth().currentUser.uid;
      var dbRef = fire.firestore().collection("questionnaire");
      var matchdb = fire.firestore().collection("match");
      const currMonth = new Date().getMonth() + 1;
      const currDate = new Date().getDate();
      matchdb
        .where("uid", "==", id)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          const matchName = data.map((data) => data.displayName);
          const matchID = data.map((data) => data.match);
          const start = data.map((data) => data.startDay);
          const month = data.map((data) => data.startMonth);
          const year = data.map((data) => data.startYear);
          const taskDate = data.map((data) => data.taskDate);
          if (matchID[0] > id) {
            firebase.auth().currentUser.updateProfile({
              photoURL: JSON.stringify(id + matchID[0]),
            });
            this.setState({ chatID: JSON.stringify(id + matchID[0]) });
          } else {
            firebase.auth().currentUser.updateProfile({
              photoURL: JSON.stringify(matchID[0] + id),
            });
            this.setState({ chatID: JSON.stringify(matchID[0] + id) });
          }
          const displayNameData = matchName[0];
          const startDay = start[0];
          const startMonth = month[0];
          const startYear = year[0];
          this.setState({
            matchName: displayNameData,
            startDate: startDay,
            startMonth: startMonth,
            startYear: startYear,
          });

          if (currMonth === Number(this.state.startMonth)) {
            if (currDate === Number(this.state.startDate)) {
              const curr = 1;
              this.setState({ currDay: JSON.stringify(curr) });
            } else {
              const curr = 1 + (currDate - Number(this.state.startDate));
              this.setState({ currDay: JSON.stringify(curr) });
              if (curr === 30) {
                this.setState({ revelation: true });
                this.checkReveal(matchID);
              }
            }
          } else {
            const noDays = new Date(
              this.state.startYear,
              this.state.startMonth,
              0
            ).getDate();
            const curr = currDate + noDays + 1 - Number(this.state.startDate);
            this.setState({ currDay: JSON.stringify(curr) });
            if (curr === 30) {
              this.setState({ revelation: true });
              this.checkReveal(matchID);
            }
          }
          // if (this.state.currDay === "30") {
          //   this.setState({ revelation: "true" });
          // }
          if (taskDate[0] !== new Date().getDate()) {
            this.loadTask(this.state.currDay);
            this.loadFacts(this.state.currDay, matchID);
            matchdb
              .doc(id)
              .set({ taskDate: new Date().getDate() }, { merge: true });
          }
        });
      dbRef
        .where("uid", "==", id)
        .get()
        .then((snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          const displayName = data.map((data) => data.displayname);
          const gender = data.map((data) => data.gender);
          const preference = data.map((data) => data.preference);
          const zodiac = data.map((data) => data.zodiac);
          const hobby = data.map((data) => data.hobby);
          const personality = data.map((data) => data.personality);
          const religion = data.map((data) => data.religion);
          const pet = data.map((data) => data.pet);
          const intro = data.map((data) => data.intro);
          const displayNameData = displayName[0];
          const genderData = gender[0];
          const preferenceData = preference[0];
          const zodiacData = zodiac[0];
          const hobbyData = hobby[0];
          const personalityData = personality[0];
          const religionData = religion[0];
          const petData = pet[0];
          const introData = intro[0];
          if (this._isMounted) {
            this.setState({
              displayName: displayNameData,
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
  }
  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.intervalID);
  }

  render() {
    if (this.state.matchRName !== null) {
      return (
        <View style={styles.container}>
          <Text style={{ fontWeight: "300", fontSize: 20 }}>
            Congratulations!
          </Text>
          <View style={{ borderBottomWidth: 1, width: 100, paddingTop: 10 }}>
            <Image
              source={require("../assets/mysteryicon1.png")}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              Your Pal has revealed themselves!
              {"\n"}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "300",
              fontSize: 16,
              paddingTop: 10,
              paddingBottom: 10,
              textAlign: "center",
            }}
          >
            Name: {this.state.matchRName}
            {"\n"}
            Age: {this.state.matchAge}
            {"\n"}
            School/Company: {this.state.matchSchool}
            {"\n"}
            Course/Job: {this.state.matchCourse}
            {"\n"}
            Telegram Handle: {this.state.matchTele}
            {"\n"}
            Instagram Handle: {this.state.matchInsta}
          </Text>

          <Text style={{ color: "red", textAlign: "center" }}>
            Note: Screenshot this page to save the details!
            {"\n"}
            Tap below to un-match and end the journey!
            {"\n"}
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.unMatch}>
            <Text style={{ color: "#FFF" }}>END</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (this.state.revelation === true) {
      return (
        <View style={styles.container}>
          <Text style={{ fontWeight: "300", fontSize: 20 }}>
            Congratulations!
          </Text>
          <View style={{ borderBottomWidth: 1, width: 100, paddingTop: 10 }}>
            <Image
              source={require("../assets/mysteryicon1.png")}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ textAlign: "center", fontSize: 15 }}>
              Revelation Time!
              {"\n"}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "300",
              fontSize: 16,
              paddingTop: 10,
              paddingBottom: 10,
              textAlign: "center",
            }}
          >
            You have reached the 30 days milestone..
            {"\n"}
            Choose whether to reveal your identity to your pal!
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "space-between",
            }}
          >
            <TouchableOpacity style={styles.yes} onPress={this.loadReveal}>
              <Text style={{ color: "#FFF" }}>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.no} onPress={this.tapNo}>
              <Text style={{ color: "#FFF" }}>NO</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ textAlign: "center" }}>
            {"\n"}
            Note: Mutual agreement is required
            {"\n"}for revelation to take place!
          </Text>
        </View>
      );
    } else if (this.state.exist === true) {
      return (
        <View style={styles.container}>
          <Text>Your Current Pal: {this.state.matchName} </Text>
          <Text>Day {this.state.currDay} / 30</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("ChatRoom")}
          >
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Chat Room</Text>
          </TouchableOpacity>
          <Text></Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Alert.alert(
                "Are you sure?",
                "You will lose any progress established with your current match!",
                [
                  {
                    text: "Yes",
                    onPress: this.forceUnmatch,
                  },
                  {
                    text: "No",
                    onPress: () => this.props.navigation.navigate("Chat"),
                  },
                ]
              )
            }
          >
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Un-Match</Text>
          </TouchableOpacity>
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
                <Text style={{ fontWeight: "300", fontSize: 20 }}>
                  {this.state.header}
                </Text>
                <View
                  style={{ borderBottomWidth: 1, width: 100, paddingTop: 10 }}
                >
                  <Image
                    source={this.state.imageLink}
                    style={{ alignSelf: "center" }}
                  />
                  <Text style={{ textAlign: "center" }}>
                    {" "}
                    {this.state.taskTitle}
                    {"\n"}
                  </Text>
                </View>
                <Text
                  style={{
                    fontWeight: "300",
                    fontSize: 16,
                    paddingTop: 10,
                    paddingBottom: 10,
                    textAlign: "center",
                  }}
                >
                  {this.state.taskDetail}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Button title="OK" color="blue" onPress={this.onClose} />
                </View>
              </Fragment>
            )}
          </Overlay>
        </View>
      );
    } else {
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
            If you see this screen, you either do not have a match or have been
            un-matched.
            {"\n"}
            Click below ONCE to find a new match!
            {"\n"}
          </Text>
          <Button onPress={this.loadMatch} title="OK" />
        </View>
      );
    }
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
    backgroundColor: "#3B5998",
    borderRadius: 4,
    height: 45,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  yes: {
    marginHorizontal: 10,
    backgroundColor: "green",
    borderRadius: 4,
    height: 45,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  no: {
    marginHorizontal: 10,
    backgroundColor: "red",
    borderRadius: 4,
    height: 45,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
