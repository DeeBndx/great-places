import React from "react";
import { View, StyleSheet } from "react-native";

import { Title } from "../components/Texts";

const MapScreen = (props) => {
  return(
    <View>
      <Title>Map Screen</Title>
    </View>
  )
}

const styles = StyleSheet.create({

})

MapScreen.navigationOptions = {
  headerTitle: "Map"
}

export default MapScreen