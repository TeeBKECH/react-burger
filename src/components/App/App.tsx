import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
// import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.app_content}>
        <BurgerIngredients />
        {/* <BurgerConstructor /> */}
      </div>
    </div>
  );
}

export default App;