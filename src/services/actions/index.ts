import { API_URL, checkResponse } from '../../utils/api'

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

// Получение с сервера игредиентов посредством усилителя
export const getBurgerIngredients = (): any => {
  
  return function(dispatch): void {

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
export const setOrderDetails = (): any => {
  
  return function(dispatch, getState) {

    dispatch({
      type: SET_ORDER_REQUEST
    })

    const orderData = [...getState().constructorIngredientsReducer.constructorIngredients.map(el => el._id), getState().constructorIngredientsReducer.bun._id]

    fetch(API_URL + '/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
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