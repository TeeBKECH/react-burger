import React from 'react'

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import styles from './app-header.module.css'

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
<<<<<<< HEAD
        <a href='#1' className={classNames(styles.nav_link, styles.nav_link_active)}>
=======
        <a href='#' className={classNames(styles.nav_link, styles.nav_link_active)}>
>>>>>>> master
          <BurgerIcon type='primary' />
          <p className="text text_type_main-default">
            Конструктор
          </p>
        </a>
<<<<<<< HEAD
        <a href='#2' className={styles.nav_link}>
=======
        <a href='#' className={styles.nav_link}>
>>>>>>> master
          <ListIcon type='secondary' />
          <p className=" text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </a>
      </nav>
      <div className={styles.logo}>
<<<<<<< HEAD
        <a href="#3">
          <Logo />
        </a>
      </div>
      <a href='#4' className={styles.profile_link}>
=======
        <a href="#">
          <Logo />
        </a>
      </div>
      <a href='#' className={styles.profile_link}>
>>>>>>> master
        <ProfileIcon type='secondary' />
        <p className=" text text_type_main-default text_color_inactive">
          Личный кабинет
        </p>
      </a>
    </header>
  )
}

export default AppHeader