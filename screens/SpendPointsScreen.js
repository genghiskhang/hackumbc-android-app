import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker"
import { View, Text, TextInput, ImageBackground, Image, Button, StyleSheet, ViewBase } from "react-native";
import RoundedRectButton from "../Components/RoundedRectButton";
import axios from "axios"
import { StatusBar } from "native-base";
// import NFCScanner from "../Components/NFCScanner";

var participantPoints, spendPointsStatus, pointsOptions = [];

const SpendPointsScreen = ({ navigation }) => {
    const [participantID, setParticipantID] = useState("")
    const [outputMsg, setOutputMsg] = useState("")

    const [open, setOpen] = useState("")
    const [value, setValue] = useState("")

    useEffect(() => {
        getPointOptions();
    }, []);

    async function getPointOptions() {
        await axios
            .get(
                "https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/getpointsitems"
            )
            .then((res) => {
                for (let i = 0; i < res.data.body["pointsItems"].length; ++i) {
                    pointsOptions.push({
                        label:res.data.body["pointsItems"][i]["name"],
                        value:res.data.body["pointsItems"][i]["cost"]
                    })
                }
            })
            .then((err) => {
                if (typeof err != 'undefined') {
                    console.log(err)
                }
            })
    }

    async function getPoints() {
        await axios
            .post(
                "https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/connectrds",
                JSON.stringify({
                    "query":`CALL get_points(${participantID});`
                }),
            )
            .then((res) => {
                participantPoints = res.data.body[0][0]
                setOutputMsg(`Participant Points: ${participantPoints}`)
            })
            .then((err) => {
                if (typeof err != 'undefined') {
                    console.log(err)
                }
            })
    }

    async function spendPoints() {
        await axios
            .post(
                "https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/connectrds",
                JSON.stringify({
                    "query":`CALL spend_points(${participantID}, ${value});`
                }),
            )
            .then((res) => {
                participantPoints = res.data.body[0][0]
                spendPointsStatus = res.data.body[0][1]
                if (spendPointsStatus == 'enough_points') {
                    setOutputMsg(`Spent ${value} points! Participant has ${participantPoints} points`)
                }
                else if (spendPointsStatus == 'not_enough_points') {
                    setOutputMsg(`Participant does not have enough points!`)
                }
            })
            .then((err) => {
                if (typeof err != 'undefined') {
                    console.log(err)
                }
            })
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
                <Text style={styles.headingText}>Spend Points</Text>
                <Text style={styles.headingTextAfter}></Text>

                <TextInput
                    autoCapitalize="none"
                    style={styles.input}
                    placeholder="Enter Participant ID"
                    onChangeText={(text) => setParticipantID(text)}
                    value={participantID}
                />
                <View style={{zIndex:1000}}>
                    <DropDownPicker
                        style={styles.dropdown}
                        textStyle = {styles.dropdownText}
                        dropDownContainerStyle={styles.innerDropdown}
                        dropDownDirection="BOTTOM"
                        open={open}
                        value={value}
                        items={pointsOptions}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={pointsOptions}
                    />
                </View>
                <Text style={styles.headingText}>Cost: {value}</Text>

                <RoundedRectButton
                    title="Get Points"
                    onPress={getPoints}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />

                <RoundedRectButton
                    title="Spend Points"
                    onPress={spendPoints}
                    buttonStyle={styles.button}
                    textStyle={styles.buttonText}
                />

                <Text style={styles.headingText}>{outputMsg}</Text>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
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
      dropdown:{
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#2c3840',
        backgroundColor: '#7896ab',
        marginBottom: 10,
        width: '85%',
        alignSelf: 'center',
      },
      innerDropdown:{
        backgroundColor: '#7896ab',
        alignSelf: 'center',
        width: '85%',
      },
      dropdownText:{
        fontSize: 20,
        color: "white",
      },
});

export default SpendPointsScreen;