import { combineReducers } from 'redux';
import { burgerIngredientsReducer, ingredientDetailsReducer, constructorIngredientsReducer, orderDetailsReducer } from './reducers'
import { createUserReducer, formDataReducer } from './auth'

export const rootReducer = combineReducers({
  burgerIngredientsReducer,
  ingredientDetailsReducer,
  constructorIngredientsReducer,
  orderDetailsReducer,
  createUserReducer,
  formDataReducer
})