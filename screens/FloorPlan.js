import React from "react";
import {
  View,
  Text,
  Button,
  Linking,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import RoundedRectButton from "../Components/RoundedRectButton";
import { StatusBar } from "native-base";
import imageBack from "../assets/light_blue_new.jpg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function FloorPlan({ navigation }) {
  const openFloor = (floor) => {
    var url;
    switch (floor) {
      case 0:
        url =
          "https://ilsb.umbc.edu/wp-content/uploads/sites/546/2018/11/ILSB-Floor-Plans-Oct-2018_Part2.jpg";
        break;

      case 1:
        url =
          "https://ilsb.umbc.edu/wp-content/uploads/sites/546/2018/11/ILSB-Floor-Plans-Oct-2018_Part3.jpg";
        break;

      case 2:
        url =
          "https://ilsb.umbc.edu/wp-content/uploads/sites/546/2018/11/ILSB-Floor-Plans-Oct-2018_Part4.jpg";
        break;

      case 3:
        url =
          "https://ilsb.umbc.edu/wp-content/uploads/sites/546/2018/11/ILSB-Floor-Plans-Oct-2018_Part5.jpg";
        break;

      default:
        url = null; // Handle other cases if needed
        break;
    }
    return url;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageBack}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <StatusBar/>
        <Image
          source={require("../assets/dog_logo.png")}
          style={styles.imageHeading}
        />

        <Text style={styles.headingTextBefore}></Text>
        <Text style={styles.headingText}>Floor Plan</Text>
        <Text style={styles.headingTextAfter}></Text>

        <Image style={styles.imageFloorPlans} source={{ uri: openFloor(0) }} />
        <Image style={styles.imageFloorPlans} source={{ uri: openFloor(1) }} />
        <Image style={styles.imageFloorPlans} source={{ uri: openFloor(2) }} />
        <Image style={styles.imageFloorPlans} source={{ uri: openFloor(3) }} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Add this to make sure the container expands to full screen
    alignItems: "center",
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
  imageFloorPlans: {
    width: windowWidth / 1.2,
    height: windowHeight / 5.3,
    margin: windowHeight / 90,
    alignSelf: "center",
    padding: 10,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
  }, 
  headingText: {
    textAlign: "center",
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

export default FloorPlan;
