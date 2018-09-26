import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import companiesReducer from "./companiesReducer";
import carsReducer from "./carsReducer";
import localReducer from "./localReducer";
import passengerReducer from "./passengerReducer";
import requesterReducer from "./requesterReducer";
import servicesReducer from "./servicesReducer";
import driversReducer from "./driversReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  companies: companiesReducer,
  cars: carsReducer,
  drivers: driversReducer,
  services: servicesReducer,
  local: localReducer,
  passenger: passengerReducer,
  requester: requesterReducer
});
