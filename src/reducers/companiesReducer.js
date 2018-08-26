import { GET_COMPANIES, GET_COMPANIE_BY_ID } from "../actions/types";

const INITIAL_STATE = {
  list: {},
  company: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COMPANIES:
      return {
        ...state,
        list: action.payload
      };
    case GET_COMPANIE_BY_ID:
      return {
        ...state,
        company: action.payload
      };
    default:
      return state;
  }
};
