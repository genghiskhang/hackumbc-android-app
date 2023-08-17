// HomeScreen.js
import React from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  Linking,
  StyleSheet,
  Dimensions,
} from "react-native";
import RoundedRectButton from "../Components/RoundedRectButton";

import imageBack from "../assets/light_blue_new.jpg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function HomeScreen({ navigation }) {
  const OpenInstagram = () => {
    // Check if the URL is valid and then open it in the browser
    Linking.openURL("https://www.instagram.com/hackUMBC/").catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const GoToAnnouncementsScreen = () => {
    navigation.navigate("Additional", { screen: "AnnouncementsScreen" });
  };

  const GoToFloorPlan = () => {
    navigation.navigate("Additional", { screen: "FloorPlan" });
  };

  const GoToSchedule = () => {
    navigation.navigate("ScheduleScreen");
  };

  const OpenDiscord = () => {
    //Linking.openURL("DISCORD INVITE LINK HERE").catch((err) =>
    //  console.error("An error occurred", err)
    //);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageBack}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <Image
          source={require("../assets/dog_logo.png")}
          style={styles.imageHeading}
        />
        <Text style={styles.headingText}>hackUMBC</Text>

        <RoundedRectButton
          title="Announcements"
          onPress={GoToAnnouncementsScreen}
          buttonStyle={styles.customButton}
          textStyle={styles.customButtonText}
        />

        <RoundedRectButton
          title="ILSB Floor Plan"
          onPress={GoToFloorPlan}
          buttonStyle={styles.customButton}
          textStyle={styles.customButtonText}
        />

        <RoundedRectButton
          title="Schedule"
          onPress={GoToSchedule}
          buttonStyle={styles.customButton}
          textStyle={styles.customButtonText}
        />

        <RoundedRectButton
          title="Discord Invite Link"
          onPress={OpenDiscord}
          buttonStyle={styles.customButton}
          textStyle={styles.customButtonText}
        />

        <RoundedRectButton
          title="hackUMBC Instagram"
          onPress={OpenInstagram}
          buttonStyle={styles.customButton}
          textStyle={styles.customButtonText}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  input: {
    backgroundColor: "rgba( 119, 95, 95, 0.35 )",
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  titleText: {
    flex: 0.4,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
  imageBackground: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    position: "absolute",
  },
  imageHeading: {
    width: 200,
    height: 120,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
  },
  headingText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
