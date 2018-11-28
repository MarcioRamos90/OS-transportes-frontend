import api from "../services/Api";
import { GET_ERRORS } from "./types";

export const createLogPrintAction = (id) => dispatch => {
  api
    .post("api/logs/service/" + id)
    .then(res => console.log('log enviado'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};