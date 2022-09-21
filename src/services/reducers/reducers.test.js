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
  REMOVE_INGREDIENT_COUNTER
} from '../actions/index'

import {
  burgerIngredientsReducer,
  orderDetailsReducer,
  ingredientDetailsReducer,
  constructorIngredientsReducer,
  initialState
} from "./reducers"

describe('burgerIngredientsReducer', () => {

  // Возвращаем начальное состояние, если ни один экшн не подходит
  it('should return the initial state', () => {
    expect(burgerIngredientsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_BURGER_INGREDIENTS_REQUEST', () => {
    expect(
      burgerIngredientsReducer((initialState), {
        type: GET_BURGER_INGREDIENTS_REQUEST
      })
    ).toEqual({
      ...initialState,
      burgerIngredientsRequest: true,
      burgerIngredientsFailed: false,
    })
  })

  it('should handle GET_BURGER_INGREDIENTS_SUCCESS', () => {
    expect(
      burgerIngredientsReducer((initialState), {
        type: GET_BURGER_INGREDIENTS_SUCCESS,
        data: [111, 222, 333],
      })
    ).toEqual({
      ...initialState,
      burgerIngredients: [111, 222, 333],
      burgerIngredientsRequest: false
    })
  })

  it('should handle GET_BURGER_INGREDIENTS_FAILED', () => {
    expect(
      burgerIngredientsReducer((initialState), {
        type: GET_BURGER_INGREDIENTS_FAILED
      })
    ).toEqual({
      ...initialState,
      burgerIngredientsFailed: true,
      burgerIngredientsRequest: false
    })
  })

  it('should handle REMOVE_INGREDIENT_COUNTER', () => {
    expect(
      burgerIngredientsReducer((initialState), {
        type: REMOVE_INGREDIENT_COUNTER
      })
    ).toEqual({
      ...initialState,
      burgerIngredients: []
    })
  })

  it('should handle INGREDIENT_DECREMENT', () => {
    const action = {
      type: INGREDIENT_DECREMENT,
      item: {
        _id: 111
      }
    }
    expect(burgerIngredientsReducer(initialState, action))
      .toEqual({
        ...initialState,
        burgerIngredients: []
    })
  })

  it('should handle INGREDIENT_INCREMENT', () => {
    const action = {
      type: INGREDIENT_INCREMENT,
      item: {
        _id: 111,
        type: 'bun'
      }
    }
    expect(burgerIngredientsReducer(initialState, action))
      .toEqual({
        ...initialState,
        burgerIngredients: []
    })
  })
})

describe('orderDetailsReducer', () => {

  // Возвращаем начальное состояние, если ни один экшн не подходит
  it('should return the initial state', () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SET_ORDER_REQUEST', () => {
    expect(
      orderDetailsReducer((initialState), {
        type: SET_ORDER_REQUEST
      })
    ).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    })
  })

  it('should handle SET_ORDER_SUCCESS', () => {
    expect(
      orderDetailsReducer((initialState), {
        type: SET_ORDER_SUCCESS,
        order: {
          success: true,
          name: "Бессмертный флюоресцентный бургер",
          order: {
            ingredients: [111, 222, 333],
            _id: 123,
            name: "Бессмертный флюоресцентный бургер"
          }
        },
      })
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: false,
      orderDetails: {
        success: true,
        name: "Бессмертный флюоресцентный бургер",
        order: {
          ingredients: [111, 222, 333],
          _id: 123,
          name: "Бессмертный флюоресцентный бургер"
        }
      }
    })
  })

  it('should handle SET_ORDER_FAILED', () => {
    expect(
      orderDetailsReducer((initialState), {
        type: SET_ORDER_FAILED
      })
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true,
      orderDetails: null
    })
  })

  it('should handle CLEAR_ORDER_DETAILS', () => {
    expect(
      orderDetailsReducer((initialState), {
        type: CLEAR_ORDER_DETAILS
      })
    ).toEqual({
      ...initialState,
      orderDetails: null
    })
  })
})

describe('ingredientDetailsReducer', () => {

  // Возвращаем начальное состояние, если ни один экшн не подходит
  it('should return the initial state', () => {
    expect(ingredientDetailsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle ADD_INGREDIENT_DETAILS', () => {
    expect(
      ingredientDetailsReducer((initialState), {
        type: ADD_INGREDIENT_DETAILS,
        ingredient: {
          _id: 123,
          type: 'bun'
        }
      })
    ).toEqual({
      ...initialState,
      ingredientDetails: {
        _id: 123,
        type: 'bun'
      }
    })
  })

  it('should handle REMOVE_INGREDIENT_DETAILS', () => {
    expect(
      ingredientDetailsReducer((initialState), {
        type: REMOVE_INGREDIENT_DETAILS,
      })
    ).toEqual({
      ...initialState,
      ingredientDetails: null
    })
  })
})

describe('constructorIngredientsReducer', () => {

  // Возвращаем начальное состояние, если ни один экшн не подходит
  it('should return the initial state', () => {
    expect(constructorIngredientsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle BUN_REPLACE', () => {
    const action = {
      type: BUN_REPLACE,
      item: {
        type: 'bun',
        _id: 123
      }
    }
    expect(constructorIngredientsReducer(initialState, action))
      .toEqual({
        ...initialState,
        bun: {
          type: 'bun',
          _id: 123
        }
      })
  })

  it('should handle CLEAR_CONSTRUCTOR', () => {
    expect(
      constructorIngredientsReducer((initialState), {
        type: CLEAR_CONSTRUCTOR,
      })
    ).toEqual({
      ...initialState,
      constructorIngredients: [],
      bun: null
    })
  })

  it('should handle ADD_INGREDIENT', () => {
    const action = {
      type: ADD_INGREDIENT,
      item: {
        _id: 222,
        type: 'sause'
      },
      uniqueKey: 'nam-b-1'
    }
    expect(constructorIngredientsReducer(initialState, action))
      .toEqual({
        ...initialState,
        constructorIngredients: [
          { 
            _id: 222,
            type: 'sause', 
            uniqueKey: 'nam-b-1'
          }
        ]
      })
  })

  it('should handle REMOVE_INGREDIENT', () => {
    expect(
      constructorIngredientsReducer((initialState), {
        type: REMOVE_INGREDIENT,
        item: {
          uniqueKey: 123
        }
      })
    ).toEqual({
      ...initialState,
      constructorIngredients: []
    })
  })

  it('should handle MOVE_INGREDIENT', () => {
    const action = {
      type: MOVE_INGREDIENT,
      hoverIndex: 111,
      dragIndex: 222
    }
    expect(constructorIngredientsReducer(initialState, action))
      .toEqual({
        ...initialState,
        constructorIngredients: []
      })
  })
})