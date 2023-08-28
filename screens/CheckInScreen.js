import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, Image, Button, StyleSheet, ViewBase, Dimensions } from "react-native";
import RoundedRectButton from "../Components/RoundedRectButton";
import axios from "axios";
import { StatusBar } from "native-base";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

var firstName, lastName, checkInStatus;

const CheckInScreen = ({ navigation }) => {
    const [email, setEmail] = useState("testemail@gmail.com");
    const [errorMsg, setErrorMsg] = useState("");
    const [checkInStatusString, setCheckInStatusString] = useState("")

    const accessToken = global.ACCESSTOKEN;
    const username = global.USERNAME;


    function scanQR (){
        //scan qr code
        // populate email text box with scanned code
    }

    async function checkRegistrationStatus (){
      //search database using email address
      //find first and last name
      //check if already checked in
      //if not checked in, call checkIn()
      await axios
        .post(
          "https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/connectrds",
          JSON.stringify({
            "query":`CALL get_full_name_by_email('${email}');`
          }),
        )
        .then((res) => {
          firstName = res.data.body[0][0]
          lastName = res.data.body[0][1]
        })
        .then((err) => {
          if (typeof err != 'undefined') {
            console.log(JSON.stringify(err))
          }
        })
      await axios
        .post(
          "https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/connectrds",
          JSON.stringify({
            "query":`CALL get_checked_in_status('${email}');`
          }),
        )
        .then((res) => {
          checkInStatus = res.data.body[0][0]
          if (checkInStatus == 'T') {
            setCheckInStatusString(`${firstName} ${lastName} is checked in`)
          }
          else if (checkInStatus == 'F') {
            setCheckInStatusString(`${firstName} ${lastName} is not checked in. Checking in now`)
            checkIn()
            if (checkInStatus == 'T') {
              setCheckInStatusString(`${firstName} ${lastName} is checked in`)
            }
            else if (checkInStatus == 'F') {
              setCheckInStatusString(`${firstName} ${lastName} is not checked in. Checking in now`)
            }
          }
        })
        .then((err) => {
          if (typeof err != 'undefined') {
            console.log(JSON.stringify(err))
          }
        })
    }
    async function checkIn (){
      //post req: check in participant
      //(update registration's checkIn status to "true")
      await axios
        .post(
          "https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/connectrds",
            JSON.stringify({
              "query":`CALL check_in_user('${email}');`
            }),
        )
        .then((res) => {})
        .then((err) => {
          if (typeof err != 'undefined') {
            console.log(JSON.stringify(err))
          }
        })
    }
    function assignNFC (){
        //assign new NFC tag to participant
            //write participant ID to tag
            //lock tag
    }

    function goBack (){
        //go back to OrganizerScreen
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
        <ImageBackground
            source={require("../assets/light_blue_new.jpg")}
            style={styles.imageBackground}
        >
            <StatusBar/>
            <Image
            source={require("../assets/dog_logo.png")}
            style={styles.imageHeading}
            />

            <Text style={styles.headingText}>Participant Check In{"\n"}{username}</Text>

            <TextInput
                autoCapitalize="none"
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />

            <RoundedRectButton
                title="Scan QR Code"
                onPress={scanQR}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

            <RoundedRectButton
                title="Check In Participants"
                onPress={checkRegistrationStatus}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

            <RoundedRectButton
                title="Assign NFC Tag"
                onPress={assignNFC}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
            />

            <Text style={styles.headingText}>{checkInStatusString}</Text>

        </ImageBackground>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
      },
      errorText:{
        padding:5,
        flex: 0.3,
        textAlign: "center",
        fontSize: 12,
        color:"red"
      },
      input: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginTop: 0,
        margin: 40,
        padding:10,
        fontSize:20,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        color: "white"
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        borderRadius: 4,
        elevation: 3,
      },
      titleText: {
        flex: 0.4,
        textAlign: "center",
        fontSize: 32,
        fontWeight: "bold",
      },
      buttonText: {
        textAlign: "center",
        fontSize: 20,
        color: "white",
      },
      imageBackground: {
        flex: 1,
        height: windowHeight,
        width: windowWidth,
        position: "absolute",
      },
      imageHeading: {
        width: 100,
        height: 60,
        marginTop: "5%",
        alignSelf: "center",
      },
      headingText: {
        textAlign: "center",
        marginBottom: 20,
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
      },
      headingTextAfter: {
        content: "{",
      },
      headingTextBefore: {
        content: "{",
      },
  });

export default CheckInScreen;
