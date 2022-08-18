import { FC } from 'react'

import { OrderItem } from '../../components/order-item/order-item'

import styles from './orders-feed.module.css'

export const OrdersFeed: FC = () => {

  return (
    <div className={styles.feed}>
      <div className={styles.feed__left}>
        <h2 className="text text_type_main-large">
          Лента заказов
        </h2>
        <div className={`${styles.feed__items} customScroller`}>
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
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
          <p className="text text_type_digits-large">40 555</p>
        </div>
        <div className={styles.feed__right_bottom}>
          <h3 className="text text_type_main-medium">Выполнено за Сегодня:</h3>
          <p className="text text_type_digits-large">122</p>
        </div>
      </div>
    </div>
  )
}