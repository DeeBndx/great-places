import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const ScreenWrapper = (props) => {
  return(
    <View style={{...styles.screen, ...props.style}}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.Black,
  },
})

export default ScreenWrapper