import * as FileSystem from "expo-file-system";
import ENV from "../../env";

export const SET_SPOTS = "SET_SPOTS";
export const ADD_SPOT = "ADD_SPOT";

import { insertSpot, fetchSpots } from "../../helpers/db";

export const loadSpots = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchSpots();

      dispatch({
        type: SET_SPOTS,
        spots: dbResult.rows._array,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addSpot = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error(response.statusText);
    }

    const address = resData.results[0].formatted_address;
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbResult = await insertSpot(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );

      dispatch({
        type: ADD_SPOT,
        spotData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
