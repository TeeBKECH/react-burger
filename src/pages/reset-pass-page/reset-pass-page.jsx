import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './reset-pass.module.css'

export const ResetPasswordPage = () => {
  
  const [passwordValue, setPasswordValue] = useState('')
  const [codeValue, setCodeValue] = useState('')
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
          Восстановление пароля
        </h2>
      </div>
      <div className={styles.form_body}>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
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
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setCodeValue(e.target.value)}
          value={codeValue}
          name={'code'}
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
