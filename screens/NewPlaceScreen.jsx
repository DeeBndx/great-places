import React from "react";
import { View, StyleSheet } from "react-native";

import { Title } from "../components/Texts";

const NewPlaceScreen = (props) => {
  return(
    <View>
      <Title>New Place Screen</Title>
    </View>
  )
}

const styles = StyleSheet.create({

})

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add A New Spot"
}

export default NewPlaceScreen