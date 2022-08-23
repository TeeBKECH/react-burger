import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'

import image1 from '../../images/bun-01.png'
import styles from './order-item-data.module.css'

export const OrderItemData: FC = () => {
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
              <img src={image1} alt="" />
            </div>
            <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
            <div className={styles.item__data_ingredient_price}>
              <p className="text text_type_digits-default">2 x 480</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={styles.item__data_ingredient}>
            <div className={styles.item__data_ingredient_img}>
              <img src={image1} alt="" />
            </div>
            <p className="text text_type_main-default">Филе Люминесцентного тетраодонтимформа</p>
            <div className={styles.item__data_ingredient_price}>
              <p className="text text_type_digits-default">1 x 430</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={styles.item__data_ingredient}>
            <div className={styles.item__data_ingredient_img}>
              <img src={image1} alt="" />
            </div>
            <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
            <div className={styles.item__data_ingredient_price}>
              <p className="text text_type_digits-default">1 x 1180</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={styles.item__data_ingredient}>
            <div className={styles.item__data_ingredient_img}>
              <img src={image1} alt="" />
            </div>
            <p className="text text_type_main-default">булка R2-D3</p>
            <div className={styles.item__data_ingredient_price}>
              <p className="text text_type_digits-default">1 x 480</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={styles.item__data_ingredient}>
            <div className={styles.item__data_ingredient_img}>
              <img src={image1} alt="" />
            </div>
            <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
            <div className={styles.item__data_ingredient_price}>
              <p className="text text_type_digits-default">2 x 480</p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
          <li className={styles.item__data_ingredient}>
            <div className={styles.item__data_ingredient_img}>
              <img src={image1} alt="" />
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
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
        <div className={styles.item__data_footer_price}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
