import { 
  GET_SERVICES, 
  GET_SERVICE_BY_ID, 
  NEW_PASSENGER,
  DEL_PASSENGER, 
  NEW_DRIVER,
  NEW_DESTINY,
  DEL_DESTINY
} 
from "../actions/types";

const INITIAL_STATE = {
  list: {},
  service: {
    passengers:[],
    local:[],
    driver: ""
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return {
        ...state,
        list: action.payload
      };
    case GET_SERVICE_BY_ID:
      return {
        ...state,
        service: action.payload
      };
    case NEW_PASSENGER:

      return {
        ...state,
        service: { 
          ...state.service, 
          passengers: [ ...state.service.passengers, action.payload]
        }
      };

    case DEL_PASSENGER:
      const lista = [...state.service.passengers]
      return {
        ...state,
        service: { 
          ...state.service, 
          passengers: [ 
             ...deleteItem(lista , action.payload)
          ]
        }
      };
    case NEW_DRIVER:
      return {
        ...state,
        service: { 
          ...state.service, 
          driver: action.payload
        }
      };
    case NEW_DESTINY:
      return {
        ...state,
        service: { 
          ...state.service, 
          local: [ ...state.service.local, action.payload]
        }
      };
    case DEL_DESTINY:
      const listaDes = [...state.service.local]
      return {
        ...state,
        service: { 
          ...state.service, 
          local: [ 
             ...deleteItemDest(listaDes , action.payload.adress)
          ]
        }
      }
    default:
      return state;
  }
};


function deleteItem(lista, item){
  const list = lista;
  list.splice( list.indexOf(item), 1 );
  return list
}

function deleteItemDest(lista, adress){
  const list = lista;
  list.splice( local =>  local.adress === ({adress}), 1 );
  return list
}