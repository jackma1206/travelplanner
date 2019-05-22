import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import tripsReducer from "./tripsReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  trips: tripsReducer
});
