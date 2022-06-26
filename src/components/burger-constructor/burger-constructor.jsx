import React from 'react'
import PropTypes from 'prop-types'

import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import bulka_1 from '../../images/bun-01.png'
import styles from './burger-constructor.module.css'

const ConstructorItems = ({data}) => {

  const items = data.filter(el => el.type !== 'bun').map(el => {
    
    return (

      <li key={el._id} className={styles.constructor_list_item}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={el.name}
          price={el.price}
          thumbnail={el.image}
        />
      </li>
    )
  })

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

      <ul className={styles.constructor_box + ' ' + styles.customScroller}>
        {items}
      </ul>

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

const BurgerConstructor = ({data}) => {
  return (
    <section className={styles.burger_constructor}>
      <ConstructorItems data={data} />
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BurgerConstructor