import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={24}
      color={Platform.OS === "android" ? Colors.Primary : Colors.Primary}
    />
  );
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;
