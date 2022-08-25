import { FC, useEffect } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { useParams } from 'react-router-dom'
import { WS_ADD_ORDER_DETAILS } from '../../services/actions/wsActions'
import { formatRelative } from 'date-fns'
import ruLocale from 'date-fns/locale/ru'

import styles from './order-item-data.module.css'

export const OrderItemData: FC = () => {

  const {
    burgerIngredients,
    wsData,
    orderDetails
  } = useAppSelector(store => ({
    burgerIngredients: store.burgerIngredientsReducer.burgerIngredients,
    wsData: store.wsReducer.wsData,
    orderDetails: store.wsReducer.orderDetails
  }))

  const {id}: {id?: number} = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({
      type: WS_ADD_ORDER_DETAILS,
      payload: wsData.orders.find((el) => el._id === id)
    })
    console.log(orderDetails)

  }, [])

  const dateFormater = formatRelative(
    new Date(orderDetails.createdAt),
    new Date(), 
    {
      locale: ruLocale,
      weekStartsOn: 1
    }
  )

  return (
    <div className={styles.item__data}>
      <div className={styles.item__data_header}>
        <p className={`${styles.item__data_header_number} text text_type_digits-default`}>#412345</p>
        <h4 className={`${styles.item__data_header_title} text text_type_main-medium`}>
          Black Hole Singularity острый бургер
        </h4>
        <span>Выполнен</span>
      </div>
      <div className={styles.item__data_body}>
        <h4 className="text text_type_main-medium">
          Состав:
        </h4>
        <ul className={`customScroller`}>
          <li className={styles.item__data_ingredient}>
            <div className={styles.item__data_ingredient_img}>
              <img src={''} alt="" />
            </div>
            <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
            <div className={styles.item__data_ingredient_price}>
              <p className="text text_type_digits-default">2 x 480</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={styles.item__data_ingredient}>
            <div className={styles.item__data_ingredient_img}>
              <img src={''} alt="" />
            </div>
            <p className="text text_type_main-default">Филе Люминесцентного тетраодонтимформа</p>
            <div className={styles.item__data_ingredient_price}>
              <p className="text text_type_digits-default">1 x 430</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={styles.item__data_ingredient}>
            <div className={styles.item__data_ingredient_img}>
              <img src={''} alt="" />
            </div>
            <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
            <div className={styles.item__data_ingredient_price}>
              <p className="text text_type_digits-default">1 x 1180</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={styles.item__data_ingredient}>
            <div className={styles.item__data_ingredient_img}>
              <img src={''} alt="" />
            </div>
            <p className="text text_type_main-default">булка R2-D3</p>
            <div className={styles.item__data_ingredient_price}>
              <p className="text text_type_digits-default">1 x 480</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={styles.item__data_ingredient}>
            <div className={styles.item__data_ingredient_img}>
              <img src={''} alt="" />
            </div>
            <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
            <div className={styles.item__data_ingredient_price}>
              <p className="text text_type_digits-default">2 x 480</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={styles.item__data_ingredient}>
            <div className={styles.item__data_ingredient_img}>
              <img src={''} alt="" />
            </div>
            <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
            <div className={styles.item__data_ingredient_price}>
              <p className="text text_type_digits-default">2 x 480</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.item__data_footer}>
        <p className="text text_type_main-default text_color_inactive">{dateFormater}</p>
        <div className={styles.item__data_footer_price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
