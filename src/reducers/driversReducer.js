import { GET_DRIVERS, GET_DRIVER_BY_ID } from "../actions/types";

const INITIAL_STATE = {
  list: {},
  driver: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        list: action.payload
      };
    case GET_DRIVER_BY_ID:
      return {
        ...state,
        driver: action.payload
      };
    default:
      return state;
  }
};
