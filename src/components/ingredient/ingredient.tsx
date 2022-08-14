import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { useDrag } from 'react-dnd'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './ingredient.module.css'

const Ingredient = ({el, openIngredientDetails, type}) => {

  const location = useLocation();
  const ingredientId = el._id;

  const [{ opacity }, ref] = useDrag({
    type: type,
    item: { el },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <div draggable ref={ref} onClick={() => openIngredientDetails(el)} className={styles.category_item} style={{ opacity }}>
        {el.__v !== 0 && <Counter count={el.__v} size="default" />}
        <img src={el.image} alt={el.name} />
        <div className={styles.category_item_currency}>
          <span className="text text_type_digits-default">{el.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default card_title">{el.name}</p>
      </div>
    </Link>
  )
}

Ingredient.propTypes = {
  el: PropTypes.object.isRequired,
  openIngredientDetails: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default Ingredient