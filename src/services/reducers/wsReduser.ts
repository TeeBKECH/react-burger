import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS
} from '../actions/wsActions'

export type TOrders = {
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}

type TWsData = {
  success: boolean;
  orders: TOrders[];
  total: number;
  totalToday: number;
}

type TWSState = {
  wsConnected: boolean;
  wsData: TWsData | null;

  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  wsData: null
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        wsData: action.payload
      };
    default:
      return state;
  }
};