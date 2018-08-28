import api from "../services/Api";

import { GET_ERRORS, GET_CAR, GET_CAR_BY_ID } from "./types";

export const getCars = filter => dispatch => {
  api.get("/api/cars", { params: filter }).then(res => {
    dispatch({
      type: GET_CAR,
      payload: res.data
    });
  });
};

export const getCarById = id => dispatch => {
  api.get("/api/cars/" + id).then(res => {
    dispatch({
      type: GET_CAR_BY_ID,
      payload: res.data
    });
  });
};

export const newCar = (carData, history) => dispatch => {
  api
    .post("/api/cars", carData)
    .then(res => {
      history.push("/carros");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const editCar = (carData, history) => dispatch => {
  api
    .put("/api/cars/edit", carData)
    .then(res => {
      history.push("/carros");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
