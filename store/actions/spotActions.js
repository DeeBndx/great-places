import * as FileSystem from "expo-file-system";

export const ADD_SPOT = "ADD_SPOT";

export const addSpot = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }

    dispatch({
      type: ADD_SPOT,
      spotData: {
        title: title,
        image: newPath,
      },
    });
  };
};
