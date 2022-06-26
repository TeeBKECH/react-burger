import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Tabs from '../tabs/tabs'

import styles from './burger-ingredients.module.css'

const BurgerIngredients = ({data}) => {

  const [current, setCurrent] = React.useState('bun')
  const [ingredients, setIngredients] = React.useState(data);
  const [ingredientDetails, setIngredientDetails] = React.useState(null);

  const openIngredientDetails = (id) => {
    const item = data.filter(el => el._id === id).map(el => el)[0]
    setIngredientDetails({
      ...item
    })
  }

  const closeIngredientDetails = () => {
    setIngredientDetails(null)
  }

  useEffect(() => {
    const newData = [...data];
    setIngredients(newData.filter(el => el.type === current))
  }, [current, data])

  let title

  if (current === 'bun') {
    title = 'Булки'
  } else if (current === 'main') {
    title = 'Начинки'
  } else if (current === 'sauce') {
    title = 'Соусы'
  }

  const items = ingredients.map(el => {
    
    return (

      <div onClick={() => openIngredientDetails(el._id)} key={el._id} className={styles.category_item}>
        <Counter count={1} size="default" />
        <img src={el.image} alt={el.name} />
        <div className={styles.category_item_currency}>
          <span className="text text_type_digits-default">{el.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default card_title">{el.name}</p>
      </div>
    )
  })

  return (
    <section className={styles.igredients}>
      <div className={styles.header}>
        <h2 className="text text_type_main-large">
          Соберите бургер
        </h2>
        <Tabs current={current} setCurrent={setCurrent} />
      </div>
      <div className={`${styles.categories} customScroller`}>

        <article className={`${styles.category}`}>
          <h4 className="text text_type_main-medium">
            {title}
          </h4>
          <div className={styles.category_items}>
            {items}
          </div>
        </article>

      </div>
      {ingredientDetails && (
          <Modal title="Детали ингредиента" onClose={closeIngredientDetails}>
            <IngredientDetails details={ingredientDetails} />
          </Modal>
        )}
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BurgerIngredients