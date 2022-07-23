import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './login-page.module.css'

export const LoginPage = () => {

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const inputRef = useRef(null)

  const onIconClick = () => {
    inputRef.current.focus()
  }

  const submitForm = () => {
    console.log(1)
  }

  return (
    <div className={styles.form}>

      <div className={styles.form_title}>
        <h2 className="text text_type_main-medium">
          Вход
        </h2>
      </div>
      <div className={styles.form_body}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => setPasswordValue(e.target.value)}
          value={passwordValue}
          name={'password'}
          icon={'ShowIcon'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button onClick={submitForm} type="primary" size="large">
          Войти
        </Button>
      </div>
      <div className={styles.form_links}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь? &nbsp;
          <Link className={styles.form_links_item} to='/register'>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? &nbsp;
          <Link className={styles.form_links_item} to='/forgot-password'>Восстановить пароль</Link>
        </p>
      </div>
    </div>
  )
}