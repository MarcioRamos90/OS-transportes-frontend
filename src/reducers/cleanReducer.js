import { CLEAN_ALL } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAN_ALL:
      return INITIAL_STATE;
    default:
      return state;
  }
};
