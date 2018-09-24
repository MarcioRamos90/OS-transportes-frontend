import api from "../services/Api";

import { GET_ERRORS, GET_LOCAL, GET_LOCAL_BY_ID } from "./types";

export const getLocal = filter => dispatch => {
  api.get("/api/local", { params: filter }).then(res => {
    dispatch({
      type: GET_LOCAL,
      payload: res.data
    });
  });
};

export const getLocalById = id => dispatch => {
  api.get("/api/local/" + id).then(res => {
    dispatch({
      type: GET_LOCAL_BY_ID,
      payload: res.data
    });
  });
};

export const newLocal = (data) => dispatch => {
  api
    .post("/api/local", data)
    .then(res => { console.log('Local adiconado')})
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const editLocal = (data) => dispatch => {
  api
    .put("/api/local/edit", data)
    .then(res => {
      console.log('Local editado')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
