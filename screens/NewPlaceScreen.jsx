import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import { Text, Title } from "../components/Texts";
import Button from "../components/UI/Button";
import Colors from "../constants/Colors";
import ImagePicker from "../components/ImageSelect";

import * as spotActions from "../store/actions/spotActions";
import ScreenWrapper from "../components/UI/ScreenWrapper";

const NewPlaceScreen = (props) => {
  const [SpotName, setSpotName] = useState("");


  const saveSpot = () => {
    useDispatch(spotActions.ADD_SPOT(SpotName));
    props.navigation.goBack();
  };

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
          />
          <ImagePicker style={{ marginBottom: 40 }} />
          <Button title="Save Spot" onPress={saveSpot} />
        </View>
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
  },
});

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add A New Spot",
};

export default NewPlaceScreen;
