import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

const BodyText = (props) => {
  return <Text style={{...styles.text, ...props.style}}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "poppins",
    fontSize: 20,
    color: Colors.Secondary
  }
});

export default BodyText;
