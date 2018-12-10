import api from "../services/Api";

import { 
  GET_ERRORS, 
  GET_SERVICES, 
  GET_SERVICE_BY_ID, 
  NEW_PASSENGER, 
  DEL_PASSENGER, 
  NEW_DRIVER,
  NEW_DESTINY,
  DEL_DESTINY,
  NEW_SERVICE_CAR,
  NEW_SERVICE_COMPANY,
  NEW_SERVICE_REQUESTER,
  DEL_SERVICE_REQUESTER,
  CLEAN_SERVICE
} 
from "./types";

export const finishOS = id => dispatch => {
  api.post('api/services/finish/'+ id)
    .then(res => {
      console.log(res.data)
    })
}

export const cleanService = () => {
  return {
    type: CLEAN_SERVICE,
    payload: {}
  }
}

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
      dispatch(cleanService())
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: 'error'
      });
    });
};

export const editService = (data, history) => dispatch => {
  api
    .put("/api/services/edit", data)
    .then(res => {
      console.log(data)
      if(history) history.push(`/visualizar-servico/${data._id}`);
      dispatch(cleanService())
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const cancelService = (id, data, history) => dispatch => {
  api
    .post("/api/services/cancel/" + id, data)
    .then(res => {
      dispatch(cleanService())
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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

// Carro
export const newServiceCar = (data) => dispatch => {
  dispatch({
  type: NEW_SERVICE_CAR,
  payload: data
  });
}

export const delServiceCar = () => dispatch => {
  dispatch({
  type: NEW_SERVICE_CAR,
  payload: {}
  });
}

// Empresa
export const newServiceCompany = (data) => dispatch => {
  dispatch({
  type: NEW_SERVICE_COMPANY,
  payload: data
  });
}

export const delServiceCompany = () => dispatch => {
  dispatch({
  type: NEW_SERVICE_COMPANY,
  payload: []
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

// Passageiros
export const newServicePassenger = (data) => dispatch => {
  dispatch({
  type: NEW_PASSENGER,
  payload: data
  });
}

export const delServicePassenger = (data) => dispatch => {
  dispatch({
  type: DEL_PASSENGER,
  payload: data
  });
}

// Solicitantes
export const newServiceRequester = (data) => dispatch => {
  dispatch({
  type: NEW_SERVICE_REQUESTER,
  payload: data
  });
}

export const delServiceRequester = (data) => dispatch => {
  dispatch({
  type: DEL_SERVICE_REQUESTER,
  payload: data
  });
}

