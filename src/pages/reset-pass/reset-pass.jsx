import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { setFormValue, resetPassword } from '../../services/actions/auth'

import styles from './reset-pass.module.css'

export const ResetPasswordPage = () => {
  
  const {
    passwordValue,
    resetPasswordToken,
    requestMessage
  } = useSelector(store => ({
    passwordValue: store.formDataReducer.form.passwordValue,
    resetPasswordToken: store.formDataReducer.form.resetPasswordToken,
    requestMessage: store.userReducer.requestMessage,
  }))

  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const location = useLocation()

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value))
  }

  const onIconClick = () => {
    inputRef.current.focus()
  }
  
  const submitForm = () => {
    dispatch(resetPassword(passwordValue, resetPasswordToken))
  }

  if (requestMessage === 'Password successfully reset') {
    const state = {from: location}
    return <Redirect to={{pathname: '/login', state}} />
  }

  return (
    <div className={styles.form}>

      <div className={styles.form_title}>
        <h2 className="text text_type_main-medium">
          Восстановление пароля
        </h2>
      </div>
      <div className={styles.form_body}>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={onFormChange}
          value={passwordValue}
          name={'passwordValue'}
          icon={'ShowIcon'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onFormChange}
          value={resetPasswordToken}
          name={'resetPasswordToken'}
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
      <div className={styles.form_links}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? &nbsp;
          <Link className={styles.form_links_item} to='/login'>Войти</Link>
        </p>
      </div>
    </div>
  )
}
