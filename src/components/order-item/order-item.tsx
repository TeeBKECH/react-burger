import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { formatRelative } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { TOrders } from '../../services/reducers/wsReduser'
import { useAppSelector } from '../../utils/hooks'

import styles from './order-item.module.css'
interface IFeeditemProps {
  orderData: TOrders
}

export const OrderItem: FC<IFeeditemProps> = ({orderData}) => {
  
  const location = useLocation()

  const { burgerIngredients } = useAppSelector(store => store.burgerIngredientsReducer)

  const orderIngredients = orderData.ingredients
    .map(index => burgerIngredients.find(ingredient => index === ingredient._id))
    .map(el => {
      if (el.type === 'bun') {
        return {
          ...el,
          price: el.price * 2
        }
      }
      return el
    })

  const dateFormater = formatRelative(
    new Date(orderData.createdAt),
    new Date(), 
    {
      locale: ruLocale,
      weekStartsOn: 1
    }
  )

  // console.log(orderIngredients)
  
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
        <p className="text text_type_main-default text_color_inactive">{dateFormater}</p>
      </div>
      <div className={styles.order__item_body}>
        <p className="text text_type_main-medium">
          {orderData.name}
        </p>
      </div>
      <div className={styles.order__item_footer}>
        <ul className={styles.order__item_ingredients}>
          {
            orderIngredients.length <= 6 ? (
              orderIngredients.map(el => <li><img src={el?.image_mobile} alt="" /></li>)
            ) : (
              orderIngredients.map((el, index) => {
                if (index < 5) {
                  return <li><img src={el?.image_mobile} alt="" /></li>
                }
                if (index === 5) {
                  return (
                    <li>
                      <div className={styles.order__item_overlay}>
                        <p className="text text_type_digits-default">{`+${orderIngredients.length - 5}`}</p>
                      </div>
                      <img src={orderIngredients[index].image_mobile} alt="" />
                    </li>
                  )
                }
              })
            )
          }
        </ul>
        <div className={styles.order__item_price}>
          <p className="text text_type_digits-default">{orderIngredients.reduce((acc, el) => acc + el.price, 0)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  )
}
