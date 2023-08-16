import React, { useState } from "react";
import { View, Text, TextInput, ImageBackground, Image, Button, TouchableOpacity, StyleSheet, ViewBase } from "react-native";
import RoundedRectButton from "../Components/RoundedRectButton";
import { useRoute } from '@react-navigation/native';

function OrganizerScreen ({ navigation }) {
  const accessToken = global.ACCESSTOKEN;
  const username = global.USERNAME;

  const GoToCheckIn = () => {
    navigation.navigate("Additional", { screen: "CheckInScreen" });
  };

  const GoToScanNFCScreen = () => {
    navigation.navigate("Additional", { screen: "ScanNFCScreen" });
  };

  const GoToSpendPointsScreen = () => {
    navigation.navigate("Additional", { screen: "SpendPointsScreen" })
  }

  const GoBack = () => {
    global.ACCESSTOKEN = "";
    global.USERNAME = "";
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/light_blue_new.jpg")}
        style={styles.imageBackground}
      >
        <Image
          source={require("../assets/dog_logo.png")}
          style={styles.imageHeading}
        />

        <Text style={styles.headingTextBefore}></Text>
        <Text style={styles.headingText}>Welcome Back{"\n"}{username}</Text>
        <Text style={styles.headingTextAfter}></Text>

        <RoundedRectButton
            title="Check In Participant"
            onPress={GoToCheckIn}
            buttonStyle={styles.button}
          />
        
        <RoundedRectButton
            title="Scan NFC Tag"
            onPress={GoToScanNFCScreen}
            buttonStyle={styles.button}
          />
        
        <RoundedRectButton
            title="Spend Points"
            onPress={GoToSpendPointsScreen}
            buttonStyle={styles.button}
          />

        <TouchableOpacity style={styles.logoutButton} onPress={GoBack}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>

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
  titleText: {
    flex: 0.5,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  logoutButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8D0801',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#BF0603',
    marginBottom: 20, // Default margin between buttons
    width: '85%', // You can adjust the percentage or use a fixed width value
    height: '10%',
    alignSelf: 'center', // This centers the button horizontally in its parent container
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

export default OrganizerScreen;
