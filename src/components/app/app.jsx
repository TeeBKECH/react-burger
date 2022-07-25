import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { 
  Error404Page, 
  ForgotPasswordPage, 
  LoginPage, 
  ProfilePage, 
  RegisterPage, 
  ResetPasswordPage,
  IngredientPage,
  OrdersList,
  Home } from '../../pages';
import AppHeader from '../app-header/app-header';
import { ProtectedRoute } from '../protected-route/protected-route';

import styles from './app.module.css';

const App = () => {
  
  return (
    <Router>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.app_content}>
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>
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
            <Route path="/orders-list" exact={true}>
              <OrdersList />
            </Route>
            <ProtectedRoute path="/profile">
              <ProfilePage />
            </ProtectedRoute>
            <Route path="/ingredients/:id" exact={true}>
              <IngredientPage />
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