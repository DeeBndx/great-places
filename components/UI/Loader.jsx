import React from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import Colors from "../../constants/Colors";

const Loader = (props) => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.Accent} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: Colors.Primary,
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  textCenter: { textAlign: "center", marginVertical: 8 },
});

export default Loader;
