import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import { ADD_INGREDIENT_DETAILS } from '../../services/actions'
import { IIngredient } from '../../services/reducers/reducers'

import styles from './ingredient-details.module.css'

const IngredientDetails: FC = () => {

  const {
    burgerIngredients,
    ingredientDetails
  } = useAppSelector(store => ({
    burgerIngredients: store.burgerIngredientsReducer.burgerIngredients,
    ingredientDetails: store.ingredientDetailsReducer.ingredientDetails
  }))

  const {ingredientId}: {ingredientId?: number} = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      ingredient: burgerIngredients.find((el: IIngredient) => el._id === ingredientId)
    })
  }, [burgerIngredients])

  return (
    ingredientDetails && (
      <div className={styles.ingredient}>
        <div className={styles.ingredient_img}>
          <img src={ingredientDetails.image} alt={ingredientDetails.name} />
        </div>
        <h4 className={`${styles.ingredient_title} text text_type_main-medium`}>{ingredientDetails.name}</h4>
        <div className={`${styles.ingredient_info} text text_type_main-default text_color_inactive`}>
          <div className={styles.ingredient_info_item}>
            <p>Калории, ккал</p>
            <span>{ingredientDetails.calories}</span>
          </div>
          <div className={styles.ingredient_info_item}>
            <p>Белки, г</p>
            <span>{ingredientDetails.proteins}</span>
          </div>
          <div className={styles.ingredient_info_item}>
            <p>Жиры, г</p>
            <span>{ingredientDetails.fat}</span>
          </div>
          <div className={styles.ingredient_info_item}>
            <p>Углеводы, г</p>
            <span>{ingredientDetails.carbohydrates}</span>
          </div>
        </div>
      </div>
    )
  )
}

export default IngredientDetails