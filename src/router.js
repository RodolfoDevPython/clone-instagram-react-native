import * as React from 'react';
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';


import logo from "./assets/instagram.png"

import Feed from "./pages/Feeds";

const Stack = createStackNavigator();


//link de docs https://reactnavigation.org/docs/stack-navigator/
// https://reactnavigation.org/docs/stack-navigator/#

export default function MyStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ title: <Image source={ logo} />, headerTitleAlign: "center", headerStyle: { backgroundColor: "#dddddd" } }} >
            <Stack.Screen name="Feeds" component={Feed} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

