import { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { logIn, setFormValue } from '../../services/actions/auth'

import styles from './login.module.css'

export const LoginPage = () => {

  const {
    emailValue,
    passwordValue,
    user
  } = useAppSelector(store => ({
    emailValue: store.formDataReducer.form.emailValue,
    passwordValue: store.formDataReducer.form.passwordValue,
    user: store.userReducer.user
  }))

  const location = useLocation()

  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value))
  }

  const onIconClick = () => {
    inputRef.current?.focus()
  }

  const submitForm = (e) => {
    e.preventDefault()
    dispatch(logIn(emailValue, passwordValue))
  }

  if (user) {
    const { from } = location.state || {from: '/'}
    return <Redirect to={from} />
  }

  return (
    <form onSubmit={submitForm} className={styles.form}>

      <div className={styles.form_title}>
        <h2 className="text text_type_main-medium">
          Вход
        </h2>
      </div>
      <div className={styles.form_body}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={onFormChange}
          value={emailValue}
          name={'emailValue'}
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
          icon={'ShowIcon'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
        {/*@ts-ignore*/}
        <Button type="primary" size="large">
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
    </form>
  )
}