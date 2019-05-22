import { GET_TRIPS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case GET_TRIPS:
      return action.payload;
    default:
      return state;
  }
}
