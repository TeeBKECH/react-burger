import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './error-404.module.css'

export const Error404Page: FC = () => {
  return (
    <section className={styles.error_404}>

			<h1 className={`${styles.error_404}-title`}>404</h1>
			<div className={styles.error_404__wrapper}>
				<div className={styles.error_404__container}>
					<div className={styles.error_404__cloak}></div>
				</div>
			</div>
			<div className={styles.error_404__info}>
				<h2>Мы не смогли найти страницу</h2>
				<p>Видимо она была удалена, перемещена или никогда не существовала. Вернитесь на главную</p>
        <NavLink 
          exact={true} 
          to='/' 
          className={styles.home_link}
        >
          Домой
        </NavLink>
			</div>

		</section>
  )
}
