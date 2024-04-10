import {
  Pressable,
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";

import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

// Import des components
import CustomInput from "../components/CustomInput";

// Import des images
import airbnbLogo from "../assets/imgs/airbnb-logo.png";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // stocker une info = creer une variable qui provoque un rafraichissement lorsqu'on change de valeur
  const [error, setError] = useState("");

  // Gerer la soumission du form
  const handleSubmit = async () => {
    // Checker si l'erreur persiste ou pas, sinon disparition de l'erreur quand appuie sur le bouton
    setError("");
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        // Faire une requete avec trycatch
        try {
          const response = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          console.log(response.data);
          if (response.data.token) {
            alert("Account created!");
            // const email = response.data.email;
            // const password = response.data.token;
            // console.log(email);
            // console.log(password);
            await AsyncStorage.setItem("getEmail", response.data.email);
            await AsyncStorage.setItem("getPassword", response.data.token);
            // const result = await AsyncStorage.getItem("getEmail");
            // const resultbis = await AsyncStorage.getItem("getPassword");
            // console.log(result);
            // console.log(resultbis);
          }
        } catch (error) {
          if (error.response.data) {
            setError(error.response.data.error);
          }
        }
      } else {
        setError("Passwords aren't identicals");
      }
    } else {
      setError("Missing parameters");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <KeyboardAwareScrollView
        style={{
          marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        }}
      >
        <View style={styles.container}>
          <Image
            source={airbnbLogo}
            style={{ height: 120, width: 120, marginTop: 30 }}
          />
          <Text style={styles.title}>Sign Up</Text>

          <View style={styles.inputContainer}>
            <CustomInput
              placeholder={"Email"}
              value={email}
              setState={setEmail}
            />

            <CustomInput
              placeholder={"Username"}
              value={username}
              setState={setUsername}
            />

            <TextInput
              style={styles.inputDesc}
              placeholder="Describe yourself in a few words..."
              multiline={true}
              textAlignVertical="top"
              onChangeText={(text) => {
                setDescription(text);
              }}
              value={description}
            />

            <CustomInput
              placeholder={"Password"}
              value={password}
              setState={setPassword}
              password
            />

            <CustomInput
              placeholder={"Confirm password"}
              value={confirmPassword}
              setState={setConfirmPassword}
              password
            />
          </View>

          {/* Checker si tous les champs sont remplis ou pas */}
          {error ? (
            <Text style={{ color: "red", marginTop: 20 }}>{error}</Text>
          ) : null}

          {/* Bouton Sign Up */}
          <Pressable
            style={styles.signUpButton}
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
              Sign Up
            </Text>
          </Pressable>

          {/* Already have an account */}
          <Pressable
            onPress={() => {
              return navigation.navigate("SignIn");
            }}
          >
            <Text style={{ color: "#7A7A7A", marginBottom: 50 }}>
              Already have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 2,
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
    marginBottom: 20,
  },
  inputDesc: {
    height: 100,
    width: "80%",
    borderColor: "#F8BAC0",
    borderWidth: 1,
    marginTop: 10,
  },
  signUpButton: {
    // backgroundColor: "pink",
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#EB5A62",
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginVertical: 20,
  },
});

export default SignUpScreen;
