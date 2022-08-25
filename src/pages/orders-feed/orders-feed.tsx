import { FC, useEffect } from 'react'

import { OrderItem } from '../../components/order-item/order-item'
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/wsActions'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import { TOrders } from '../../services/reducers/wsReduser'

import styles from './orders-feed.module.css'

export const OrdersFeed: FC = () => {

  const { wsData, wsConnected } = useAppSelector(store => store.wsReducer)
  const dispatch = useAppDispatch()

  console.log(wsData)

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START
    })

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED
      })
    }
  }, [])

  return (
    <div className={styles.feed}>
      <div className={styles.feed__left}>
        <h2 className="text text_type_main-large">
          Лента заказов
        </h2>
        <div className={`${styles.feed__items} customScroller`}>
          {
            wsConnected && wsData && wsData.orders.map((el: TOrders) => {
              return <OrderItem orderData={el} key={el._id} />
            })
          }
        </div>
      </div>
      <div className={styles.feed__right}>
        <div className={styles.feed__right_top}>
          <div className={`${styles.feed__right_status} ${styles.feed__right_status_ready}`}>
            <h3 className="text text_type_main-medium">Готовы:</h3>
            <ul>
              <li className="text text_type_main-default">034533</li>
              <li className="text text_type_main-default">034532</li>
              <li className="text text_type_main-default">034531</li>
              <li className="text text_type_main-default">034530</li>
              <li className="text text_type_main-default">034529</li>
              <li className="text text_type_main-default">034528</li>
              <li className="text text_type_main-default">034522</li>
            </ul>
          </div>
          <div className={`${styles.feed__right_status} ${styles.feed__right_status_inprogress}`}>
            <h3 className="text text_type_main-medium">В работе:</h3>
            <ul>
              <li className="text text_type_main-default">034533</li>
              <li className="text text_type_main-default">034532</li>
              <li className="text text_type_main-default">034531</li>
              <li className="text text_type_main-default">034530</li>
            </ul>
          </div>
        </div>
        <div className={styles.feed__right_middle}>
          <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
          <p className="text text_type_digits-large">{wsData && wsData.total}</p>
        </div>
        <div className={styles.feed__right_bottom}>
          <h3 className="text text_type_main-medium">Выполнено за Сегодня:</h3>
          <p className="text text_type_digits-large">{wsData && wsData.totalToday}</p>
        </div>
      </div>
    </div>
  )
}