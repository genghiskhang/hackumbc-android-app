import React from 'react';
import { View, Text } from 'react-native';
import styles from '../Styles/WelcomeTextStyle.js'; // Import the styles.js file

const WelcomeText = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>hackUMBC</Text>
      </View>
    </View>
  );
};

export default WelcomeText;
