import { 
  API_URL, 
  checkResponse, 
  deleteCookie, 
  getCookie, 
  saveTokens 
} from '../../utils/api'

import { IForm, IUser } from '../reducers/auth'

import { 
  AppDispatch, 
  AppThunk 
} from '../store'

export const SUBMIT_REQUEST = 'SUBMIT_REQUEST'
export const SUBMIT_FAILED = 'SUBMIT_FAILED'
export const CREATE_USER = 'CREATE_USER'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const GET_USER = 'GET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const CLEAR_FORM = 'CLEAR_FORM'
export const RESET_FORM = 'RESET_FORM'
export const UPDATE_FORM = 'UPDATE_FORM'
export const FORM_SET_VALUE = 'FORM_SET_VALUE'

export interface ISetFormValue {
  readonly type: typeof FORM_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export interface IUpdateForm {
  readonly type: typeof UPDATE_FORM;
  readonly payload: {
    readonly name: string;
    readonly email: string;
  };
}

export interface IResetForm {
  readonly type: typeof RESET_FORM;
  readonly payload: {
    readonly name: string;
    readonly email: string;
    readonly passwordValue: string;
  };
}

export interface IClearForm {
  readonly type: typeof CLEAR_FORM;
  readonly form: IForm;
}

export type TFormActions = 
  | ISetFormValue
  | IUpdateForm
  | IResetForm
  | IClearForm

export interface ISubmitRequest {
  readonly type: typeof SUBMIT_REQUEST;
}

export interface ISubmitFailed {
  readonly type: typeof SUBMIT_FAILED;
}

export interface ICreateUser {
  readonly type: typeof CREATE_USER;
  readonly payload: IUser;
}

export interface ILoginUser {
  readonly type: typeof LOGIN_USER;
  readonly payload: IUser;
}

export interface ILogoutUser {
  readonly type: typeof LOGOUT_USER;
}

export interface ILogoutUser {
  readonly type: typeof LOGOUT_USER;
}

export interface IGetUser {
  readonly type: typeof GET_USER;
  readonly payload: IUser;
}

export interface IUpdateUser {
  readonly type: typeof UPDATE_USER;
  readonly payload: IUser;
}

export interface IForgotPassword {
  readonly type: typeof FORGOT_PASSWORD;
  readonly message: string;
}

export interface IResetPassword {
  readonly type: typeof RESET_PASSWORD;
  readonly message: string;
}

export type TUserActions = 
  | ISubmitRequest
  | ISubmitFailed
  | ICreateUser
  | ILoginUser
  | ILogoutUser
  | IGetUser
  | IUpdateUser
  | IForgotPassword
  | IResetPassword

// Обновление данных формы
export const setFormValue = (field: string, value: string): ISetFormValue => ({
  type: FORM_SET_VALUE,
  field,
  value
})

// Регистрация пользователя
export const createUser: AppThunk = (name: string, email: string, password: string) => {

  return function (dispatch: AppDispatch) {

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
      })
    })
      .then(checkResponse)
      .then(data => {
        dispatch({
          type: CREATE_USER,
          payload: data.user
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
export const logIn: AppThunk = (email: string, password: string) => {

  return function (dispatch: AppDispatch) {

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
      })
    })
      .then(checkResponse)
      .then(data => {
        saveTokens(data.refreshToken, data.accessToken)
        dispatch({
          type: LOGIN_USER,
          payload: data.user
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

// Выход из учетной записи
export const logOut: AppThunk = (token: string | undefined) => {

  return function (dispatch: AppDispatch) {

    dispatch({
      type: SUBMIT_REQUEST
    })

    fetch(API_URL + '/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token
      })
    })
      .then(checkResponse)
      .then(data => {
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        dispatch({
          type: LOGOUT_USER
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

const refreshToken = (afterRefresh: any) => {

  return function(dispatch: AppDispatch) {

    fetch(API_URL + '/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        "token": getCookie('refreshToken')
      })
    })
    .then(checkResponse)
    .then((res) => {
      saveTokens(res.refreshToken, res.accessToken);
      dispatch(afterRefresh);
    })
    .catch(err => {
      dispatch({
        type: SUBMIT_FAILED
      })
    })
  }
}

// Обновление информации о пользователе
export const getUser: AppThunk = () => {

  return function (dispatch: AppDispatch) {

    dispatch({
      type: SUBMIT_REQUEST,
    })

   fetch(API_URL + '/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': getCookie('accessToken') as string
      }
    })
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.user,
        })
        dispatch({
          type: UPDATE_FORM,
          payload: res.user,
        })
      })
      .catch((err) => {
        if (err === 'jwt expired') {
          dispatch(refreshToken(getUser()));
        } else {
          dispatch({
            type: SUBMIT_FAILED,
            payload: err,
          });
        }
      });
  }
}

// Обновление информации о пользователе
export const updateUser: AppThunk = (name: string, email: string, password: string) => {

  return function (dispatch: AppDispatch) {

    dispatch({
      type: SUBMIT_REQUEST
    })

    fetch(API_URL + '/auth/user', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': getCookie('accessToken') as string
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(checkResponse)
      .then(data => {
        dispatch({
          type: UPDATE_USER,
          payload: data.user
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
export const forgotPassword: AppThunk = (email: string) => {

  return function (dispatch: AppDispatch) {

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
      })
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
export const resetPassword: AppThunk = (password: string, token: string) => {

  return function (dispatch: AppDispatch) {

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
      })
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