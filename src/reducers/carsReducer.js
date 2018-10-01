import { GET_CAR, GET_CAR_BY_ID } from "../actions/types";

const INITIAL_STATE = {
  list: [],
  car: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CAR:
      return {
        ...state,
        list: action.payload
      };
    case GET_CAR_BY_ID:
      return {
        ...state,
        car: action.payload
      };
    default:
      return state;
  }
};
