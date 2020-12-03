import React, { useCallback, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import { Text, Title } from "../components/Texts";
import Button from "../components/UI/Button";
import Colors from "../constants/Colors";
import ImageSelect from "../components/ImageSelect";

import * as spotActions from "../store/actions/spotActions";
import ScreenWrapper from "../components/UI/ScreenWrapper";
import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = (props) => {
  const [SpotName, setSpotName] = useState("");
  const [SelectedImage, setSelectedImage] = useState();
  const [SelectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const saveSpot = () => {
    dispatch(spotActions.addSpot(SpotName, SelectedImage, SelectedLocation));
    props.navigation.goBack();
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const locationPickedHandler = useCallback((loaction) => {
    setSelectedLocation(loaction);
  }, []);

  return (
    <ScreenWrapper>
      <ScrollView>
        <View>
          <Text>Spot Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Spot name"
            value={SpotName}
            onChangeText={setSpotName}
            placeholderTextColor={Colors.Secondary + "63"}
          />
          <ImageSelect style={{ marginBottom: 40 }} onImageTake={imageTakenHandler} />
          <LocationPicker
            navigation={props.navigation}
            onLocationPicked={locationPickedHandler}
          />
        </View>
        <Button title="Save Spot" onPress={saveSpot} style={styles.SaveButton} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 40,
  },
  input: {
    borderBottomColor: Colors.Secondary,
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 48,
    color: Colors.Secondary,
  },
  SaveButton: {
    // position: "absolute",
    // bottom: 40,
    alignSelf: "center",
    backgroundColor: Colors.Success,
  },
});

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add A New Spot",
};

export default NewPlaceScreen;
