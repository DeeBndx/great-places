import React from "react";
import { View, StyleSheet } from "react-native";

import { Title } from "../components/Texts";

const PlacesDetailScreen = (props) => {
  return(
    <View>
      <Title>Places Detail Screen</Title>
    </View>
  )
}

const styles = StyleSheet.create({

})

PlacesDetailScreen.navigationOptions = {
  headerTitle: "That One Spot"
}

export default PlacesDetailScreen