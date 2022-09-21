import { wsReducer, initialState } from "./wsReducer"
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_ON_MESSAGE,
  WS_ADD_ORDER_DETAILS,
  WS_REMOVE_ORDER_DETAILS
} from '../actions/wsActions'

describe('wsReducer', () => {

  // Если нет подходящего action, возваращем initialState
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState)
  })

  // Если соединение прошло успешно, выставляем соответствующие флаги
  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      wsReducer((initialState), {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      wsConnectedError: false
    })
  })

  // Если соединение закрыто успешно, выставляем соответствующие флаги
  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      wsReducer((initialState), {
        type: WS_CONNECTION_CLOSED
      })
    ).toEqual({
      ...initialState,
      wsConnected: false,
      wsConnectedError: false
    })
  })

  // Если соединение не получилось из-за ошибки, высталяем флаги
  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      wsReducer((initialState), {
        type: WS_CONNECTION_ERROR,
        payload: undefined
      })
    ).toEqual({
      ...initialState,
      wsConnected: true,
      error: undefined
    })
  })

  // Получаем данные при подключении и записываем их в стейт
  it('should handle WS_ON_MESSAGE', () => {
    expect(
      wsReducer((initialState), {
        type: WS_ON_MESSAGE,
        payload: {
          orders: [111, 222, 333],
          total: 123,
          totalToday: 5,
        }
      })
    ).toEqual({
      ...initialState,
      wsData: {
        orders: [111, 222, 333],
        total: 123,
        totalToday: 5,
      }
    })
  })

  // Получаем данные заказа и записываем их в стейт
  it('should handle WS_ADD_ORDER_DETAILS', () => {
    expect(
      wsReducer((initialState), {
        type: WS_ADD_ORDER_DETAILS,
        payload: {
          ingredients: [111, 222, 333],
          _id: 123,
          status: 'done',
          name: 'name',
          number: 321,
          createdAt: '25.10.2022',
          updatedAt: '25.10.2022',
        }
      })
    ).toEqual({
      ...initialState,
      orderDetails: {
        ingredients: [111, 222, 333],
        _id: 123,
        status: 'done',
        name: 'name',
        number: 321,
        createdAt: '25.10.2022',
        updatedAt: '25.10.2022',
      }
    })
  })

  // Получаем данные при подключении и записываем их в стейт
  it('should handle WS_REMOVE_ORDER_DETAILS', () => {
    expect(
      wsReducer((initialState), {
        type: WS_REMOVE_ORDER_DETAILS,
        payload: null
      })
    ).toEqual({
      ...initialState,
      orderDetails: null
    })
  })
})