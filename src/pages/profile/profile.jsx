import React, { useCallback, useMemo, useRef } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { setFormValue, updateUser, logOut, RESET_FORM } from '../../services/actions/auth'
import { OrdersHistory } from '../index'
import { getCookie } from '../../utils/api'

import styles from './profile.module.css'

const ProfileForm = () => {

  const { user,
    form
  } = useSelector(store => ({
  user: store.userReducer.user,
  form: store.formDataReducer.form
  }))

  const dispatch = useDispatch()
  const inputRef = useRef(null)

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value))
  }

  const onIconClick = () => {
    inputRef.current.focus()
  }

  const submitForm = () => {
    dispatch(updateUser(form.nameValue, form.emailValue, form.passwordValue))
  }

  const resetForm = () => {
    dispatch({
      type: RESET_FORM,
      payload: user
    })
  }

  return (
    <div className={styles.profile_form}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onFormChange}
        value={form.nameValue}
        name={'nameValue'}
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
        value={form.emailValue}
        name={'emailValue'}
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
        value={form.passwordValue}
        name={'passwordValue'}
        icon={'EditIcon'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
      />
      <div className={styles.profile_form_btns}>
        <Button onClick={resetForm} type="primary" size="large">
          Сбросить
        </Button>
        <Button onClick={submitForm} type="primary" size="large">
          Сохранить
        </Button>
      </div>
    </div>
  )
}

export const ProfilePage = () => {

  const dispatch = useDispatch()

  const logOutHandler = () => {
    dispatch(logOut(getCookie('refreshToken')))
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile_sidebar}>
        <nav className={styles.profile_nav}>
          <NavLink exact to='/profile' activeClassName={styles.profile_nav_link_active} className={styles.profile_nav_link + ' text text_type_main-medium'}>
            Профиль
          </NavLink>
          <NavLink to='/profile/orders' activeClassName={styles.profile_nav_link_active} className={styles.profile_nav_link + ' text text_type_main-medium'}>
            История заказов
          </NavLink>
          <button onClick={logOutHandler} className={`${styles.profile_nav_link} ${styles.logout} text text_type_main-medium`}>
            Выход
          </button>
        </nav>
        <p className={styles.profile_notice + ' text text_type_main-small text_color_inactive'}>В этом разделе вы можете<br /> изменить свои персональные данные</p>
      </div>
      <div className={styles.profile_content}>
        <Route path="/profile" exact>
          <ProfileForm />
        </Route>
        <Route path="/profile/orders" exact>
          <OrdersHistory />
        </Route>
      </div>
    </div>
  )
}
