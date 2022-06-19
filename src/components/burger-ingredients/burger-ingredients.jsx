import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './burger-ingredients.module.css'

const BurgerIngredients = ({data}) => {

  const [current, setCurrent] = React.useState('bun')
  const [ingredients, setIngredients] = React.useState(data);

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
  }

  const filterIngredients = () => {
    const newData = [...data];
    setIngredients(newData.filter(el => el.type == current))
  }

  useEffect(() => {
    filterIngredients()
  }, [current])

  let title

  if (current == 'bun') {
    title = 'Булки'
  } else if (current == 'main') {
    title = 'Начинки'
  } else if (current == 'sauce') {
    title = 'Соусы'
  }

  const items = ingredients.map(el => {
    
    return (

      <div key={el._id} className={styles.category_item}>
        <Counter count={1} size="default" />
        <img src={el.image} alt="" />
        <div className={styles.category_item_currency}>
          <span className="text text_type_digits-default">{el.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{el.name}</p>
      </div>
    )
  })

  return (
    <section className={styles.igredients}>
      <div className={styles.header}>
        <h2 className="text text_type_main-large">
          Соберите бургер
        </h2>
        <Tabs />
      </div>
      <div className={styles.categories}>

        <article className={styles.category}>
          <h4 className="text text_type_main-medium">
            {title}
          </h4>
          <div className={styles.category_items}>
            {items}
          </div>
        </article>

      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default BurgerIngredients