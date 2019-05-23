import { GET_TRIPS, FETCH_TRIP } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case GET_TRIPS:
      return action.payload;
    case FETCH_TRIP:
      return action.payload;
    default:
      return state;
  }
}
