import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { ImageBackground } from 'react-native-web';

const NUM_ANNOUNCEMENTS = 10;

const AnnouncementsScreen = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getAnnouncements();
  }, []);

  async function getAnnouncements() {
    await axios
      .post(
        "https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/connectrds",
        JSON.stringify({
          "query":`CALL get_recent_announcements(${NUM_ANNOUNCEMENTS});`
        })
      )
      .then((res) => {
        setAnnouncements(res.data.body)
      })
  }

  const renderItem = ({ item }) => {
    return (
      <>
        <Text>{item[1]}</Text>
        <Text>{item[0]}</Text>
      </>
    );
  };

  return (
    <View
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/light_blue_new.jpg")}
        style={styles.imageBackground}
      >
        <FlatList
          data={announcements}
          renderItem={renderItem}
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
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});

export default AnnouncementsScreen;
