import React, { useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { useSelector, useDispatch } from 'react-redux';

import { getBurgerIngredients } from '../../services/actions/index';

import styles from './app.module.css';

const App = () => {
  const { 
    burgerIngredients, 
    burgerIngredientsRequest, 
    burgerIngredientsFailed 
  } = useSelector(store => store.burgerIngredientsReducer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getBurgerIngredients())
  }, [])
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.app_content}>
        {burgerIngredientsRequest && 'Идет загрузка...'}
        {burgerIngredientsFailed && 'Произошла ошибка при загрузке!'}
        {!burgerIngredientsFailed && !burgerIngredientsRequest && burgerIngredients && (
          <>
            <BurgerIngredients data={burgerIngredients} />
            <BurgerConstructor data={burgerIngredients} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;