import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

<<<<<<< HEAD
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal'
import IngredientDetails from '../ingredient-details/ingredient-details'
import Tabs from '../tabs/tabs'
=======
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
>>>>>>> master

import styles from './burger-ingredients.module.css'

const BurgerIngredients = ({data}) => {

  const [current, setCurrent] = React.useState('bun')
  const [ingredients, setIngredients] = React.useState(data);
<<<<<<< HEAD
  const [ingredientDetails, setIngredientDetails] = React.useState(null);

  const openIngredientDetails = (id) => {
    const item = data.filter(el => el._id === id).map(el => el)[0]
    setIngredientDetails({
      ...item
    })
  }

  const closeIngredientDetails = () => {
    setIngredientDetails(null)
=======

  const Tabs = () => {
    
    return (
      <div className={styles.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    )
>>>>>>> master
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

<<<<<<< HEAD
      <div onClick={() => openIngredientDetails(el._id)} key={el._id} className={styles.category_item}>
        <Counter count={1} size="default" />
        <img src={el.image} alt={el.name} />
=======
      <div key={el._id} className={styles.category_item}>
        <Counter count={1} size="default" />
        <img src={el.image} alt="" />
>>>>>>> master
        <div className={styles.category_item_currency}>
          <span className="text text_type_digits-default">{el.price}</span>
          <CurrencyIcon type="primary" />
        </div>
<<<<<<< HEAD
        <p className="text text_type_main-default card_title">{el.name}</p>
=======
        <p className="text text_type_main-default">{el.name}</p>
>>>>>>> master
      </div>
    )
  })

  return (
    <section className={styles.igredients}>
      <div className={styles.header}>
        <h2 className="text text_type_main-large">
          Соберите бургер
        </h2>
<<<<<<< HEAD
        <Tabs current={current} setCurrent={setCurrent} />
      </div>
      <div className={`${styles.categories} customScroller`}>

        <article className={`${styles.category}`}>
=======
        <Tabs />
      </div>
      <div className={styles.categories}>

        <article className={styles.category}>
>>>>>>> master
          <h4 className="text text_type_main-medium">
            {title}
          </h4>
          <div className={styles.category_items}>
            {items}
          </div>
        </article>

      </div>
<<<<<<< HEAD
      {ingredientDetails && (
          <Modal title="Детали ингредиента" onClose={closeIngredientDetails}>
            <IngredientDetails details={ingredientDetails} />
          </Modal>
        )}
=======
>>>>>>> master
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BurgerIngredients