import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Onboarder from "./Onboarder";
import List from "./List";
import Single from "./Single";

const Stack = createNativeStackNavigator();

const Screens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarder"
        component={Onboarder}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Single" component={Single} />
    </Stack.Navigator>
  );
};

export default Screens;
