import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { formatRelative } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { v4 as uuidv4 } from 'uuid'

import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { API_WS_URL } from '../../utils/api'
import { 
  WS_ADD_ORDER_DETAILS, 
  WS_CONNECTION_START, 
  WS_REMOVE_ORDER_DETAILS 
} from '../../services/actions/wsActions'

import styles from './order-item-data.module.css'

export const OrderItemData: FC = () => {

  const {
    burgerIngredients,
    wsData,
    wsConnected,
    orderDetails
  } = useAppSelector(store => ({
    burgerIngredients: store.burgerIngredientsReducer.burgerIngredients,
    wsData: store.wsReducer.wsData,
    wsConnected: store.wsReducer.wsConnected,
    orderDetails: store.wsReducer.orderDetails
  }))

  const statusVarioants: {
    created: string;
    pending: string;
    done: string;
  } = {
    created: 'Создан', 
    pending: 'В работе', 
    done: 'Готов'
  }

  const {id}: {id?: string} = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    !wsConnected && dispatch({
      type: WS_CONNECTION_START,
      payload: `${API_WS_URL}/orders/all`
    })

    return (() => {
      dispatch({
        type: WS_REMOVE_ORDER_DETAILS
      })
    })

  }, [])

  useEffect(() => {
    wsData && dispatch({
      type: WS_ADD_ORDER_DETAILS,
      payload: wsData.orders.find((el) => el._id === id)
    })

  }, [wsData, id, dispatch])

  const orderIngredients = orderDetails?.ingredients
    .map((index: string) => burgerIngredients.find(ingredient => index === ingredient._id))
    .map(el => {
      if (el && el.type === 'bun') {
        return {
          ...el,
          __v: 2
        }
      } else {
        return {
          ...el,
          __v: 1
        }
      }
    })
    .map(el => {
      return {
        ...el,
        uniqueKey: uuidv4()
      }
    })

  const totalPrice: number = orderIngredients ? orderIngredients.reduce((acc, currentValue) => {
    if (currentValue && currentValue.price) {
      return acc + (currentValue.__v * currentValue.price)
    } else {
      return acc
    }
  }, 0) : 0

  const dateFormatter: string = orderDetails ? formatRelative(
    new Date(orderDetails.createdAt),
    new Date(), 
    {
      locale: ruLocale,
      weekStartsOn: 1
    }
  ) : ''

  return (
    orderDetails && (
      <div className={styles.item__data}>
        <div className={styles.item__data_header}>
          <p className={`${styles.item__data_header_number} text text_type_digits-default`}>#{orderDetails.number}</p>
          <h4 className={`${styles.item__data_header_title} text text_type_main-medium`}>
            {orderDetails.name}
          </h4>
          <span>{statusVarioants[orderDetails.status]}</span>
        </div>
        <div className={styles.item__data_body}>
          <h4 className="text text_type_main-medium">
            Состав:
          </h4>
          <ul className={`customScroller`}>
            {
              orderIngredients && orderIngredients.map((el) => {
                return (
                  <li key={el.uniqueKey} className={styles.item__data_ingredient}>
                    <div className={styles.item__data_ingredient_img}>
                      <img src={el.image_mobile} alt={el.name} />
                    </div>
                    <p className="text text_type_main-default">{el.name}</p>
                    <div className={styles.item__data_ingredient_price}>
                      <p className="text text_type_digits-default">{el.__v} x {el.price}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className={styles.item__data_footer}>
          <p className="text text_type_main-default text_color_inactive">{dateFormatter}
          </p>
          <div className={styles.item__data_footer_price}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    )
  )
}
