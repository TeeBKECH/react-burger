import type { Middleware, MiddlewareAPI } from 'redux'
import type { AppDispatch, RootState } from '../store'

export interface IWsActions {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
}

export const socketMiddleware = (wsActions: IWsActions): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null

    return next => action => {
      const { dispatch } = store
      const { type, payload } = action
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions

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
            type: onMessage,
            payload: restParsedData
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