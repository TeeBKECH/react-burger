import { FC, useEffect } from 'react'
import { OrderItem } from '../../components/order-item/order-item'
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/wsActions'
import { TOrder } from '../../services/reducers/wsReducer'
import { API_WS_URL, getCookie } from '../../utils/api'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import styles from './orders-history.module.css'

export const OrdersHistory: FC = () => {
  
  const { wsData, wsConnected } = useAppSelector(store => store.wsReducer)
  const dispatch = useAppDispatch()

  const accessToken = getCookie('accessToken')?.replace('Bearer ', '')

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: `${API_WS_URL}/orders?token=${accessToken}`
    })

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED
      })
    }
  }, [])

  return (
    <div className={`${styles.feed__items} customScroller`}>
      {
        wsConnected && wsData && wsData.orders.reverse().map((el) => {
          return <OrderItem orderData={el} key={el._id} />
        })
      }
    </div>
  )
}
