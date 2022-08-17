import { ChangeEvent, FC, FormEvent, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { Link } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'

import { setFormValue, createUser } from '../../services/actions/auth'

import styles from './register.module.css'

export const RegisterPage: FC = () => {

  const {
    nameValue,
    emailValue,
    passwordValue
  } = useAppSelector(store => store.formDataReducer.form)

  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormValue(e.target.name, e.target.value))
  }

  const onIconClick = () => {
    inputRef.current?.focus()
  }

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createUser(nameValue, emailValue, passwordValue))
  }

  return (
    <form onSubmit={submitForm} className={styles.form}>

      <div className={styles.form_title}>
        <h2 className="text text_type_main-medium">
          Регистрация
        </h2>
      </div>
      <div className={styles.form_body}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onFormChange}
          value={nameValue}
          name={'nameValue'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
        />
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
          Зарегистрироваться
        </Button>
      </div>
      <div className={styles.form_links}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? &nbsp;
          <Link className={styles.form_links_item} to='/login'>Войти</Link>
        </p>
      </div>
    </form>
  )
}