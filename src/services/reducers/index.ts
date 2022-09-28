import { combineReducers } from 'redux';
import { burgerIngredientsReducer, ingredientDetailsReducer, constructorIngredientsReducer, orderDetailsReducer } from './reducers'
import { userReducer, formDataReducer } from './auth'
import { wsReducer } from './wsReducer'

export const rootReducer = combineReducers({
  burgerIngredientsReducer,
  ingredientDetailsReducer,
  constructorIngredientsReducer,
  orderDetailsReducer,
  formDataReducer,
  userReducer,
  wsReducer
})