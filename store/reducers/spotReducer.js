import Spot from "../../models/Spot";
import { ADD_SPOT, SET_SPOTS } from "../actions/spotActions";

const initialState = {
  spots: [
    {
      id: "0",
      imageUri: "https://pbs.twimg.com/media/DepHc9EVMAAgC8W.jpg:large",
      title: "Danny Bendix",
      address: "",
      lat: 56.154067,
      lng: 10.200231
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return {
        spots: action.spots.map(
          (spot) => new Spot(spot.id.toString(), spot.title, spot.imageUri, spot.address, spot.lat, spot.lng)
        ),
      };

    case ADD_SPOT:
      const data = action.spotData;
      console.log("ADD_SPOT => ", data)
      const newSpot = new Spot(data.id.toString(), data.title, data.image, data.address, data.coords.lat, data.coords.lng);
      return { spots: state.spots.concat(newSpot) };

    default:
      return state;
  }
};
