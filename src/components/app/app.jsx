<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React from 'react';
>>>>>>> master

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

<<<<<<< HEAD
import styles from './app.module.css';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

const App = () => {
  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    data: []
  })
  
  useEffect(() => {
    const getData = async () => {
      setState({
        isLoading: true,
        hasError: false,
        data: []
      })
      await fetch(API_URL)
        .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => setState({
          isLoading: false,
          hasError: false,
          data: data.data
        }))
        .catch((err) => {
          setState({
            isLoading: false,
            hasError: true,
            data: []
          })
          console.log(err)
        })
    }

    getData();
  }, [])
  
  const { data, isLoading, hasError } = state;
=======
import data from '../../utils/data'
import styles from './app.module.css';

const App = () => {
  
>>>>>>> master
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.app_content}>
<<<<<<< HEAD
        {isLoading && 'Идет загрузка...'}
        {hasError && 'Произошла ошибка при загрузке!'}
        {!hasError && !isLoading && data.length && (
          <>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </>
        )}
=======
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
>>>>>>> master
      </main>
    </div>
  );
}

export default App;