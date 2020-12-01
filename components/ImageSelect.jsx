import React from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";


import { Text } from "./Texts";
import Button from "./UI/Button";

const ImageSelect = (props) => {
  
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

    if (result.status !== "granted") {
      Alert.alert("Insufficient permissions!", "The app needs access to your camera.", [
        { text: "Okay" },
      ]);
      return false;
    }

    return true
  };
  
  const takePhotoHandler = async () => {
    const hasPermissions = await verifyPermissions();

    if(!hasPermissions) {
      return;
    }
    
    ImagePicker.launchCameraAsync();
  };

  return (
    <View style={{...styles.imagePicker, ...props.style}}>
      <View style={styles.imagePreview}>
        <Text>No Photo</Text>
        <Image style={styles.image} />
      </View>
      <Button title="Take Photo" onPress={takePhotoHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center"
  },
  
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center"
  },

  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageSelect;
