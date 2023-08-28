import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card, Avatar } from "react-native-paper";
import { Dialog } from "@rneui/themed";
import axios from "axios";
import { StatusBar } from "native-base";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Schedule = () => {
  const [items, setItems] = useState({});

  const [nameText, setNameText] = useState("");
  const [locationText, setLocationText] = useState("");
  const [hostText, setHostText] = useState("");
  const [dialogText, setDialogText] = useState("");
  const [visible, setVisible] = useState(false);

  const toggleDialog = (item) => {
    if (item !== "") {
      setNameText(item.name);
      setLocationText(item.location);
      setHostText(item.host);
      setDialogText(item.description);
    }
    setVisible(!visible);
  };

  const loadItems = async (day) => {
    const url =
      "https://fh149c2qc4.execute-api.us-east-2.amazonaws.com/prod/org/getevents";
    let date = new Date();

    let auth_header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      dataType: "json",
      "X-Amz-Date": date.toISOString(),
    };

    let items = await axios.get(url, auth_header).catch((err) => {
      console.log(err);
    });
    console.log(items.data.body);
    setItems(items.data.body);
    // setItems({
    //   "2023-09-22": [
    //     {
    //       name: "How I microsofted",
    //       host: "Joe Microsoft",
    //       description: "Learn about how hard it was to be microsoft",
    //     },
    //     {
    //       name: "Say no to drugs",
    //       host: "snoop dogg",
    //       description: "Learn from someone else's mistakes!",
    //     },
    //   ],
    //   "2023-09-23": [
    //     {
    //       name: "Swag event",
    //       host: "Hrabowski",
    //       description:
    //         "Be shot at with cool shirts at a high velocity. Good luck!",
    //     },
    //   ],
    // });
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card onPress={() => toggleDialog(item)}>
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{ flex: 1, flexDirection: "column", flexWrap: "wrap" }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 24 }}>
                  {item.name}
                </Text>
                <Text>{item?.time}</Text>
                <Text style={{ fontStyle: "italic" }}>
                  Click for more information
                </Text>
              </View>
              <Avatar.Text label={item.host.substring(0, 1).toUpperCase()} />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar/>
      <Dialog isVisible={visible} onBackdropPress={() => toggleDialog("")}>
        <Dialog.Title title={nameText} />
        <Text>Location: {locationText}</Text>
        <Text style={{ fontStyle: "italic" }}>Hosted by {hostText}</Text>
        <Text>{dialogText}</Text>
      </Dialog>

      <Agenda
        minDate={"2023-09-23"}
        maxDate={"2023-09-24"}
        pastScrollRange={0}
        futureScrollRange={0}
        items={items}
        loadItemsForMonth={loadItems}
        selected={"2023-09-23"}
        renderItem={renderItem}
        showClosingKnob={true}
      />
    </View>
  );
};

export default Schedule;
