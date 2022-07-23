import { API_URL, checkResponse } from '../../utils/api'

export const SUBMIT_REQUEST = 'SUBMIT_REQUEST'
export const SUBMIT_FAILED = 'SUBMIT_FAILED'
export const CREATE_USER = 'CREATE_USER'
export const GET_USER = 'GET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const CLEAR_FORM = 'CLEAR_FORM'
export const FORM_SET_VALUE = 'FORM_SET_VALUE'

// Обновление данных формы
export const setFormValue = (field, value) => ({
  type: FORM_SET_VALUE,
  field,
  value
}) 

// Регистрация пользователя
export const createUser = () => {
  
  return function(dispatch, getState) {

    dispatch({
      type: SUBMIT_REQUEST
    })

    const form = getState().formDataReducer.form

    fetch(API_URL + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }, 
      body: JSON.stringify({
        "email": form.emailValue, 
        "password": form.passwordValue,
        "name": form.nameValue
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