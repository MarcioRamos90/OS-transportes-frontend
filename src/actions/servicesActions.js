import api from "../services/Api";

import { 
  GET_ERRORS, 
  GET_SERVICES, 
  GET_SERVICE_BY_ID, 
  NEW_PASSENGER, 
  DEL_PASSENGER, 
  NEW_DRIVER,
  NEW_DESTINY,
  DEL_DESTINY
} 
from "./types";

export const getServices = filter => dispatch => {
  api.get("/api/services", { params: filter }).then(res => {
    dispatch({
      type: GET_SERVICES,
      payload: res.data
    });
  });
};

export const getServiceById = id => dispatch => {
  api.get("/api/services/" + id).then(res => {
    dispatch({
      type: GET_SERVICE_BY_ID,
      payload: res.data
    });
  });
};

export const newService = (data, history) => dispatch => {
  api
    .post("/api/services", data)
    .then(res => {
      history.push("/servicos");
      console.log('foi')
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: 'error'
      });
    });
};

// Locais
export const newDestiny = (data) => dispatch => {
  dispatch({
  type: NEW_DESTINY,
  payload: data
  });
}

export const delDestiny = (data) => dispatch => {
  dispatch({
  type: DEL_DESTINY,
  payload: data
  });
}

// Motoristas
export const newServiceDriver = (data) => dispatch => {
  dispatch({
  type: NEW_DRIVER,
  payload: data
  });
}

export const delServiceDriver = () => dispatch => {
  dispatch({
  type: NEW_DRIVER,
  payload: {}
  });
}


// Passageiros
export const newPassenger = (data) => dispatch => {
  dispatch({
  type: NEW_PASSENGER,
  payload: data
  });
}

export const delPassenger = (data) => dispatch => {
  dispatch({
  type: DEL_PASSENGER,
  payload: data
  });
}

export const editService = (data, history) => dispatch => {
  api
    .put("/api/services/", data)
    .then(res => {
      history.push("/servicos");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
