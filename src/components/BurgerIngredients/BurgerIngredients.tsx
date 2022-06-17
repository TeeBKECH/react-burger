import React from 'react'
import PropTypes from 'prop-types'

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import bulka_1 from '../../images/bun-01.png'
import bulka_2 from '../../images/bun-02.png'
import souse_1 from '../../images/sauce-01.png'
import souse_2 from '../../images/sauce-02.png'
import souse_3 from '../../images/sauce-03.png'
import souse_4 from '../../images/sauce-04.png'
import styles from './BurgerIngredients.module.css'

const Tabs = props => {
  const [current, setCurrent] = React.useState('Булки')
  return (
    <div className={styles.tabs}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

const BurgerIngredients = props => {
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
            Булки
          </h4>
          <div className={styles.category_items}>

            <div className={styles.category_item}>
              <Counter count={1} size="default" />
              <img src={bulka_1} alt="" />
              <div className={styles.category_item_currency}>
                <span className="text text_type_digits-default">20</span>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">Краторная булка N-200i</p>
            </div>
            <div className={styles.category_item}>
              <img src={bulka_2} alt="" />
              <div className={styles.category_item_currency}>
                <span className="text text_type_digits-default">20</span>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
            </div>

          </div>
        </article>

        <article className={styles.category}>
          <h4 className="text text_type_main-medium">
            Соусы
          </h4>
          <div className={styles.category_items}>

            <div className={styles.category_item}>
              <img src={souse_1} alt="" />
              <div className={styles.category_item_currency}>
                <span className="text text_type_digits-default">20</span>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">Соус Spicy-X</p>
            </div>
            <div className={styles.category_item}>
              <Counter count={4} size="default" />
              <img src={souse_2} alt="" />
              <div className={styles.category_item_currency}>
                <span className="text text_type_digits-default">20</span>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">Соус фирменный Space Sauce</p>
            </div>
            <div className={styles.category_item}>
              <Counter count={1} size="default" />
              <img src={souse_3} alt="" />
              <div className={styles.category_item_currency}>
                <span className="text text_type_digits-default">20</span>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">Соус фирменный Space Sauce</p>
            </div>
            <div className={styles.category_item}>
              <img src={souse_4} alt="" />
              <div className={styles.category_item_currency}>
                <span className="text text_type_digits-default">20</span>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">Соус фирменный Space Sauce</p>
            </div>

          </div>
        </article>

      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {

}

export default BurgerIngredients