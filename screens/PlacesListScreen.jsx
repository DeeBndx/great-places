import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/UI/HeaderButton";
import { Title } from "../components/Texts";

const PlacesListScreen = (props) => {
  return (
    <View>
      <Title>Places List Screen</Title>
    </View>
  );
};

const styles = StyleSheet.create({});

PlacesListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Spots",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Spot"
          iconName="add-box"
          onPress={() => {
            navData.navigation.navigate("NewPlace");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default PlacesListScreen;
