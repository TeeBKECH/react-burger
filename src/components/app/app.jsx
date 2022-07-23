import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { 
  Error404Page, 
  ForgotPasswordPage, 
  LoginPage, 
  ProfilePage, 
  RegisterPage, 
  ResetPasswordPage,
  IngredientPage } from '../../pages';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import styles from './app.module.css';

const App = () => {
  
  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.app_content}>
          
            <Switch>
              <Route path="/login" exact={true}>
                <LoginPage />
              </Route>
              <Route path="/register" exact={true}>
                <RegisterPage />
              </Route>
              <Route path="/forgot-password" exact={true}>
                <ForgotPasswordPage />
              </Route>
              <Route path="/reset-password" exact={true}>
                <ResetPasswordPage />
              </Route>
              <Route path="/profile" exact={true}>
                <ProfilePage />
              </Route>
              <Route path="//ingredients/:id" exact={true}>
                <IngredientPage />
              </Route>
              <Route path="/" exact={true}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </Route>
              <Route>
                <Error404Page />
              </Route>
            </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;