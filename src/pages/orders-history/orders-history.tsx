import { FC, useEffect } from 'react'
import { OrderItem } from '../../components/order-item/order-item'
import { WS_CONNECTION_AUTH_START } from '../../services/actions/wsActions'
import { TOrders } from '../../services/reducers/wsReduser'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import styles from './orders-history.module.css'

export const OrdersHistory: FC = () => {

  const { wsData, wsConnected } = useAppSelector(store => store.wsReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_AUTH_START
    })
  }, [])

  return (
    <div className={`${styles.feed__items} customScroller`}>
      {
        wsConnected && wsData && wsData.orders.reverse().map((el: TOrders) => {
          return <OrderItem orderData={el} key={el._id} />
        })
      }
    </div>
  )
}
