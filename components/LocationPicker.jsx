import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import ScreenWrapper from "./UI/ScreenWrapper";
import Button from "./UI/Button";
import { Text } from "./Texts";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [Loading, setLoading] = useState(false);
  const [PickedLocation, setPickedLocation] = useState();

  const locationPickedFromMap = props.navigation.getParam("pickedLocation");

  const { onLocationPicked } = props;

  useEffect(() => {
    if (locationPickedFromMap) {
      setPickedLocation(locationPickedFromMap);
      props.onLocationPicked(locationPickedFromMap);
    }
  }, [locationPickedFromMap, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions!",
        "The app needs access to your location.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setLoading(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert("Could not get location", "", [{ text: "Okay" }]);
    }

    setLoading(false);
  };

  const pickMapLocation = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={{ ...styles.container, ...props.style }}>
      <MapPreview style={styles.mapContainer} location={PickedLocation}>
        {Loading ? (
          <ActivityIndicator size="large" color={Colors.Accent} />
        ) : (
          <Text>No location chosen</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          style={styles.mapActions}
          title="Use Your Location"
          onPress={getLocationHandler}
        />
        <Button
          style={styles.mapActions}
          title="Pick from Map"
          onPress={pickMapLocation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignItems: "center",
  },

  mapContainer: {
    borderWidth: 2,
    borderColor: Colors.Accent,
  },

  mapActions: {
    marginVertical: 8,
  },
});

export default LocationPicker;
