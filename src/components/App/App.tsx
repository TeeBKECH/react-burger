import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import data from '../../utils/data'
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.app_content}>
        <BurgerIngredients {...data} />
        <BurgerConstructor {...data} />
      </main>
    </div>
  );
}

export default App;