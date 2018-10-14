import api from "../services/Api";

import { GET_ERRORS, GET_BILLS, GET_BILL_BY_ID } from "./types";

export const getBills = filter => dispatch => {
  api.get("/api/bills", { params: filter }).then(res => {
    dispatch({
      type: GET_BILLS,
      payload: res.data
    });
  });
};

export const getBillById = id => dispatch => {
  api.get("/api/bills/" + id).then(res => {
    dispatch({
      type: GET_BILL_BY_ID,
      payload: res.data
    });
  });
};

export const newBill = (data, history) => dispatch => {
  api
    .post("/api/ills", data)
    .then(res => {
      history.push("/contas");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const editBill = (data, history) => dispatch => {
  api
    .put("/api/bills/edit", data)
    .then(res => {
      history.push("/contas");
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
