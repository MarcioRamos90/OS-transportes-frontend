import { GET_LOCAL, GET_LOCAL_BY_ID } from "../actions/types";

const INITIAL_STATE = {
  list: [],
  local: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LOCAL:
      return {
        ...state,
        list: action.payload
      };
    case GET_LOCAL_BY_ID:
      return {
        ...state,
        local: action.payload
      };
    default:
      return state;
  }
};
