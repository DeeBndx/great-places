export const ADD_SPOT = "ADD_SPOT";

export const addSpot = (title) => {
  return {
    type: ADD_SPOT,
    spotData: {
      title: title,
    }
  }
}