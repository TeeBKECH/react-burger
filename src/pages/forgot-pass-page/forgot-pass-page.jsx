import React, { useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './forgot-pass.module.css'

export const ForgotPasswordPage = () => {

  const [emailValue, setEmailValue] = useState('')
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
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={e => setEmailValue(e.target.value)}
          value={emailValue}
          name={'email'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button onClick={submitForm} type="primary" size="large">
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
