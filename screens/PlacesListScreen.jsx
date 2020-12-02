import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useDispatch, useSelector } from "react-redux";
import { loadSpots } from "../store/actions/spotActions";

import HeaderButton from "../components/UI/HeaderButton";
import { Title } from "../components/Texts";
import ScreenWrapper from "../components/UI/ScreenWrapper";
import SpotItem from "../components/SpotItem";
import Colors from "../constants/Colors";

const PlacesListScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSpots());
  }, [dispatch]);

  const spots = useSelector((state) => state.spots.spots);

  return (
    <ScreenWrapper>
      <FlatList
        data={spots}
        keyExtractor={(item) => item.id}
        renderItem={(item) => {
          const x = item.item;
          return <SpotItem image={x.imageUri} heading={x.title} address={x.address} />;
        }}
      />
    </ScreenWrapper>
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
