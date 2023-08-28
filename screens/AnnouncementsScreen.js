import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal'

const NUM_ANNOUNCEMENTS = 10;

const AnnouncementsScreen = () => {
  const [announcements, setAnnouncements] = useState([[
    "Example Author", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam " +
    "volutpat mi et ex molestie, vel euismod sapien scelerisque. Mauris " +
    "sit amet vestibulum nibh. Vestibulum leo turpis, semper a tortor eu, " +
    "congue congue diam. Phasellus nec ipsum pretium, egestas mi eu, sodales " +
    "est. In vestibulum ornare ipsum sed posuere. Morbi semper elit non " +
    "efficitur facilisis. Phasellus accumsan sem vitae velit egestas vehicula. " +
    "Suspendisse eleifend scelerisque dui. Sed a facilisis sapien. Cras aliquet " +
    "mi eu placerat aliquet. Nullam consectetur congue fringilla. Vivamus " +
    "porttitor semper elit, porta egestas eros hendrerit non. Integer eget " +
    "magna malesuada, ullamcorper nisl eget, congue est. Maecenas velit lectus, " +
    "tincidunt at euismod nec, commodo congue mi."
  ]]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState();

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
      <TouchableOpacity
        style={styles.announecementsContainer}
        onPress={() => [setModalVisible(true), setModalItem(item[1])]}
      >
        <Text numberOfLines={2} style={styles.announcementsBody}>{item[1]}</Text>
        <Text style={styles.announcementsAuthor}>{item[0]}</Text>
      </TouchableOpacity>
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
          style={styles.announcementsList}
          data={announcements}
          renderItem={renderItem}
        />
        <Modal
          isVisible={modalVisible}
          backdropOpacity={0.3}
          hideModalContentWhileAnimating={true}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalItem}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </Modal>
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
  announcementsList: {
    marginTop:50,
  },
  announecementsContainer: {
    borderRadius:10,
    flex:1,
    backgroundColor:"white",
    marginTop:20,
    marginRight:20,
    marginLeft:20,
    padding:10,
  },
  announcementsBody: {
    color:"black",
    fontSize:20,
  },
  announcementsAuthor: {
    fontSize:10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AnnouncementsScreen;
