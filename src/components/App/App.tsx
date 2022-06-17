import React from 'react';

import AppHeader from '../AppHeader/AppHeader';
// import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
// import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      {/* <BurgerIngredients />
      <BurgerConstructor /> */}
    </div>
  );
}

export default App;