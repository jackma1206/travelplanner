import axios from "axios";
import { FETCH_USER, SUBMIT_TRIP, GET_TRIPS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitTrip = (values, history) => async dispatch => {
  const res = await axios.post("/api/trips", values);
  history.push("/dashboard");
  dispatch({ type: SUBMIT_TRIP, payload: res.data });
};

export const getTrips = () => async dispatch => {
  const res = await axios.get("/api/trips");
  dispatch({ type: GET_TRIPS, payload: res.data });
};
