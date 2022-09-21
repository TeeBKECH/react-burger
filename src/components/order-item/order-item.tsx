import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { formatRelative } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

import { v4 as uuidv4 } from 'uuid'

import { TOrder } from '../../services/reducers/wsReducer'
import { useAppSelector } from '../../utils/hooks'

import styles from './order-item.module.css'
interface IFeeditemProps {
  orderData: TOrder
}

export const OrderItem: FC<IFeeditemProps> = ({orderData}) => {
  
  const location = useLocation()

  const { burgerIngredients } = useAppSelector(store => store.burgerIngredientsReducer)

  const orderIngredients = orderData.ingredients
    .map((index: string) => burgerIngredients.find(ingredient => index === ingredient._id))
    .map(el => {
      if (el && el.type === 'bun') {
        return {
          ...el,
          price: el.price * 2
        }
      }
      return el
    })
    .map(el => {
      return {
        ...el,
        uniqueKey: uuidv4()
      }
    })

  const dateFormater: string = formatRelative(
    new Date(orderData.createdAt),
    new Date(), 
    {
      locale: ruLocale,
      weekStartsOn: 1
    }
  )
  
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
              orderIngredients.map(el => <li key={el.uniqueKey}><img src={el?.image_mobile} alt="" /></li>)
            ) : (
              orderIngredients.map((el, index) => {
                if (index < 5) {
                  return <li key={el.uniqueKey}><img src={el?.image_mobile} alt="" /></li>
                }
                if (index === 5) {
                  return (
                    <li key={el.uniqueKey}>
                      <div className={styles.order__item_overlay}>
                        <p className="text text_type_digits-default">{`+${orderIngredients.length - 5}`}</p>
                      </div>
                      <img src={orderIngredients[index].image_mobile} alt="" />
                    </li>
                  )
                }
                return null
              })
            )
          }
        </ul>
        <div className={styles.order__item_price}>
          <p className="text text_type_digits-default">{orderIngredients.reduce((acc, el) => {
              if (el && el.price) {
                return acc + el.price
              } else {
                return acc
              }
            }, 0)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  )
}
