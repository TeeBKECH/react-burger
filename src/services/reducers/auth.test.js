import {
  SUBMIT_REQUEST,
  SUBMIT_FAILED,
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_USER,
  UPDATE_USER,
  CLEAR_FORM,
  RESET_FORM,
  FORM_SET_VALUE,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  UPDATE_FORM
} from '../actions/auth'

import { 
  initialState,
  formDataReducer,
  userReducer
} from './auth'

describe('formDataReducer', () => {

  // Возвращаем начальное состояние, если ни один экшн не подходит
  it('should return the initial state', () => {
    expect(formDataReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle FORM_SET_VALUE', () => {
    expect(
      formDataReducer((initialState), {
        type: FORM_SET_VALUE,
        field: 'password',
        value: '123'
      })
    ).toEqual({
      ...initialState,
      form: {
        ...initialState.form,
        password: '123'
      }
    })
  })

  it('should handle UPDATE_FORM', () => {
    expect(
      formDataReducer((initialState), {
        type: UPDATE_FORM,
        payload: {
          name: 'name',
          email: 'email'
        },
      })
    ).toEqual({
      ...initialState,
      form: {
        ...initialState.form,
        nameValue: 'name',
        emailValue: 'email'
      },
    })
  })

  it('should handle RESET_FORM', () => {
    expect(
      formDataReducer((initialState), {
        type: RESET_FORM,
        payload: {
          name: 'name',
          email: 'email'
        },
      })
    ).toEqual({
      ...initialState,
      form: {
        ...initialState.form,
        nameValue: 'name',
        emailValue: 'email',
        passwordValue: '',
      }
    })
  })

  it('should handle CLEAR_FORM', () => {
    expect(
      formDataReducer((initialState), {
        type: CLEAR_FORM,
      })
    ).toEqual({
      ...initialState,
      form: initialState.form
    })
  })
})

describe('userReducer', () => {

  // Возвращаем начальное состояние, если ни один экшн не подходит
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SUBMIT_REQUEST', () => {
    expect(
      userReducer((initialState), {
        type: SUBMIT_REQUEST
      })
    ).toEqual({
      ...initialState,
      submitRequest: true
    })
  })

  it('should handle GET_BURGER_INGREDIENTS_SUCCESS', () => {
    expect(
      userReducer((initialState), {
        type: SUBMIT_FAILED,
      })
    ).toEqual({
      ...initialState,
      submitRequest: false,
      submitFailed: true
    })
  })

  it('should handle CREATE_USER', () => {
    expect(
      userReducer((initialState), {
        type: CREATE_USER,
        payload: {
          email: "mail@mail123.com",
          name: "andrey"
        }
      })
    ).toEqual({
      ...initialState,
      user: {
        email: "mail@mail123.com",
        name: "andrey"
      }
    })
  })

  it('should handle LOGIN_USER', () => {
    expect(
      userReducer((initialState), {
        type: LOGIN_USER,
        payload: {
          email: "mail@mail123.com",
          name: "andrey"
        }
      })
    ).toEqual({
      ...initialState,
      user: {
        email: "mail@mail123.com",
        name: "andrey"
      }
    })
  })

  it('should handle LOGOUT_USER', () => {
    expect(
      userReducer((initialState), {
        type: LOGOUT_USER,
      })
    ).toEqual({
      ...initialState,
      user: null
    })
  })

  it('should handle GET_USER', () => {
    expect(
      userReducer((initialState), {
        type: GET_USER,
        payload: {
          email: "mail@mail123.com",
          name: "andrey"
        }
      })
    ).toEqual({
      ...initialState,
      user: {
        email: "mail@mail123.com",
        name: "andrey"
      }
    })
  })

  it('should handle UPDATE_USER', () => {
    expect(
      userReducer((initialState), {
        type: UPDATE_USER,
        payload: {
          email: "mail@mail123.com",
          name: "andrey"
        }
      })
    ).toEqual({
      ...initialState,
      user: {
        email: "mail@mail123.com",
        name: "andrey"
      }
    })
  })

  it('should handle FORGOT_PASSWORD', () => {
    expect(
      userReducer((initialState), {
        type: FORGOT_PASSWORD,
        message: 'forgot password'
      })
    ).toEqual({
      ...initialState,
      requestMessage: 'forgot password',
      resetPassword: true
    })
  })

  it('should handle RESET_PASSWORD', () => {
    expect(
      userReducer((initialState), {
        type: RESET_PASSWORD,
        message: 'forgot password'
      })
    ).toEqual({
      ...initialState,
      requestMessage: 'forgot password',
      resetPassword: false
    })
  })
})