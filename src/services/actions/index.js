export const GET_BURGER_INGREDIENTS_REQUEST = 'GET_BURGER_INGREDIENTS_REQUEST'
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED'
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS'

export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST'
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS'
export const SET_ORDER_FAILED = 'SET_ORDER_FAILED'
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS'

export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS'
export const REMOVE_INGREDIENT_DETAILS = 'REMOVE_INGREDIENT_DETAILS'

export const ADD_BUN = 'ADD_BUN'

const GET_INGREDIENTS_API = 'https://norma.nomoreparties.space/api/ingredients'
const ORDER_API = 'https://norma.nomoreparties.space/api/orders'

// Получение с сервера игредиентов посредством усилителя
export const getBurgerIngredients = () => {
  
  return function(dispatch) {

    dispatch({
      type: GET_BURGER_INGREDIENTS_REQUEST
    })
    fetch(GET_INGREDIENTS_API)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          dispatch({
            type: GET_BURGER_INGREDIENTS_FAILED
          })
        }
      })
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
  
  return function(dispatch, getState) {

    dispatch({
      type: SET_ORDER_REQUEST
    })

    const orderData = getState().burgerIngredientsReducer.burgerIngredients.map(el => el._id)

    fetch(ORDER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, 
      body: JSON.stringify({"ingredients": orderData})
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          dispatch({
            type: SET_ORDER_FAILED
          })
        }
      })
      .then(data => {
        // console.log(data)
        dispatch({
          type: SET_ORDER_SUCCESS,
          order: data
        })
      })
      .catch(err => {
        dispatch({
          type: SET_ORDER_FAILED
        })
      })
  }
} 