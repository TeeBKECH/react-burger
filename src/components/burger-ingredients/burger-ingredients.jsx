import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getBurgerIngredients } from '../../services/actions/index';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Tabs from '../tabs/tabs'
import Ingredient from '../ingredient/ingredient'

import {
  ADD_INGREDIENT_DETAILS,
  REMOVE_INGREDIENT_DETAILS
} from '../../services/actions/index'

import styles from './burger-ingredients.module.css'

const BurgerIngredients = () => {

  const { 
    burgerIngredients,
    burgerIngredientsRequest, 
    burgerIngredientsFailed
  } = useSelector(store => store.burgerIngredientsReducer);

  const { ingredientDetails } = useSelector(store => store.ingredientDetailsReducer);

  const dispatch = useDispatch();

  const [current, setCurrent] = React.useState('bun')

  const openIngredientDetails = (ingredient) => {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      ingredient: ingredient
    })
  }

  const closeIngredientDetails = () => {
    dispatch({
      type: REMOVE_INGREDIENT_DETAILS
    })
  }

  const ingredientTypes = [
    {bun: 'Булки'},
    {main: 'Начинки'},
    {sauce: 'Соусы'}
  ]

  useEffect(() => {
    dispatch(getBurgerIngredients())
  }, [])

  return (
    <>
      {burgerIngredientsRequest && 'Идет загрузка...'}
      {burgerIngredientsFailed && 'Произошла ошибка при загрузке!'}
      {!burgerIngredientsFailed && !burgerIngredientsRequest && !!burgerIngredients.length && (
        <section className={styles.igredients}>
          <div className={styles.header}>
            <h2 className="text text_type_main-large">
              Соберите бургер
            </h2>
            <Tabs current={current} setCurrent={setCurrent} />
          </div>

          <div className={`${styles.categories} customScroller`}>

            {
              ingredientTypes.map((el, index) => {
                const items = burgerIngredients.filter(item => item.type === Object.keys(el).join())
                return (
                  <article key={index} className={`${styles.category}`}>
                    <h4 className="text text_type_main-medium">
                      {el[Object.keys(el).join()]}
                    </h4>
                    <div className={styles.category_items}>
                      {
                        items.map(el => (
                          <Ingredient type={Object.keys(el).join() === 'bun' ? 'bun' : 'other'} key={el._id} el={el} openIngredientDetails={() => {openIngredientDetails(el)}}/>
                        ))
                      }
                    </div>
                  </article>
                )
              })
            }

          </div>
          {ingredientDetails && (
              <Modal title="Детали ингредиента" onClose={closeIngredientDetails}>
                <IngredientDetails details={ingredientDetails} />
              </Modal>
            )}
        </section>
      )}
    </>
  )
}

export default BurgerIngredients