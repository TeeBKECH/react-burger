import { 
  API_URL, 
  checkResponse, 
  getCookie 
} from '../../utils/api'
import { IIngredient } from '../reducers/reducers'
import { IOrderDetails } from './../reducers/reducers';

import { 
  AppDispatch, 
  AppThunk
} from '../store'

export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST'
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED'
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS'
export const REMOVE_INGREDIENT_COUNTER = 'REMOVE_INGREDIENT_COUNTER'

export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST'
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS'
export const SET_ORDER_FAILED = 'SET_ORDER_FAILED'
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS'

export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS'
export const REMOVE_INGREDIENT_DETAILS = 'REMOVE_INGREDIENT_DETAILS'

export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR'
export const INGREDIENT_INCREMENT = 'INGREDIENT_INCREMENT'
export const INGREDIENT_DECREMENT = 'INGREDIENT_DECREMENT'
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT'
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT'
export const BUN_REPLACE = 'BUN_REPLACE'

export interface IGetBurgerIngredientRequest {
  readonly type: typeof GET_BURGER_INGREDIENTS_REQUEST;
}

export interface IGetBurgerIngredientSuccess {
  readonly type: typeof GET_BURGER_INGREDIENTS_SUCCESS;
  readonly data: ReadonlyArray<IIngredient>;
}

export interface IGetBurgerIngredientFailed {
  readonly type: typeof GET_BURGER_INGREDIENTS_FAILED;
}

export interface IIngredientIncrement {
  readonly type: typeof INGREDIENT_INCREMENT;
  readonly item: {
    readonly type: string;
    readonly _id: string;
  }
}

export interface IIngredientDecrement {
  readonly type: typeof INGREDIENT_DECREMENT;
  readonly item: {
    readonly type: string;
    readonly _id: string;
  }
}

export interface IRemoveIngredientCounter {
  readonly type: typeof REMOVE_INGREDIENT_COUNTER;
}

export type TBurgerIngredientsActions = 
  | IGetBurgerIngredientRequest
  | IGetBurgerIngredientSuccess
  | IGetBurgerIngredientFailed
  | IIngredientIncrement
  | IIngredientDecrement
  | IRemoveIngredientCounter

export interface IOrderRequest {
  readonly type: typeof SET_ORDER_REQUEST;
}

export interface IOrderFailed {
  readonly type: typeof SET_ORDER_FAILED;
}

export interface IOrderSuccess {
  readonly type: typeof SET_ORDER_SUCCESS;
  readonly order: IOrderDetails;
}

export interface IClearOrderDetails {
  readonly type: typeof CLEAR_ORDER_DETAILS;
}

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TSetOrderActions = 
  | IOrderRequest
  | IOrderFailed
  | IOrderSuccess
  | IClearOrderDetails
  | IClearConstructor
  | IRemoveIngredientCounter

export interface IAddIngredientDetails {
  readonly type: typeof ADD_INGREDIENT_DETAILS;
  readonly ingredient: IIngredient;
}

export interface IRemoveIngredientDetails {
  readonly type: typeof REMOVE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = 
  | IAddIngredientDetails
  | IRemoveIngredientDetails

export interface IBunReplace {
  readonly type: typeof BUN_REPLACE;
  readonly item: IIngredient;
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: IIngredient;
  readonly uniqueKey: string;
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly item: IIngredient;
}

export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly hoverIndex: number;
  readonly dragIndex: number;
}

export type TConstructorIngredientsActions = 
  | IBunReplace
  | IAddIngredient
  | IRemoveIngredient
  | IMoveIngredient
  | IClearConstructor

// Получение с сервера игредиентов посредством усилителя
export const getBurgerIngredients: AppThunk = () => {
  
  return function(dispatch: AppDispatch) {

    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST
    })
    fetch(API_URL + '/ingredients')
      .then(checkResponse)
      .then(data => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_SUCCESS,
          data: data.data
        })
      })
      .catch(err => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_FAILED
        })
      })
  }
}

// Отправка на сервер данных заказа
export const setOrderDetails = () => {
  
  return function(dispatch: AppDispatch, getState) {

    dispatch({
      type: SET_ORDER_REQUEST
    })

    const orderData = [...getState().constructorIngredientsReducer.constructorIngredients.map(el => el._id), getState().constructorIngredientsReducer.bun._id]

    fetch(API_URL + '/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': getCookie('accessToken') as string
      }, 
      body: JSON.stringify({"ingredients": orderData})
    })
      .then(checkResponse)
      .then(data => {
        dispatch({
          type: SET_ORDER_SUCCESS,
          order: data
        })
        dispatch({
          type: CLEAR_CONSTRUCTOR
        })
        dispatch({
          type: REMOVE_INGREDIENT_COUNTER
        })
      })
      .catch(err => {
        dispatch({
          type: SET_ORDER_FAILED
        })
      })
  }
} 