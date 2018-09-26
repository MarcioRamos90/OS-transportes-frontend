import api from "../services/Api";

import { GET_ERRORS, GET_PASSENGER, GET_PASSENGER_BY_ID } from "./types";

export const getPassenger = filter => dispatch => {
  api.get("/api/passenger/", { params: filter }).then(res => {
    dispatch({
      type: GET_PASSENGER,
      payload: res.data
    });
  });
};

export const getPassengerById = id => dispatch => {
  api.get("/api/passenger/" + id).then(res => {
    dispatch({
      type: GET_PASSENGER_BY_ID,
      payload: res.data
    });
  });
};

export const newPassenger = (data) => dispatch => {
  api
    .post("/api/passenger", data)
    .then(res => { console.log('passenger adiconado')})
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const editPassenger = (data) => dispatch => {
  api
    .put("/api/passenger/edit", data)
    .then(res => {
      console.log('passenger editado')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
