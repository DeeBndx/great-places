import Spot from "../../models/Spot";
import { ADD_SPOT } from "../actions/spotActions";

const initialState = {
  spots: [
    {
      id: 1,
      imageUrl: "https://pbs.twimg.com/media/DepHc9EVMAAgC8W.jpg:large",
      title: "Chris Hau",
      address: "Somewhere over the rainbow"
    }
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPOT:
      const newSpot = new Spot(new Date(), action.spotData.title);
      return { spots: state.places.concat(newSpot) };

    default:
      return state;
  }
};