import React from "react";
import { View, StyleSheet, Image } from "react-native";
import MapPreview from "../components/MapPreview";

import { Heading, SubHeading, Title, Text } from "../components/Texts";
import ScreenWrapper from "../components/UI/ScreenWrapper";

const PlacesDetailScreen = (props) => {
  const spotData = props.navigation.getParam("item");

  const locationForMap = {
    lat: spotData.lat,
    lng: spotData.lng
  }

  const navigateToMapHandler = () => {
    props.navigation.navigate("Map", {readonly: true, initialLocation: locationForMap})
  }
  
  return (
    <ScreenWrapper>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: spotData.imageUri }} />
        <MapPreview style={styles.map} location={locationForMap} onPress={navigateToMapHandler} />
      </View>
      <View style={{ padding: 24 }}>
        <View style={styles.quickInfo}>
          <View style={styles.spotName}>
            <Heading>{spotData.title}</Heading>
          </View>
          <View style={styles.spotLocation}>
            <SubHeading>{spotData.address}</SubHeading>
            <Text>
              {"\u00B0"}
              {spotData.lat}, {spotData.lng}
            </Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row"
  },
  image: {
    height: 400,
    width: "50%",
  },
  map: {
    height: 400,
    width: "50%"
  }
});

PlacesDetailScreen.navigationOptions = {
  headerTitle: "That One Spot",
};

export default PlacesDetailScreen;
