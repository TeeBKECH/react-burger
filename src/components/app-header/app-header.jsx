import React from 'react'
import { Link } from 'react-router-dom'

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import classNames from 'classnames'

import styles from './app-header.module.css'

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to='/' className={classNames(styles.nav_link, styles.nav_link_active)}>
          <BurgerIcon type='primary' />
          <p className="text text_type_main-default">
            Конструктор
          </p>
        </Link>
        <Link to='#2' className={styles.nav_link}>
          <ListIcon type='secondary' />
          <p className=" text text_type_main-default text_color_inactive">
            Лента заказов
          </p>
        </Link>
      </nav>
      <div className={styles.logo}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <Link to='/profile' className={styles.profile_link}>
        <ProfileIcon type='secondary' />
        <p className=" text text_type_main-default text_color_inactive">
          Личный кабинет
        </p>
      </Link>
    </header>
  )
}

export default AppHeader