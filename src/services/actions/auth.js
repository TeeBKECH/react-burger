import { API_URL, checkResponse } from '../../utils/api'

export const SUBMIT_REQUEST = 'SUBMIT_REQUEST'
export const SUBMIT_FAILED = 'SUBMIT_FAILED'
export const CREATE_USER = 'CREATE_USER'
export const GET_USER = 'GET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const CLEAR_FORM = 'CLEAR_FORM'
export const FORM_SET_VALUE = 'FORM_SET_VALUE'

// Обновление данных формы
export const setFormValue = (field, value) => ({
  type: FORM_SET_VALUE,
  field,
  value
}) 

// Регистрация пользователя
export const createUser = (name, email, password) => {
  
  return function(dispatch) {

    dispatch({
      type: SUBMIT_REQUEST
    })

    fetch(API_URL + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, 
      body: JSON.stringify({
        name,
        email, 
        password,
      } )
    })
    .then(checkResponse)
    .then(data => {
      dispatch({
        type: CREATE_USER,
        payload: data
      })
      dispatch({
        type: CLEAR_FORM
      })
    })
    .catch(err => {
      dispatch({
        type: SUBMIT_FAILED
      })
    })
  }
}

// Авторизация пользователя
export const getUser = (email, password) => {
  
  return function(dispatch) {

    dispatch({
      type: SUBMIT_REQUEST
    })

    fetch(API_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, 
      body: JSON.stringify({
        email, 
        password
      } )
    })
      .then(checkResponse)
      .then(data => {
        dispatch({
          type: GET_USER,
          payload: data
        })
        dispatch({
          type: CLEAR_FORM
        })
      })
      .catch(err => {
        dispatch({
          type: SUBMIT_FAILED
        })
      })
  }
}

// Запрос на сброс пароля
export const forgotPassword = (email) => {
  
  return function(dispatch) {

    dispatch({
      type: SUBMIT_REQUEST
    })

    fetch(API_URL + '/password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, 
      body: JSON.stringify({
        email
      } )
    })
      .then(checkResponse)
      .then(data => {
        dispatch({
          type: FORGOT_PASSWORD,
          message: data.message
        })
        dispatch({
          type: CLEAR_FORM
        })
      })
      .catch(err => {
        dispatch({
          type: SUBMIT_FAILED
        })
      })
  }
} 

// Сброс пароля
export const resetPassword = (password, token) => {
  
  return function(dispatch) {

    dispatch({
      type: SUBMIT_REQUEST
    })

    fetch(API_URL + '/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, 
      body: JSON.stringify({
        password,
        token
      } )
    })
      .then(checkResponse)
      .then(data => {
        dispatch({
          type: RESET_PASSWORD,
          message: data.message
        })
        dispatch({
          type: CLEAR_FORM
        })
      })
      .catch(err => {
        dispatch({
          type: SUBMIT_FAILED
        })
      })
  }
} 

// Обновление информации о пользователе
export const updateUser = (name, email, password) => {
  
  return function(dispatch) {

    dispatch({
      type: SUBMIT_REQUEST
    })

    fetch(API_URL + '/password-reset/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, 
      body: JSON.stringify({
        name,
        email,
        password
      } )
    })
      .then(checkResponse)
      .then(data => {
        dispatch({
          type: UPDATE_USER,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: SUBMIT_FAILED
        })
      })
  }
}