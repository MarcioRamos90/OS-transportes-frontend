import { GET_BILLS, GET_BILL_BY_ID } from "../actions/types";

const INITIAL_STATE = {
  list: [],
  bill: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BILLS:
      return {
        ...state,
        list: action.payload
      };
    case GET_BILL_BY_ID:
      return {
        ...state,
        bill: action.payload
      };
    default:
      return state;
  }
};
