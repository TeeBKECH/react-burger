import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'

import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import {setOrderDetails, CLEAR_ORDER_DETAILS, ADD_BUN} from '../../services/actions/index'

import noImg from '../../images/noImg.png'
import styles from './burger-constructor.module.css'

const Total = ({ bun, items }) => {
  const [totalPrice, setTotalPrice] = useState(0)

  // useEffect(() => {
  //   if (!bun && !items) return
  //   let newPrice = items.reduce((prevPrice, currentValue) => {
  //     return prevPrice + currentValue.price
  //   }, totalPrice) + (bun.price * 2)
  //   setTotalPrice(newPrice)
  // }, [bun, items])

  return (
    <div className={styles.total}>
      <span className="text text_type_digits-medium">{totalPrice}</span>
      <CurrencyIcon type="primary" />
    </div>
  )
}

const BurgerConstructor = () => {
  const { bun, items, orderDetails, orderRequest, orderFailed } = useSelector(store => ({
    bun: store.constructorIngredientsReducer.constructorIngredients.bun,
    items: store.constructorIngredientsReducer.constructorIngredients.items,
    orderDetails: store.orderDetailsReducer.orderDetails,
    orderRequest: store.orderDetailsReducer.orderRequest,
    orderFailed: store.orderDetailsReducer.orderFailed,
  }))

  const dispatch = useDispatch()

  const openOrderDetails = () => {
    dispatch(setOrderDetails())
  }

  const closeOrderDetails = () => {
    dispatch({
      type: CLEAR_ORDER_DETAILS
    })
  }

  const addBun = (item) => {
    dispatch({
      type: ADD_BUN,
      item
    })
  }

  const addIngredient = (item) => {
    dispatch({
      type: ADD_BUN,
      item
    })
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'bun' ? 'bun' : 'other',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(itemId) {
      'bun' ? addBun(itemId) : addIngredient(itemId)
    }
  });

  return (
    <section className={styles.burger_constructor}>
      <div ref={dropTarget} className={styles.constructor_list}>

        <div className={styles.constructor_list_item + ' ' + styles.constructor_list_item_top}>
          {bun.price ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (Верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`Добавьте булку`}
              price={0}
              thumbnail={noImg}
            />
          )}
        </div>

        <ul className={styles.constructor_box + ' customScroller'}>
          {
            items.length ? items.map(el => (
              <li key={el._id} className={styles.constructor_list_item}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={el.name}
                  price={el.price}
                  thumbnail={el.image}
                />
              </li>
            )) : (
              <li className={styles.constructor_list_item + ' ' + styles.constructor_list_emptyItem}>
                <ConstructorElement
                  text={`Добавьте ингредиент`}
                  price={0}
                  thumbnail={noImg}
                />
              </li>
            )
          }
        </ul>

        <div className={styles.constructor_list_item + ' ' + styles.constructor_list_item_bottom}>
          {bun.price ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (Низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`Добавьте булку`}
              price={0}
              thumbnail={noImg}
            />
          )}
        </div>

      </div>
      <div className={styles.order_block}>
        <Total bun={bun} items={items} />
        <Button type="primary" size="large" onClick={openOrderDetails}>
          Оформить заказ
        </Button>
      </div>
      {!orderRequest && !orderFailed && orderDetails.success && (
        <Modal onClose={closeOrderDetails}>
          <OrderDetails order={orderDetails.order} />
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor