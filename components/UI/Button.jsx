import React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "../Texts";
import Colors from "../../constants/Colors";

const Button = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onPress} disabled={props.disabled}>
      <View style={{ ...styles.button, ...props.style, opacity: props.disabled ? 0.47 : 1 }}>
        {props.icon ? (
          <MaterialIcons
            name={props.icon}
            size={props.iconSize ? props.iconSize : 24}
            color={props.color ? props.color : Colors.Primary}
            style={{ marginRight: 4 }}
          />
        ) : null}
        <Text style={{ ...styles.text, color: props.color ? props.color : Colors.Secondary }}>{props.title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.Accent,
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },

  text: {
    fontFamily: "poppinsBold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontSize: 14,
  },
});

export default Button;
