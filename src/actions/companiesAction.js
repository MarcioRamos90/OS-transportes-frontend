import api from "../services/Api";

import { GET_ERRORS, GET_COMPANIES, GET_COMPANIE_BY_ID } from "./types";

export const getCompanies = filter => dispatch => {
  api.get("/api/companies", { params: filter }).then(res => {
    dispatch({
      type: GET_COMPANIES,
      payload: res.data
    });
  });
};

export const getCompanieById = id => dispatch => {
  api.get("/api/companies/" + id).then(res => {
    dispatch({
      type: GET_COMPANIE_BY_ID,
      payload: res.data
    });
  });
};

export const newCompany = (companyData, history) => dispatch => {
  api
    .post("/api/companies", companyData)
    .then(res => {
      history.push("/empresas");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const editComapany = (companyData, history) => dispatch => {
  api
    .put("/api/companies/edit", companyData)
    .then(res => {
      history.push("/empresas");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
