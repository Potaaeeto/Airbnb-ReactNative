import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomInput from "../components/CustomInput";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // stocker une info = creer une variable qui provoque un rafraichissement lorsqu'on change de valeur
  const [error, setError] = useState("");

  // Gestion de soumission du form
  const handleSubmit = async () => {
    if (email && password) {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPassword = await AsyncStorage.getItem("password");
        console.log(storedEmail);
        console.log(storedPassword);
        if (email === storedEmail && password === storedPassword) {
          console.log("Login successful");
        } else {
          setError("Invalid email or password!");
        }
      } catch (error) {
        console.log(error.response.data.error);
        // if (error.response.data.error === "Unauthorized") {
        //   setError("Invalid email or password!");
        // }
      }
    } else {
      setError("Missing parameters");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <KeyboardAwareScrollView
        style={{
          marginTop: Platform === "ios" ? 0 : Constants.statusBarHeight,
        }}
      >
        <View style={styles.container}>
          <Image
            source={require("../assets/imgs/airbnb-logo.png")}
            style={{ height: 120, width: 120, marginTop: 30 }}
          />

          <Text style={styles.title}>Sign In</Text>

          <View style={styles.inputContainer}>
            <CustomInput
              placeholder={"Email"}
              value={email}
              setState={setEmail}
            />

            <CustomInput
              placeholder={"Password"}
              value={password}
              setState={setPassword}
              password
            />
          </View>

          {/* Checker si tous les champs sont remplis ou pas */}
          {error ? (
            <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
          ) : null}

          <Pressable
            style={styles.signInButton}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#7A7A7A",
              }}
            >
              Sign In
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              return navigation.navigate("SignUp");
            }}
          >
            <Text style={{ color: "#7A7A7A", marginBottom: 50 }}>
              No account? Register
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#717171",
    marginVertical: 30,
  },
  inputContainer: {
    // backgroundColor: "pink",
    width: "100%",
    gap: 25,
    alignItems: "center",
    marginVertical: 50,
  },
  signInButton: {
    // backgroundColor: "pink",
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#EB5A62",
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginVertical: 20,
  },
});

export default SignInScreen;
