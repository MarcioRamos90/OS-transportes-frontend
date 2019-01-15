import { 
  GET_SERVICES, 
  GET_SERVICE_BY_ID, 
  NEW_PASSENGER,
  DEL_PASSENGER, 
  NEW_DRIVER,
  NEW_DESTINY,
  DEL_DESTINY,
  NEW_SERVICE_CAR,
  NEW_SERVICE_COMPANY,
  NEW_SERVICE_REQUESTER,
  DEL_SERVICE_REQUESTER,
  CLEAN_SERVICE
} 
from "../actions/types";

const INITIAL_STATE = {
  list: [],
  service: {
    passengers:[],
    destinys:[],
    driver: "",
    requesters:[]
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAN_SERVICE:
      return INITIAL_STATE
    case 'CHANGE_STATE':
      return {
        ...state,
        service: { 
          ...state.service,
          [action.payload.target.name]: action.payload.target.value

        }
      }
    case 'DEFAULT':
      return state

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
    case NEW_SERVICE_CAR:
      return {
        ...state,
        service: { 
          ...state.service, 
          car: action.payload
        }
      };
    case NEW_SERVICE_COMPANY:
      return {
        ...state,
        service: { 
          ...state.service, 
          company: action.payload
        }
      };
    case NEW_DESTINY:
      return {
        ...state,
        service: { 
          ...state.service, 
          destinys: [ ...state.service.destinys, action.payload]
        }
      };
    case DEL_DESTINY:
      const listaDes = [...state.service.destinys]
      return {
        ...state,
        service: { 
          ...state.service, 
          destinys: [ 
             ...deleteItemDest(listaDes , action.payload.local)
          ]
        }
      }
    case NEW_SERVICE_REQUESTER:

      return {
        ...state,
        service: { 
          ...state.service, 
          requesters: [ ...state.service.requesters, action.payload]
        }
      };

    case DEL_SERVICE_REQUESTER:
      const lista_Requester = [...state.service.requesters]
      return {
        ...state,
        service: { 
          ...state.service, 
          requesters: [ 
             ...deleteItem(lista_Requester , action.payload)
          ]
        }
      };
    default:
      return state;
  }
};

function deleteItem(lista, item){
  const list = lista;
  list.splice( list.indexOf(item), 1 );
  return list
}

function deleteItemDest(lista, local){
  const index = lista.findIndex(lista => lista.local === local);
  lista.splice( index, 1 );

  return lista
}
