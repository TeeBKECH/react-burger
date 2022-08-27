import type { Middleware, MiddlewareAPI } from 'redux'
import type { AppDispatch, RootState } from '../store'
import { v4 as uuidv4 } from 'uuid'
import { TOrder } from '../reducers/wsReduser';

export interface IWsActions {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  getOrders: string;
}

export const socketMiddleware = (wsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null

    return next => action => {
      const { dispatch } = store
      const { type, payload } = action
      const { wsInit, onOpen, onClose, onError, getOrders } = wsActions

      if (type === wsInit) {
        socket = new WebSocket(payload)
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event })
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: event })
        }

        socket.onmessage = event => {
          const { data } = event
          const parsedData = JSON.parse(data)
          const { success, ...restParsedData } = parsedData

          dispatch({
            type: getOrders,
            payload: {
              ...restParsedData,
              orders: restParsedData.orders.map((order: TOrder) => {
                return {
                  ...order, 
                  uniqueKey: uuidv4()
                }
              })
            }
          })
        }

        if (type === onClose) {
          socket.close()
        }

        socket.onclose = event => {
          console.log('ws closed')
        }
      }

      next(action)
    };
  };
};