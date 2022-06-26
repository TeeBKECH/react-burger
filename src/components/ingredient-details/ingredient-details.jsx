import React from 'react'
import PropTypes from 'prop-types'

import styles from './ingredient-details.module.css'

const IngredientDetails = ({details}) => {
  return (
    <div className={styles.ingredient}>
      <div className={styles.ingredient_img}>
        <img src={details.image} alt={details.name} />
      </div>
      <h4 className={`${styles.ingredient_title} text text_type_main-medium`}>{details.name}</h4>
      <div className={`${styles.ingredient_info} text text_type_main-default text_color_inactive`}>
        <div className={styles.ingredient_info_item}>
          <p>Калории, ккал</p>
          <span>{details.calories}</span>
        </div>
        <div className={styles.ingredient_info_item}>
          <p>Белки, г</p>
          <span>{details.proteins}</span>
        </div>
        <div className={styles.ingredient_info_item}>
          <p>Жиры, г</p>
          <span>{details.fat}</span>
        </div>
        <div className={styles.ingredient_info_item}>
          <p>Углеводы, г</p>
          <span>{details.carbohydrates}</span>
        </div>
      </div>
    </div>
  )
}
IngredientDetails.propTypes = {}

export default IngredientDetails