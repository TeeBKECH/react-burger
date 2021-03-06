import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'

import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient'
import Modal from '../modal/modal'
import OrderDetails from '../order-details/order-details'
import {
  setOrderDetails, 
  CLEAR_ORDER_DETAILS, 
  BUN_REPLACE, 
  INGREDIENT_INCREMENT, 
  INGREDIENT_DECREMENT,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT
} from '../../services/actions/index'

import noImg from '../../images/noImg.png'
import styles from './burger-constructor.module.css'

const BurgerConstructor = () => {
  const { bun, constructorIngredients, orderDetails, orderRequest, orderFailed } = useSelector(store => ({
    bun: store.constructorIngredientsReducer.bun,
    constructorIngredients: store.constructorIngredientsReducer.constructorIngredients,
    orderDetails: store.orderDetailsReducer.orderDetails,
    orderRequest: store.orderDetailsReducer.orderRequest,
    orderFailed: store.orderDetailsReducer.orderFailed,
  }))

  const dispatch = useDispatch()

  let totalPrice = constructorIngredients.length ? constructorIngredients.reduce((prevPrice, currentValue) => {
    return prevPrice + currentValue.price
  }, 0) : 0;
  totalPrice = bun.price ? totalPrice + (bun.price * 2) : totalPrice

  const openOrderDetails = () => {
    dispatch(setOrderDetails())
  }

  const closeOrderDetails = () => {
    dispatch({
      type: CLEAR_ORDER_DETAILS
    })
  }

  const replaceBun = (item) => {
    dispatch({
      type: BUN_REPLACE,
      item
    })
    dispatch({
      type: INGREDIENT_INCREMENT,
      item
    })
  }

  const addIngredient = (item) => {
    dispatch({
      type: INGREDIENT_INCREMENT,
      item
    })
    dispatch({
      type: ADD_INGREDIENT,
      uniqueKey: uuidv4(),
      item
    })
  }

  const removeIngredient = (item) => {
    dispatch({
      type: INGREDIENT_DECREMENT,
      item
    })
    dispatch({
      type: REMOVE_INGREDIENT,
      item
    })
  }

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
        dispatch({
          type: MOVE_INGREDIENT,
          dragIndex,
          hoverIndex
        })
    },
    [constructorIngredients],
)

  const [{ isHover }, dropBun] = useDrop({
    accept: 'bun',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(itemId) {
      replaceBun(itemId.el)
    }
  });

  const [{ onHover }, dropIngredient] = useDrop({
    accept: 'other',
    collect: monitor => ({
      onHover: monitor.isOver()
    }),
    drop(itemId) {
      addIngredient(itemId.el)
    }
  });

  return (
    <section className={styles.burger_constructor}>
      <div ref={dropBun} className={styles.constructor_list}>

        <div className={styles.constructor_list_item + ' ' + styles.constructor_list_item_top}>
          {bun.price ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (????????)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`???????????????? ??????????`}
              price={0}
              thumbnail={noImg}
            />
          )}
        </div>

        <ul ref={dropIngredient} className={styles.constructor_box + ' customScroller'}>
          {
            constructorIngredients.length ? constructorIngredients.map((el, i) => {
              return (
                <ConstructorIngredient
                  key={el.uniqueKey}
                  moveIngredient={moveIngredient}
                  removeIngredient={() => removeIngredient(el)} 
                  el={el} 
                  index={i} 
                />
              )
            }) : (
              <li className={styles.constructor_list_item + ' ' + styles.constructor_list_emptyItem}>
                <ConstructorElement
                  text={`???????????????? ????????????????????`}
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
              text={`${bun.name} (??????)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`???????????????? ??????????`}
              price={0}
              thumbnail={noImg}
            />
          )}
        </div>

      </div>
      <div className={styles.order_block}>
        <div className={styles.total}>
          <span className="text text_type_digits-medium">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openOrderDetails} disabled={!bun.price ? true : false}>
          ???????????????? ??????????
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