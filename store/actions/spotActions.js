export const ADD_SPOT = "ADD_SPOT";

export const addSpot = (title, image) => {
  return {
    type: ADD_SPOT,
    spotData: {
      title: title,
      image: image,
    }
  }
}