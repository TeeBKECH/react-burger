import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_FAILED,
  GET_BURGER_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS,
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_ORDER_FAILED,
  CLEAR_ORDER_DETAILS,
  BUN_REPLACE,
  INGREDIENT_INCREMENT,
  INGREDIENT_DECREMENT,
  REMOVE_INGREDIENT,
  ADD_INGREDIENT,
  MOVE_INGREDIENT
} from '../actions/index'

import { v4 as uuidv4 } from 'uuid'

// Исходное состояние
const initialState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false,

  constructorIngredients: [],
  bun: {},

  ingredientDetails: null,

  orderDetails: {},
  orderRequest: false,
  orderFailed: false
}

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS_REQUEST: {
      return {
        ...state,
        burgerIngredientsRequest: true,
        burgerIngredientsFailed: false,
      };
    }
    case GET_BURGER_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        burgerIngredients: action.data,
        burgerIngredientsRequest: false
      };
    }
    case GET_BURGER_INGREDIENTS_FAILED: {
      return {
        ...state,
        burgerIngredientsFailed: true,
        burgerIngredientsRequest: false
      };
    }
    case INGREDIENT_INCREMENT: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients.map(el => {
          if (action.item.type === 'bun' && el.type === 'bun') {
            el.__v = 0
            if (el._id === action.item._id) {
              el.__v = 2
            } 
          }
          if (el._id === action.item._id && action.item.type !== 'bun') {
            el.__v = el.__v + 1
          }
          return el
        })]
      };
    }
    case INGREDIENT_DECREMENT: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients.map(el => {
          if (el._id === action.item._id) {
            el.__v = el.__v - 1
          }
          return el
        })]
      };
    }
    default: {
      return state
    }
  }
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.ingredient
      };
    }
    case REMOVE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: null
      };
    }
    default: {
      return state
    }
  }
}

export const constructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUN_REPLACE: {
      return {
        ...state,
        bun: action.item
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, {...action.item, uniqueKey: uuidv4()}]
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients.filter(el => el.uniqueKey !== action.item.uniqueKey)]
      };
    }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.map((el, index) => {
            if (index === action.hoverIndex) {
              return state.constructorIngredients[action.dragIndex]
            } else if (index === action.dragIndex) {
              return state.constructorIngredients[action.hoverIndex]
            } 
            return el
          }),
        ]
      };
    }
    default: {
      return state
    }
  }
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false,
      };
    }
    case SET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        orderDetails: {}
      };
    }
    case SET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderDetails: action.order
      };
    }
    case CLEAR_ORDER_DETAILS: {
      return {
        ...state,
        orderDetails: {}
      };
    }
    default: {
      return state
    }
  }
}