import api from "../services/Api";

import { GET_ERRORS, GET_DRIVERS, GET_DRIVER_BY_ID } from "./types";

export const getDrivers = filter => dispatch => {
  api.get("/api/drivers", { params: filter }).then(res => {
    dispatch({
      type: GET_DRIVERS,
      payload: res.data
    });
  });
};

export const getDriverById = id => dispatch => {
  api.get("/api/drivers/" + id).then(res => {
    dispatch({
      type: GET_DRIVER_BY_ID,
      payload: res.data
    });
  });
};

export const newDriver = (driverData, history) => dispatch => {
  api
    .post("/api/drivers", driverData)
    .then(res => {
      history.push("/motoristas");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const editDriver = (driverData, history) => dispatch => {
  api
    .put("/api/drivers/edit", driverData)
    .then(res => {
      history.push("/motoristas");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
