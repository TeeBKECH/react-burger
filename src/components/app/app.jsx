import React, { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

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
      await fetch(API_URL)
        .then(res => res.json())
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
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.app_content}>
        {isLoading && 'Идет загрузка...'}
        {!hasError && data ? (
          <>
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </>
        ) : (
          <div>
            Произошла ошибка при загрузке!
          </div>
        )}
      </main>
    </div>
  );
}

export default App;