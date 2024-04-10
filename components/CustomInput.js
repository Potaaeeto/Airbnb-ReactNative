import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomInput = ({ value, setState, placeholder, password }) => {
  return (
    <TextInput
      secureTextEntry={password ? true : false}
      style={styles.input}
      placeholder={placeholder}
      onChangeText={(text) => {
        setState(text);
      }}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 35,
    borderColor: "#F8BAC0",
    borderBottomWidth: 1,
    // borderColor: "red",
    // borderWidth: 2,
  },
});

export default CustomInput;
