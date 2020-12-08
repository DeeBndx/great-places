import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

import { Title } from "../components/Texts";

const MapScreen = (props) => {
  const [SelectedLocation, setSelectedLocation] = useState();
  const [FailAttemptCount, setFailAttemptCount] = useState(0);

  const isReadonly = props.navigation.getParam("readonly");
  const initialLocation = props.navigation.getParam("initialLocation");
  
  let mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocation = useCallback(() => {
    if (!SelectedLocation) {
      let alertText = {
        title: "...",
        body: "...",
        btns: [{ text: "Please come back" }],
      };

      switch (FailAttemptCount) {
        case 0:
          alertText = {
            title: "No Spot Marked",
            body: "Please mark a spot on the map",
            btns: [{ text: "Okay" }],
          };
          break;

        case 1:
          alertText = {
            title: "Still no spot marked",
            body: "I understand you might have misclicked. Try again",
            btns: [{ text: "Oops, I'll try again" }],
          };
          break;
        case 2:
          alertText = {
            title: "I'm gonna help you out a bit",
            body: "Just tap the screen where you want a marker",
            btns: [{ text: "I got it" }],
          };
          break;
        case 3:
          alertText = {
            title: "Dude! Seriously?",
            body: "You're doing this on purpose now, aren't you?",
            btns: [{ text: "Maybe, I don't know" }],
          };
          break;
        case 4:
          alertText = {
            title: "You're a lost cause, dude",
            body: "I'm giving up",
            btns: [{ text: "But..." }],
          };
          break;
        case 5:
          alertText = {
            title: "...",
            body: "...",
            btns: [{ text: "It's gonna be like that!" }],
          };
          break;
        case 6:
          alertText = {
            title: "...",
            body: "...",
            btns: [{ text: "Please come back" }],
          };
      }
      if (FailAttemptCount <= 6) {
        setFailAttemptCount((value) => value + 1);
      }
      Alert.alert(alertText.title, alertText.body, alertText.btns);
      return;
    }
    props.navigation.navigate("NewPlace", { pickedLocation: SelectedLocation });
  }, [SelectedLocation, FailAttemptCount]);

  useEffect(() => {
    props.navigation.setParams({
      saveLocation: savePickedLocation,
    });
  }, [savePickedLocation]);

  let markerCoordinates;

  if(initialLocation){
    markerCoordinates = {
      latitude: initialLocation.lat,
      longitude: initialLocation.lng,
    }
  }
  
  if (SelectedLocation) {
    markerCoordinates = {
      latitude: SelectedLocation.lat,
      longitude: SelectedLocation.lng,
    };

    mapRegion = {
      ...mapRegion,
      latitude: SelectedLocation.lat,
      longitude: SelectedLocation.lng,
    };
  }

  return (
    <MapView style={styles.map} region={mapRegion} onPress={isReadonly ? null : selectLocationHandler}>
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

MapScreen.navigationOptions = (navData) => {
  const saveFunc = navData.navigation.getParam("saveLocation");
  const isReadonly = navData.navigation.getParam("readonly");
  
  return {
    headerTitle: "Map",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Add Spot" iconName="check" onPress={isReadonly ? null : saveFunc} />
      </HeaderButtons>
    ),
  };
};

export default MapScreen;
