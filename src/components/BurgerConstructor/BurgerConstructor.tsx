import React from 'react'
import PropTypes from 'prop-types'

import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Scrollbars } from 'react-custom-scrollbars'

import bulka_1 from '../../images/bun-01.png'
import souse_1 from '../../images/sauce-01.png'
import styles from './BurgerConstructor.module.css'

const ConstructorItems = () => {
  return (
    <div className={styles.constructor_list}>

      <div className={styles.constructor_list_item + ' ' + styles.constructor_list_item_top}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={bulka_1}
        />
      </div>

      <Scrollbars
        className={styles.constructor_box_scroll}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        thumbMinSize={30}
        universal={true}
      >
        <ul className={styles.constructor_box}>
          <li className={styles.constructor_list_item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус N-432"
              price={150}
              thumbnail={souse_1}
            />
          </li>
          <li className={styles.constructor_list_item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус N-432"
              price={150}
              thumbnail={souse_1}
            />
          </li>
          <li className={styles.constructor_list_item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус N-432"
              price={150}
              thumbnail={souse_1}
            />
          </li>
          <li className={styles.constructor_list_item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус N-432"
              price={150}
              thumbnail={souse_1}
            />
          </li>
          <li className={styles.constructor_list_item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус N-432"
              price={150}
              thumbnail={souse_1}
            />
          </li>
          <li className={styles.constructor_list_item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус N-432"
              price={150}
              thumbnail={souse_1}
            />
          </li>
          <li className={styles.constructor_list_item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус N-432"
              price={150}
              thumbnail={souse_1}
            />
          </li>
          <li className={styles.constructor_list_item}>
            <DragIcon type="primary" />
            <ConstructorElement
              text="Соус N-432"
              price={150}
              thumbnail={souse_1}
            />
          </li>
        </ul>
      </Scrollbars>

      <div className={styles.constructor_list_item + ' ' + styles.constructor_list_item_bottom}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={bulka_1}
        />
      </div>

    </div>
  )
}

const Total = () => {
  return (
    <div className={styles.total}>
      <span className="text text_type_digits-medium">550</span>
      <CurrencyIcon type="primary" />
    </div>
  )
}

const BurgerConstructor = props => {
  return (
    <section className={styles.burger_constructor}>
      <ConstructorItems />
      <div className={styles.order_block}>
        <Total />
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerConstructor