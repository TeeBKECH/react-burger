import React from 'react'
import PropTypes from 'prop-types'

const BurgerIngredients = props => {
  return (
    <div>BurgerIngredients {props}</div>
  )
}

BurgerIngredients.propTypes = {
  props: PropTypes.bool
}

export default BurgerIngredients