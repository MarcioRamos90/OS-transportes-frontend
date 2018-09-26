import api from "../services/Api";

import { GET_ERRORS, GET_REQUESTER, GET_REQUESTER_BY_ID } from "./types";

export const getRequester = filter => dispatch => {
  api.get("/api/requesters/", { params: filter }).then(res => {
    dispatch({
      type: GET_REQUESTER,
      payload: res.data
    });
  });
};

export const getRequesterById = id => dispatch => {
  api.get("/api/requesters/" + id).then(res => {
    dispatch({
      type: GET_REQUESTER_BY_ID,
      payload: res.data
    });
  });
};

export const postRequester = (data) => dispatch => {
  api
    .post("/api/requesters", data)
    .then(res => { console.log('solicintante adiconado')})
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const putRequester = (data) => dispatch => {
  api
    .put("/api/requesters/edit", data)
    .then(res => {
      console.log('solicintante editado')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
