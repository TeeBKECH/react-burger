import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

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
        {items}
      </ul>

      <div className={styles.constructor_list_item + ' ' + styles.constructor_list_item_bottom}>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (Низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>

    </div>
  )
}

const Total = ({data}) => {

  const [totalPrice, setTotalprice] = useState(0);

  

  useEffect(() => {
    const newPrice = data.reduce((prevPrice, currentValue) => {
      return prevPrice + currentValue.price
    }, totalPrice)

    setTotalprice(newPrice)
  }, [data])

  return (
    <div className={styles.total}>
      <span className="text text_type_digits-medium">{totalPrice}</span>
      <CurrencyIcon type="primary" />
    </div>
  )
}

const BurgerConstructor = ({data}) => {
  const [orderDetails, setorderDetails] = React.useState(false);

  const openOrdertDetails = () => {
    setorderDetails(true)
  }

  const closeOrderDetails = () => {
    setorderDetails(false)
  }

  return (
    <section className={styles.burger_constructor}>
      <ConstructorItems data={data} />
      <div className={styles.order_block}>
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
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BurgerConstructor