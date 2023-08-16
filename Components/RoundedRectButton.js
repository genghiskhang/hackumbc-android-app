import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const RoundedRectButton = ({ onPress, title, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#001427',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#335872',
    marginBottom: 10, // Default margin between buttons
    width: '85%', // You can adjust the percentage or use a fixed width value
    height: '10%',
    alignSelf: 'center', // This centers the button horizontally in its parent container
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
});

export default RoundedRectButton;
