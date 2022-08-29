import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './app-header.module.css'

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <nav className={styles.header_nav}>
          <NavLink exact={true} to='/' activeClassName={styles.nav_link_active} className={`${styles.nav_link} text text_type_main-default text_color_inactive`}>
            <BurgerIcon type='secondary' />
            <p>Конструктор</p>
          </NavLink>
          <NavLink to='/feed' activeClassName={styles.nav_link_active} className={`${styles.nav_link} text text_type_main-default text_color_inactive`}>
            <ListIcon type='secondary' />
            <p>Лента заказов</p>
          </NavLink>
        </nav>
        <div className={styles.logo}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <div className={styles.profile}>
          <NavLink to='/profile' activeClassName={styles.nav_link_active} className={`${styles.nav_link} text text_type_main-default text_color_inactive`}>
            <ProfileIcon type='secondary' />
            <p>Личный кабинет</p>
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default AppHeader