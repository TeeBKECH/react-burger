import React from 'react'
import PropTypes from 'prop-types'

const BurgerConstructor = props => {
  return (
    <div>BurgerConstructor {props}</div>
  )
}

BurgerConstructor.propTypes = {
  props: PropTypes.bool
}

export default BurgerConstructor