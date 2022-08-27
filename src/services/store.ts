import { Action, ActionCreator, applyMiddleware, createStore } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { rootReducer } from './reducers/index'
import { composeWithDevTools } from '@redux-devtools/extension'
import { socketMiddleware } from './middleware/wsMiddleware'
import { 
  TWsActions,
  WS_CONNECTION_CLOSED, 
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_START, 
  WS_CONNECTION_SUCCESS, 
  WS_GET_ORDERS
} from './actions/wsActions'
import { TFormActions, TUserActions } from './actions/auth'
import { TBurgerIngredientsActions, TConstructorIngredientsActions, TIngredientDetailsActions, TSetOrderActions } from './actions'

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
    applyMiddleware(thunk, socketMiddleware(wsActions))
  )
)

type TApplicationActions = 
  | TFormActions

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export default store