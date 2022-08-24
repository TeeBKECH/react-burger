import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import image1 from '../../images/bun-01.png'
import styles from './order-item.module.css'

import { TOrders } from '../../services/reducers/wsReduser'
import { useAppSelector } from '../../utils/hooks'

interface IFeeditem {
  orderData: TOrders
}

export const OrderItem: FC<IFeeditem> = ({orderData}) => {

  const { burgerIngredients } = useAppSelector(store => store.burgerIngredientsReducer)

  const location = useLocation()

  const orderIngredients = orderData.ingredients.map(id => {
    return burgerIngredients.find(ingredient => id === ingredient._id)
  })

  console.log(orderIngredients)
  console.log(burgerIngredients)
  
  return (
    <Link
      to={{
        pathname: `/feed/${orderData._id}`,
        state: { background: location },
      }}
      className={styles.order__item}
    >
      <div className={styles.order__item_header}>
        <p className="text text_type_digits-default">#{orderData.number}</p>
        <p className="text text_type_main-default text_color_inactive">{orderData.createdAt}</p>
      </div>
      <div className={styles.order__item_body}>
        <p className="text text_type_main-medium">
          {orderData.name}
        </p>
      </div>
      <div className={styles.order__item_footer}>
        <ul className={styles.order__item_ingredients}>
          {
            orderIngredients.map(ingredient => {
              return <li><img src={ingredient.image_mobile} alt="" /></li>
            })
          }
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
