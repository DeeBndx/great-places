import React, { useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { Text } from "./Texts";
import Button from "./UI/Button";

const ImageSelect = (props) => {
  const [TakenImg, setTakenImg] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );

    if (result.status !== "granted") {
      Alert.alert("Insufficient permissions!", "The app needs access to your camera.", [
        { text: "Okay" },
      ]);
      return false;
    }

    return true;
  };

  const takePhotoHandler = async () => {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 2],
      quality: 0.45,
    });

    setTakenImg(image.uri);
    props.onImageTake(image.uri);
  };

  return (
    <View style={{ ...styles.imagePicker, ...props.style }}>
      <View style={styles.imagePreview}>
        {TakenImg ? (
          <Image style={styles.image} source={{ uri: TakenImg }} />
        ) : (
          <Text>No Photo</Text>
        )}
      </View>
      <Button title="Take Photo" onPress={takePhotoHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },

  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageSelect;
