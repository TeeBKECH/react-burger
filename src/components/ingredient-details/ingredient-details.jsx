import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { ADD_INGREDIENT_DETAILS, getBurgerIngredients } from '../../services/actions'

import styles from './ingredient-details.module.css'

const IngredientDetails = () => {

  const {
    burgerIngredients,
    ingredientDetails
  } = useSelector(store => ({
    burgerIngredients: store.burgerIngredientsReducer.burgerIngredients,
    ingredientDetails: store.ingredientDetailsReducer.ingredientDetails
  }))

  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!ingredientDetails) {
      dispatch(getBurgerIngredients())
      dispatch({
        type: ADD_INGREDIENT_DETAILS,
        ingredient: burgerIngredients.find(el => el._id === params.ingredientId)
      })
      console.log(burgerIngredients)
    }
  }, [burgerIngredients])

  return (
    <>
      {ingredientDetails && (
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
      )}
    </>
  )
}

export default IngredientDetails