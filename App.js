import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import OrganizerScreen from "./screens/OrganizerScreen";
import FloorPlan from "./screens/FloorPlan";
import CheckInScreen from "./screens/CheckInScreen";
import ScanNFCScreen from "./screens/ScanNFCScreen";
import SpendPointsScreen from "./screens/SpendPointsScreen";
import AnnouncementsScreen from "./screens/AnnouncementsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const App = () => {
  const AdditionalScreens = () => {
    return (
      <Stack.Navigator
        screenOptions={
          {headerShown:false}
        }
      >
        <Stack.Screen name="FloorPlan" component={FloorPlan} />
        <Stack.Screen name="OrganizerScreen" component={OrganizerScreen} />
        <Stack.Screen name="CheckInScreen" component={CheckInScreen} />
        <Stack.Screen name="ScanNFCScreen" component={ScanNFCScreen} />
        <Stack.Screen name="SpendPointsScreen" component={SpendPointsScreen} />
        <Stack.Screen name="AnnouncementsScreen" component={AnnouncementsScreen} />
        {/* Add more additional screens here, when navigating use navigation.navigate("Additional", { screen: "screen" });*/}
      </Stack.Navigator>
    );
  };

  const TabBar = () => {
    return (
      <Tab.Navigator
        screenOptions={
          {headerShown:false}
        }
      >
        <Tab.Screen
          styles={styles.tabBar}
          options={{
            tabBarLabel: "",
            tabBarIcon({ focused, color, size }) {
              return (
                <Ionicons
                  name={focused ? "home" : "home"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "",
            tabBarIcon({ focused, color, size }) {
              return (
                <Ionicons
                  name={focused ? "calendar-outline" : "calendar-outline"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
          name="ScheduleScreen"
          component={ScheduleScreen}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "",
            tabBarIcon({ focused, color, size }) {
              return (
                <Ionicons
                  name={focused ? "log-in-outline" : "log-in-outline"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
          name="Login"
          component={LoginScreen}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator 
        screenOptions={
          {headerShown:false}
        }
        headerMode
      >
        <RootStack.Screen name="Main" component={TabBar} />
        <RootStack.Screen name="Additional" component={AdditionalScreens} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {},
});
export default App;
