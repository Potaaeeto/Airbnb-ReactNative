import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

// Import des composants
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeScreen from "./screens/HomeScreen";

// une fonction qui retourne un objet dans lequel on trouve les propriétés Navigator et Screen
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Conteneur de tous les écrans, contient toute la navigation
    <NavigationContainer>
      {/* Permet de naviguer entre plusieurs ecrans */}
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
