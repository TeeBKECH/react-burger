import React from 'react'
import PropTypes from 'prop-types'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './tabs.module.css'

const Tabs = ({current, setCurrent}) => {
    
  return (
    <div className={styles.tabs}>
      <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={setCurrent}>
        Начинки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
    </div>
  )
}

Tabs.propTypes = {
  current: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired
}

export default Tabs