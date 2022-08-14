import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'
import { Redirect } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item'

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
  const { bun, constructorIngredients, orderDetails, orderRequest, orderFailed, user } = useAppSelector(store => ({
    bun: store.constructorIngredientsReducer.bun,
    constructorIngredients: store.constructorIngredientsReducer.constructorIngredients,
    orderDetails: store.orderDetailsReducer.orderDetails,
    orderRequest: store.orderDetailsReducer.orderRequest,
    orderFailed: store.orderDetailsReducer.orderFailed,
    user: store.userReducer.user,
  }))

  const [checkLogin, setChecklogin] = useState(false)

  const dispatch = useAppDispatch()

  let totalPrice: number = 0

  if (!!constructorIngredients.length || bun.price) {
    let ingredientPrice: number = constructorIngredients
      .map(el => {
        return el.price
      })
      .reduce((prevPrice, currentValue): number => {
        return prevPrice + currentValue
      }, 0)
    let bunPrice = bun.price ? bun.price * 2 : 0
    totalPrice = ingredientPrice + bunPrice
  }


  const openOrderDetails = () => {
    if (!user) {
      setChecklogin(true)
      return
    }
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
    drop(itemId: any) {
      replaceBun(itemId.el)
    }
  });

  const [{ onHover }, dropIngredient] = useDrop({
    accept: 'other',
    collect: monitor => ({
      onHover: monitor.isOver()
    }),
    drop(itemId: any) {
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

        <ul ref={dropIngredient} className={styles.constructor_box + ' customScroller'}>
          {
            constructorIngredients.length ? constructorIngredients.map((el, i) => {
              return (
                <BurgerConstructorItem
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
                  isLocked={true}
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
        <div className={styles.total}>
          <span className="text text_type_digits-medium">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        {/* @ts-ignore */}
        <Button type="primary" size="large" onClick={openOrderDetails} disabled={!bun.price ? true : false}>
          Оформить заказ
        </Button>
      </div>
      {checkLogin && (
        <Redirect to={{pathname: '/login'}} />
      )}
      {!orderRequest && !orderFailed && orderDetails.success && (
        <Modal onClose={closeOrderDetails}>
          <OrderDetails number={orderDetails.order.number} />
        </Modal>
      )}
    </section>
  )
}

export default BurgerConstructor