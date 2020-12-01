import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { Heading, Text } from "./Texts";

import Button from "./UI/Button";

const SpotItem = (props) => {
  return Platform.OS === "android" ? (
    <TouchableNativeFeedback style={props.style}>
      <View>
        <Image style={styles.image} source={{ uri: props.image }} />
        <View style={styles.content}>
          <Heading style={styles.text}>{props.heading}</Heading>
          <Text style={styles.text}>{props.address}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity style={props.style}>
      <View>
        <Image style={styles.image} source={{ uri: props.image }} />
        <View style={styles.content}>
          <Heading style={styles.text}>{props.heading}</Heading>
          <Text style={styles.text}>{props.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: Dimensions.get("window").height * 0.4,
    // maxHeight: 240,
  },

  content: {
    backgroundColor: Colors.Primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  text: {
    color: Colors.Secondary,
  },
});

export default SpotItem;
