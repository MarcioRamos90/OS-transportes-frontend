import api from "../services/Api";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

// Register User
export const registerUser = (userData, history) => dispatch => {
  api
    .post("api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.hasOwnProperty('data') ? err.response.data : err.response
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  api
    .post("api/users/login", userData)
    .then(res => {
      // Get token
      console.log("entrei aqui tbm");
      const { token } = res.data;
      // Set to local localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,

        payload: err.response.hasOwnProperty('data') ? err.response.data : err.response
      });
    });
};

// Get current
// export const getCurrentUser =>{
//   api.get('api/users/current')
//     .then(res => {})
// }

// Set logged User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove Token
  localStorage.removeItem("jwtToken");
  // Romove Auth header for future requests
  setAuthToken(false);
  // Set current user to {} witch will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
