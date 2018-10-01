import { GET_PASSENGER, GET_PASSENGER_BY_ID } from "../actions/types";

const INITIAL_STATE = {
  list: [],
  passenger: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PASSENGER:
      return {
        ...state,
        list: action.payload
      };
    case GET_PASSENGER_BY_ID:
      return {
        ...state,
        passenger: action.payload
      };
    default:
      return state;
  }
};
