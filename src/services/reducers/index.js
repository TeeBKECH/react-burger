import { combineReducers } from 'redux';
import {burgerIngredientsReducer, ingredientDetailsReducer, constructorIngredientsReducer, orderDetailsReducer} from './reducers'

export const rootReducer = combineReducers({
  burgerIngredientsReducer,
  ingredientDetailsReducer,
  constructorIngredientsReducer,
  orderDetailsReducer
})