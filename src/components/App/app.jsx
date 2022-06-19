import React, { useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import data from '../../utils/data'
import styles from './app.module.css';

const App = () => {

  const [constructor, setConstructor] = React.useState(data);
  const [currentType, setCurrentType] = React.useState('bun');

  // const filterConstructor = () => {
  //   const newData = [...data];
  //   setConstructor(newData.filter(el => el.__v > 0))
  // }
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.app_content}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={constructor} />
      </main>
    </div>
  );
}

export default App;