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

// Исходное состояние
const initialState = {

  form: {
    nameValue: '',
    emailValue: '',
    passwordValue: '',
    resetPasswordToken: '',
  },
  
  requestMessage: '',
  submitRequest: false,
  submitFailed: false,

  user: null,
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
    case UPDATE_FORM: {
      return {
        ...state,
        form: {
          ...state.form,
          nameValue: action.payload.name,
          emailValue: action.payload.email
        },
      };
    }
    case RESET_FORM: {
      return {
        ...state,
        form: {
          ...state.form,
          nameValue: action.payload.name,
          emailValue: action.payload.email,
          passwordValue: '',
        }
      };
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
        user: action.payload
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        user: initialState.user
      };
    }
    case GET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        user: action.payload
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