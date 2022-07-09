import {
  GET_BURGER_INGREDIENTS_REQUEST,
  GET_BURGER_INGREDIENTS_FAILED,
  GET_BURGER_INGREDIENTS_SUCCESS
} from '../actions/index'

// Исходное состояние
const initialState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false,

  constructorIngredients: [],
  currentIngredient: {},
  order: {}
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
    default: {
      return state
    }
  }
}