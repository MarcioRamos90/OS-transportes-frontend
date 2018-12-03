import { CLEAN_ALL, DEFAULT } from "../actions/types";

export const defaultAction  = () => {
  return {
    type: DEFAULT
  };
};

export const cleanAction  = () => {
  return {
    type: CLEAN_ALL
  };
};