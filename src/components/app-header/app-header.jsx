import React from 'react'
import PropTypes from 'prop-types'

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import styles from './app-header.module.css'

const AppHeader = props => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href='#' className={classNames(styles.nav_link, styles.nav_link_active)}>
          <BurgerIcon type='primary' />
          <p className="text text_type_main-default">
            Конструктор
          </p>
        </a>
        <a href='#' className={styles.nav_link}>
          <ListIcon type='secondary' />
          <p className=" text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </a>
      </nav>
      <div className={styles.logo}>
        <a href="#">
          <Logo />
        </a>
      </div>
      <a href='#' className={styles.profile_link}>
        <ProfileIcon type='secondary' />
        <p className=" text text_type_main-default text_color_inactive">
          Личный кабинет
        </p>
      </a>
    </header>
  )
}

AppHeader.propTypes = {

}

export default AppHeader