import React, { useEffect, useRef } from 'react'
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

  const scrollRef = useRef(null)

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

  const isInViewport = () => {

    const html = scrollRef.current;
    const titles = document.querySelectorAll(`.category_title`)

    let parrentOffset = html.getBoundingClientRect().top
    let offset = 0
    let currentTab = current
    console.log(parrentOffset)
    titles.forEach((title, index) => {
      const rect = title.getBoundingClientRect().top - parrentOffset
      if (rect >= 0 && rect <= 155) {
        offset = rect
        currentTab = title.getAttribute('id')
      }
      // return (
      //   rect.top >= 0 &&
      //   rect.left >= 0 &&
      //   rect.bottom <= (window.innerHeight || html.clientHeight) &&
      //   rect.right <= (window.innerWidth || html.clientWidth)
      // )
    })
    setCurrent(currentTab)
    // console.log(offset)
  }

  const ingredientTypes = [
    { bun: 'Булки' },
    { main: 'Начинки' },
    { sauce: 'Соусы' }
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

          <div 
            ref={scrollRef}
            onScroll={() => isInViewport()}
            className={`${styles.categories} customScroller`}
          >

            {
              ingredientTypes.map((ingredientType, index) => {
                const items = burgerIngredients.filter(item => item.type === Object.keys(ingredientType).join())
                return (
                  <article
                    key={index}
                    className={`${styles.category}`}
                  >
                    <h4 id={Object.keys(ingredientType).join()} className="text text_type_main-medium category_title">
                      {ingredientType[Object.keys(ingredientType).join()]}
                    </h4>
                    <div className={styles.category_items}>
                      {
                        items.map(el => (
                          <Ingredient type={el.type === 'bun' ? 'bun' : 'other'} key={el._id} el={el} openIngredientDetails={() => { openIngredientDetails(el) }} />
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