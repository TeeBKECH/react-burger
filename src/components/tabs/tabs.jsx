import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './tabs.module.css'

const Tabs = ({current, setCurrent}) => {
    
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

Tabs.propTypes = {}

export default Tabs