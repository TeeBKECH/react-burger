import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { setFormValue, updateUser } from '../../services/actions/auth'

import styles from './profile-page.module.css'

export const ProfilePage = () => {

  const {
    name,
    email
  } = useSelector(store => store.formDataReducer.user)

  const {
    passwordValue
  } = useSelector(store => store.formDataReducer.form)

  const inputRef = useRef(null)
  const dispatch = useDispatch()

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value))
  }

  const onIconClick = () => {
    inputRef.current.focus()
  }

  const submitForm = () => {
    dispatch(updateUser(name, email, passwordValue))
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile_sidebar}>
        <nav className={styles.profile_nav}>
          <NavLink to='/profile' activeClassName={styles.profile_nav_link_active} className={styles.profile_nav_link + ' text text_type_main-medium'}>
            Профиль
          </NavLink>
          <NavLink to='/profile/orders' activeClassName={styles.profile_nav_link_active} className={styles.profile_nav_link + ' text text_type_main-medium text_color_inactive'}>
            История заказов
          </NavLink>
          <NavLink to='/profile' activeClassName={styles.profile_nav_link_active} className={styles.profile_nav_link + ' text text_type_main-medium text_color_inactive'}>
            Выход
          </NavLink>
        </nav>
        <p className={styles.profile_notice + ' text text_type_main-small text_color_inactive'}>В этом разделе вы можете<br/> изменить свои персональные данные</p>
      </div>
      <div className={styles.profile_content}>
        <div className={styles.profile_form}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onFormChange}
            value={name}
            name={'name'}
            icon={'EditIcon'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'email'}
            placeholder={'Логин'}
            onChange={onFormChange}
            value={email}
            name={'email'}
            icon={'EditIcon'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={onFormChange}
            value={passwordValue}
            name={'passwordValue'}
            icon={'EditIcon'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button onClick={submitForm} type="primary" size="large">
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  )
}
