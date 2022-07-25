import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { REMOVE_INGREDIENT_DETAILS } from '../../services/actions/index'
import { Switch, Route } from 'react-router-dom';

import { 
  Error404Page, 
  ForgotPasswordPage, 
  LoginPage, 
  ProfilePage, 
  RegisterPage, 
  ResetPasswordPage,
  OrdersList,
  Home } from '../../pages';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ProtectedRoute } from '../protected-route/protected-route';

import styles from './modal-switch.module.css';
import Modal from "../modal/modal";

export const ModalSwitch = () => {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const { ingredientDetails } = useSelector(store => store.ingredientDetailsReducer);

  const background = location.state && location.state.background

  const closeIngredientDetails = () => {
    dispatch({
      type: REMOVE_INGREDIENT_DETAILS
    })
    history.goBack()
  }

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.app_content}>
          <Switch location={background || location}>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password" exact>
              <ResetPasswordPage />
            </Route>
            <Route path="/orders-list" exact>
              <OrdersList />
            </Route>
            <ProtectedRoute path="/profile">
              <ProfilePage />
            </ProtectedRoute>
            <Route path='/ingredients/:ingredientId' exact>
              <IngredientDetails />
            </Route>
            <Route>
              <Error404Page />
            </Route>
          </Switch>
        </main>
      </div>

      {background && ingredientDetails && (
        <Route
          path='/ingredients/:ingredientId'
          children={
            <Modal title="Детали ингредиента" onClose={closeIngredientDetails}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </>
  );
};