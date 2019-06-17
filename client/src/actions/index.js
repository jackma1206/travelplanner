import axios from "axios";
import {
  FETCH_USER,
  SUBMIT_TRIP,
  GET_TRIPS,
  FETCH_TRIP,
  UPDATE_TODO,
  DELETE_TODO,
  UPDATE_TRIP
} from "./types";

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

export const fetchTrip = id => async dispatch => {
  let uri = `/api/trips/${id}`;
  const res = await axios.get(uri);
  dispatch({ type: FETCH_TRIP, payload: res.data });
};

export const updateToDo = (data, id) => async dispatch => {
  let uri = `/api/trips/${id}`;
  const res = await axios.post(uri, data);
  dispatch({ type: UPDATE_TODO, payload: res.data });
};

export const deleteToDo = (toDoId, id) => async dispatch => {
  let uri = `/api/trips/${id}/delete/${toDoId}`;
  const res = await axios.get(uri);
  dispatch({ type: DELETE_TODO, payload: res.data });
};

export const updateTrip = values => async dispatch => {
  let uri = "/api/trip/edit";
  const res = await axios.put(uri, values);
  dispatch({ type: UPDATE_TRIP, payload: res.data });
};
