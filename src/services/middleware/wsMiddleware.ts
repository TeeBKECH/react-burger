import type { Middleware, MiddlewareAPI } from 'redux'
import type { AppDispatch, RootState } from '../store';
import { getCookie } from "../../utils/api"

export type TWsActions = {
  wsInit: string;
  wsInitAuth: string;
  onOpen: string;
  onClose: string;
  onError: string;
  getOrders: string;
}

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null

    return next => action => {
      const { dispatch, getState } = store
      const { type, payload } = action
      const { wsInit, wsInitAuth, onOpen, onClose, onError, getOrders } = wsActions
      const accessToken = getCookie('accessToken')?.replace('Bearer ', '')

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/orders/all`)
      }
      if (type === wsInitAuth) {
        socket = new WebSocket(`${wsUrl}/orders?token=${accessToken}`)
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event })
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: event })
        }

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data)
          const { success, ...restParsedData } = parsedData
          dispatch({ type: getOrders, payload: restParsedData })
        }

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event })
        }
      }

      next(action)
    };
  };
};