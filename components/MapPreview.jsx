import React from "react";
import { StyleSheet, Image, View } from "react-native";

import ENV from "../env";

const MapPreview = (props) => {
  let imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
  &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
  &markers=color:red%7Clabel:C%7C40.718217,-73.998284
  &key=AIzaSyBwy2zk1pisa9j2T7UoHrKI4YBug-NO4Rc`;

  if (props.location) {
    imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=12&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }

  console.log("MapPreview props => ", props);

  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imageUrl }} />
      ) : (
        props.children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
  },

  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
