import React from 'react'
import PropTypes from 'prop-types'
import { useDrag } from 'react-dnd'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './ingredient.module.css'

const Ingredient = ({el, openIngredientDetails, type}) => {

  const [{ opacity }, ref] = useDrag({
    type: type,
    item: { el },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <div ref={ref} onClick={() => openIngredientDetails(el)} className={styles.category_item} style={{ opacity }}>
      {el._v && <Counter count={el._v} size="default" />}
      <img src={el.image} alt={el.name} />
      <div className={styles.category_item_currency}>
        <span className="text text_type_digits-default">{el.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default card_title">{el.name}</p>
    </div>
  )
}

Ingredient.propTypes = {
  el: PropTypes.object.isRequired,
  openIngredientDetails: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default Ingredient