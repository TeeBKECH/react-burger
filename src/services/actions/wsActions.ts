import { TOrder, TWsData } from "../reducers/wsReduser"

export const WS_CONNECTION_START = 'WS_CONNECTION_START'
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED'
export const WS_ON_MESSAGE = 'WS_ON_MESSAGE'
export const WS_ADD_ORDER_DETAILS = 'ADD_ORDER_DETAILS'
export const WS_REMOVE_ORDER_DETAILS = 'WS_REMOVE_ORDER_DETAILS'

export interface IWsConnection {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsOnMessage {
  readonly type: typeof WS_ON_MESSAGE;
  readonly payload: TWsData;
}

export interface IWsAddOrderDetails {
  readonly type: typeof WS_ADD_ORDER_DETAILS;
  readonly payload: TOrder;
}

export interface IWsRemoveOrderDetails {
  readonly type: typeof WS_REMOVE_ORDER_DETAILS;
}

export type TWsActions = 
  | IWsConnection
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsOnMessage
  | IWsAddOrderDetails
  | IWsRemoveOrderDetails