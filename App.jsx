import React, {useState} from 'react';
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { enableScreens } from "react-native-screens";

import PlacesNavigator from "./navigation/PlacesNavigator";

enableScreens(true);

const fetchFonts = () => {
  return Font.loadAsync({
    poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    poppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    poppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
  });
};

export default function App() {
  const [FontLoaded, setFontLoaded] = useState(false);
  if (!FontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />;
  }
  return <PlacesNavigator />
}