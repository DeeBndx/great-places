import * as FileSystem from "expo-file-system";

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

export const addSpot = (title, image) => {
  return async (dispatch) => {
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
        "Somewhere over the rainbow",
        15.6,
        12.3
      );

      dispatch({
        type: ADD_SPOT,
        spotData: {
          id: dbResult.insertId,
          title: title,
          image: newPath,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
