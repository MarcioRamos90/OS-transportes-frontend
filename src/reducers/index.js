import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import companiesReducer from "./companiesReducer";
import carsReducer from "./carsReducer";
import driversReducer from "./driversReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  companies: companiesReducer,
  cars: carsReducer,
  drivers: driversReducer
});
