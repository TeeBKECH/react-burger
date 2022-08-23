import { FC } from 'react'
import { OrderItem } from '../../components/order-item/order-item'

import styles from './orders-history.module.css'

export const OrdersHistory: FC = () => {
  return (
    <div className={`${styles.feed__items} customScroller`}>
      {/* <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem /> */}
    </div>
  )
}
