import Spot from "../../models/Spot";
import { ADD_SPOT, SET_SPOTS } from "../actions/spotActions";

const initialState = {
  spots: [
    {
      id: "0",
      imageUri: "https://pbs.twimg.com/media/DepHc9EVMAAgC8W.jpg:large",
      title: "Chris Hau",
      address: "Somewhere over the rainbow",
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return {
        spots: action.spots.map(
          (spot) => new Spot(spot.id.toString(), spot.title, spot.imageUri)
        ),
      };

    case ADD_SPOT:
      const data = action.spotData;
      const newSpot = new Spot(data.id.toString(), data.title, data.image);
      return { spots: state.spots.concat(newSpot) };

    default:
      return state;
  }
};
