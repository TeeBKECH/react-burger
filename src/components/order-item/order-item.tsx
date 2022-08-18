import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import image1 from '../../images/bun-01.png'
import styles from './order-item.module.css'

export const OrderItem: FC = () => {
  const location = useLocation()
  
  return (
    <Link
      to={{
        pathname: `/feed/1`,
        state: { background: location },
      }}
      className={styles.order__item}
    >
      <div className={styles.order__item_header}>
        <p className="text text_type_digits-default">#412345</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
      </div>
      <div className={styles.order__item_body}>
        <p className="text text_type_main-medium">
          Death Star Starship Main бургер
        </p>
      </div>
      <div className={styles.order__item_footer}>
        <ul className={styles.order__item_ingredients}>
          <li><img src={image1} alt="" /></li>
          <li><img src={image1} alt="" /></li>
          <li><img src={image1} alt="" /></li>
          <li><img src={image1} alt="" /></li>
          <li><img src={image1} alt="" /></li>
          <li>
            <div className={styles.order__item_overlay}>
              <p className="text text_type_digits-default">+3</p>
            </div>
            <img src={image1} alt="" />
          </li>
        </ul>
        <div className={styles.order__item_price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  )
}
