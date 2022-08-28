import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_ON_MESSAGE,
  WS_ADD_ORDER_DETAILS,
  WS_REMOVE_ORDER_DETAILS,
  TWsActions
} from '../actions/wsActions'

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;

  uniqueKey?: string;
}

export type TWsData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

type TWSState = {
  wsConnected: boolean;
  wsConnectedError: boolean;
  wsData: TWsData | null;
  orderDetails: TOrder | null;

  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  wsConnectedError: false,
  wsData: null,
  orderDetails: null,
};

export const wsReducer = (
  state = initialState, 
  action: TWsActions
): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsConnectedError: false
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: true,
        error: action.payload
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsConnectedError: false
      };
    case WS_ON_MESSAGE:
      return {
        ...state,
        wsData: action.payload
      };
    case WS_ADD_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload
      };
    case WS_REMOVE_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: null
      };
    default:
      return state;
  }
};