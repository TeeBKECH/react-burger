import { FC, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import Tabs from '../tabs/tabs'
import Ingredient from '../ingredient/ingredient'
import { IIngredient } from '../../services/reducers/reducers'

import {
  ADD_INGREDIENT_DETAILS,
} from '../../services/actions/index'

import styles from './burger-ingredients.module.css'

const BurgerIngredients: FC = () => {

  const {
    burgerIngredients,
    burgerIngredientsRequest,
    burgerIngredientsFailed
  } = useAppSelector(store => store.burgerIngredientsReducer);

  const scrollRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch();

  const [current, setCurrent] = useState<string>('bun')

  const openIngredientDetails = (ingredient: IIngredient): void => {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      ingredient: ingredient
    })
  }

  const isInViewport = (): void => {

    const html = scrollRef.current;
    const titles = document.querySelectorAll(`.category_title`)

    if (html !== null) {
      let parrentOffset = html.getBoundingClientRect().top
      // let offset = 0
      let currentTab = current
      titles.forEach((title, index) => {
        const rect = title.getBoundingClientRect().top - parrentOffset
        if (rect >= 0 && rect <= 155) {
          // offset = rect
          currentTab = title.getAttribute('id') as string
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
  }

  interface IIngredientType {
    bun?: string;
    main?: string;
    sauce?: string;
  }

  const ingredientTypes: IIngredientType[] = [
    { bun: 'Булки' },
    { main: 'Начинки' },
    { sauce: 'Соусы' }
  ]

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
                const items = burgerIngredients.filter((item: IIngredient) => item.type === Object.keys(ingredientType).join())
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
                        items.map((el: IIngredient) => (
                          <Ingredient type={el.type === 'bun' ? 'bun' : 'other'} key={el._id} el={el} openIngredientDetails={openIngredientDetails} />
                        ))
                      }
                    </div>
                  </article>
                )
              })
            }
          </div>
        </section>
      )}
    </>
  )
}

export default BurgerIngredients