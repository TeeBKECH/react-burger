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
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  REMOVE_INGREDIENT_COUNTER,
  TBurgerIngredientsActions,
  TSetOrderActions,
  TIngredientDetailsActions,
  TConstructorIngredientsActions
} from '../actions/index'

export interface IIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  uniqueKey?: string;
}

interface IOrderNumber {
  number: number;
}

export interface IOrderDetails {
  name: string;
  order: IOrderNumber;
  success: boolean;
}

interface IReducersState {
  burgerIngredients: IIngredient[];
  burgerIngredientsRequest: boolean;
  burgerIngredientsFailed: boolean;

  constructorIngredients: IIngredient[];
  bun: IIngredient | null;

  ingredientDetails: IIngredient | null;

  orderDetails: IOrderDetails | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

// Исходное состояние
const initialState: IReducersState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false,

  constructorIngredients: [],
  bun: null,

  ingredientDetails: null,

  orderDetails: null,
  orderRequest: false,
  orderFailed: false
}

export const burgerIngredientsReducer = (
  state = initialState, 
  action: TBurgerIngredientsActions
): IReducersState => {
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
        burgerIngredients: [...action.data],
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
    case REMOVE_INGREDIENT_COUNTER: {
      return {
        ...state,
        burgerIngredients: [...state.burgerIngredients.map(el => {
          return {
            ...el,
            __v: 0
          }
        })]
      };
    }
    default: {
      return state
    }
  }
}

export const orderDetailsReducer = (
  state = initialState, 
  action: TSetOrderActions
): IReducersState => {
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
        orderDetails: null
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
        orderDetails: null
      };
    }
    default: {
      return state
    }
  }
}

export const ingredientDetailsReducer = (
  state = initialState, 
  action: TIngredientDetailsActions
): IReducersState => {
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

export const constructorIngredientsReducer = (
  state = initialState, 
  action: TConstructorIngredientsActions
): IReducersState => {
  switch (action.type) {
    case BUN_REPLACE: {
      return {
        ...state,
        bun: action.item
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [],
        bun: null
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, {...action.item, uniqueKey: action.uniqueKey}]
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