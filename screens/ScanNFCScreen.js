import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, Image, Button, StyleSheet, ViewBase } from "react-native";
import RoundedRectButton from "../Components/RoundedRectButton";
import axios from "axios";
import { StatusBar } from "native-base";
import { NFCScanner } from "../Components/NFCScanner"

const ScanNFCScreen = ({ navigation }) => {
    var participant_id = "9900";
    var selectedEvent = "dinner";
    var timeStamp = "2023-08-14, 01:52"
    console.log(timeStamp)
    const access_token = global.ACCESSTOKEN;
    const username = global.USERNAME;

    function loadDropdown () {
        //populate list of events for a dropdown menu
        //get request to lambda will return a list of preloaded events based on the time
    }

    function scanTag () {
        //scan nfc tag to get participant_id
        sendScan()
    }   

    async function sendScan () {
      //send post req with: 
          //current organizer's accessToken
          //event name from dropdown menu 
          //participant_id from nfc tag 
      await axios
        .post(
          "https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/connectrds",
          JSON.stringify({
            "query":`CALL user_nfc_scan(${participant_id}, '${selectedEvent}', '${timeStamp}');`
          }),
        )
        .then((res) => {})
        .then((err) => {
          if (typeof err != 'undefined') {
            console.log(err)
          }
        })
    }

    function goBack () {
        navigation.GoBack();
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

        <Text style={styles.headingTextBefore}></Text>
        <Text style={styles.headingText}>Scan NFC Tag/n{username}</Text>
        <Text style={styles.headingTextAfter}></Text>

//        <NFCScanner/>
    
        <RoundedRectButton
            title="Scan Tag"
            onPress={scanTag}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
        />

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
      imageBackground: {
        flex: 1,
        resizeMode: "cover",
        width: "100%",
        height: "100%",
      },
      imageHeading: {
        width: 100,
        height: 60,
        marginBottom: 10,
        marginTop: "5%",
        alignSelf: "center",
      },
      input: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        margin: 40,
        padding: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
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
      headingText: {
        textAlign: "center",
        marginBottom: 40,
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

export default ScanNFCScreen;
