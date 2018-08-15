import api from "../services/Api";
import { GET_ERRORS } from "./types";

export const registerUser = (userData, history) => dispatch => {
  api
    .post("api/users/register", userData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
