import {
  SUBMIT_REQUEST,
  SUBMIT_FAILED,
  CREATE_USER,
  GET_USER,
  UPDATE_USER,
  CLEAR_FORM,
  FORM_SET_VALUE,
  RESET_PASSWORD,
  FORGOT_PASSWORD
} from '../actions/auth'

// Исходное состояние
const initialState = {

  form: {
    nameValue: '',
    emailValue: '',
    passwordValue: '',
    resetPasswordToken: '',
  },

  resetPassword: false,
  requestMessage: '',

  submitRequest: false,
  submitFailed: false,

  user: {
    name: '',
    email: ''
  },
  accesToken: '',
  refreshToken: '',
}

export const formDataReducer = (state = initialState, action) => {
  switch(action.type) {
    case FORM_SET_VALUE: {
      return {
        ...state,
        form: {
          ...state.form,
          [action.field]: action.value
        }
      }
    }
    case CLEAR_FORM: {
      return {
        ...state,
        form: initialState.form
      };
    }
    default: {
      return state;
    }
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_REQUEST: {
      return {
        ...state,
        submitRequest: true
      };
    }
    case SUBMIT_FAILED: {
      return {
        ...state,
        submitRequest: false,
        submitFailed: true
      };
    }
    case CREATE_USER: {
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case GET_USER: {
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case FORGOT_PASSWORD: {
      return {
        ...state,
        requestMessage: action.message,
        resetPassword: true
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        requestMessage: action.message,
        resetPassword: false
      };
    }
    default: {
      return state
    }
  }
}