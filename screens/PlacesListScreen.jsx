import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useSelector } from "react-redux";

import HeaderButton from "../components/UI/HeaderButton";
import { Title } from "../components/Texts";
import ScreenWrapper from "../components/UI/ScreenWrapper";
import SpotItem from "../components/SpotItem";
import Colors from "../constants/Colors";

const PlacesListScreen = (props) => {
  const spots = useSelector((state) => state.spots.spots);

  return (
    <ScreenWrapper>
      <FlatList
        data={spots}
        keyExtractor={(item) => item.id}
        renderItem={(x) => {
          const y = x.item;

          return <SpotItem image={y.imageUrl} heading={y.title} address={y.address} />;
        }}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  
});

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
