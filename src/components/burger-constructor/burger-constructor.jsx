<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
=======
import React from 'react'
>>>>>>> master
import PropTypes from 'prop-types'

import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

<<<<<<< HEAD
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'

import styles from './burger-constructor.module.css'

const orderData = {
  'orderNumber': '034536',
  'orderStatus': 'Ваш заказ начали готовить',
  'orderMessage': 'Дождитесь готовности на орбитальной станции'
}

const ConstructorItems = ({data}) => {

  const bun = data.find(el => el.type === 'bun')

  const items = data.filter(el => el.type !== 'bun').map(el => {
=======
import bulka_1 from '../../images/bun-01.png'
import styles from './burger-constructor.module.css'

const ConstructorItems = ({data}) => {

  const items = data.map(el => {
>>>>>>> master
    
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
<<<<<<< HEAD
        {bun && (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (Верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>

      <ul className={styles.constructor_box + ' customScroller'}>
=======
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={bulka_1}
        />
      </div>

      <ul className={styles.constructor_box + ' ' + styles.customScroller}>
>>>>>>> master
        {items}
      </ul>

      <div className={styles.constructor_list_item + ' ' + styles.constructor_list_item_bottom}>
<<<<<<< HEAD
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (Низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
=======
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={bulka_1}
        />
>>>>>>> master
      </div>

    </div>
  )
}

<<<<<<< HEAD
const Total = ({data}) => {

  const [totalPrice, setTotalprice] = useState(0);

  useEffect(() => {
    const newPrice = data.reduce((prevPrice, currentValue) => {
      return prevPrice + currentValue.price
    }, totalPrice)

    setTotalprice(newPrice)
  }, [])

  return (
    <div className={styles.total}>
      <span className="text text_type_digits-medium">{totalPrice}</span>
=======
const Total = () => {
  return (
    <div className={styles.total}>
      <span className="text text_type_digits-medium">550</span>
>>>>>>> master
      <CurrencyIcon type="primary" />
    </div>
  )
}

const BurgerConstructor = ({data}) => {
<<<<<<< HEAD
  const [orderDetails, setorderDetails] = React.useState(false);

  const openOrdertDetails = () => {
    setorderDetails(true)
  }

  const closeOrderDetails = () => {
    setorderDetails(false)
  }

=======
>>>>>>> master
  return (
    <section className={styles.burger_constructor}>
      <ConstructorItems data={data} />
      <div className={styles.order_block}>
<<<<<<< HEAD
        <Total data={data} />
        <Button type="primary" size="large" onClick={openOrdertDetails}>
          Оформить заказ
        </Button>
      </div>
      {orderDetails && (
          <Modal onClose={closeOrderDetails}>
            <OrderDetails order={orderData} />
          </Modal>
        )}
=======
        <Total />
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
>>>>>>> master
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BurgerConstructor