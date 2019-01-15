import { CLEAN_ALL, DEFAULT } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAN_ALL:
      return INITIAL_STATE;
    case DEFAULT:
    	return state;
    default:
      return state;
  }
};
