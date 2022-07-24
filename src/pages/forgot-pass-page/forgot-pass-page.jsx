import React, { useCallback, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { setFormValue, forgotPassword } from '../../services/actions/auth'

import styles from './forgot-pass.module.css'

export const ForgotPasswordPage = () => {

  const {
    emailValue,
    requestMessage
  } = useSelector(store => ({
    emailValue: store.formDataReducer.form.emailValue,
    requestMessage: store.userReducer.requestMessage
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
    dispatch(forgotPassword(emailValue))
  }

  if (requestMessage === 'Reset email sent') {
    const state = {from: location}
    return <Redirect to={{pathname: '/reset-password', state}} />
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
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={onFormChange}
          value={emailValue}
          name={'emailValue'}
          error={false}
          errorText={'Ошибка'}
          ref={inputRef}
          onIconClick={onIconClick}
          size={'default'}
        />
        <Button onClick={submitForm} disabled={emailValue ? false : true} type="primary" size="large">
          Восстановить
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
