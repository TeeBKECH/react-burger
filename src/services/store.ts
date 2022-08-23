import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers/index'
import { composeWithDevTools } from '@redux-devtools/extension'
import { socketMiddleware } from './middleware/wsMiddleware'
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_ORDERS } from './actions/wsActions'

const wsUrl: string = 'wss://norma.nomoreparties.space/orders/all'

// export interface IWsConnectedStart {
//   readonly type: typeof WS_CONNECTION_START
// }

const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  getOrders: WS_GET_ORDERS
}

const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
  )
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;