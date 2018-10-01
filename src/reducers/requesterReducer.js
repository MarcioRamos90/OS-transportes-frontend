import { GET_REQUESTER, GET_REQUESTER_BY_ID } from "../actions/types";

const INITIAL_STATE = {
  list: [],
  requester: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REQUESTER:
      return {
        ...state,
        list: action.payload
      };
    case GET_REQUESTER_BY_ID:
      return {
        ...state,
        requester: action.payload
      };
    default:
      return state;
  }
};
