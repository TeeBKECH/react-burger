import React from 'react'
import { NavLink } from 'react-router-dom'

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './app-header.module.css'

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink exact={true} to='/' activeClassName={styles.nav_link_active} className={`${styles.nav_link} text text_type_main-default text_color_inactive`}>
          <BurgerIcon type='secondary' />
          <p>Конструктор</p>
        </NavLink>
        <NavLink to='/orders-list' activeClassName={styles.nav_link_active} className={`${styles.nav_link} text text_type_main-default text_color_inactive`}>
          <ListIcon type='secondary' />
          <p>Лента заказов</p>
        </NavLink>
      </nav>
      <div className={styles.logo}>
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <NavLink to='/profile' activeClassName={styles.nav_link_active} className={`${styles.nav_link} text text_type_main-default text_color_inactive`}>
        <ProfileIcon type='secondary' />
        <p>Личный кабинет</p>
      </NavLink>
    </header>
  )
}

export default AppHeader