import { FC } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { REMOVE_INGREDIENT_DETAILS } from '../../services/actions/index'
import { Switch, Route } from 'react-router-dom';
import { useAppDispatch } from "../../utils/hooks";

import {
  Error404Page,
  ForgotPasswordPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  Home,
  OrdersFeed
} from '../../pages';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ProtectedRoute } from '../protected-route/protected-route';

import styles from './modal-switch.module.css';
import Modal from "../modal/modal";
import { OrderItemData } from "../order-item-data/order-item-data";

interface ILocationState {
  background?: Location;
  from?: Location;
}

export const ModalSwitch: FC = () => {
  const location = useLocation()
  const locationState = location.state as ILocationState
  const history = useHistory()
  const dispatch = useAppDispatch()

  const background = locationState && locationState.background

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
            <Route path="/feed" exact>
              <OrdersFeed />
            </Route>
            <Route path="/feed/:id" exact>
              Not Modal
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

      {background && (
        <>
          <Route
            path='/ingredients/:ingredientId'
            children={
              <Modal title="Детали ингредиента" onClose={closeIngredientDetails}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:id'
            children={
              <Modal title="" onClose={closeIngredientDetails}>
                <OrderItemData />
              </Modal>
            }
          />
        </>
      )}
    </>
  );
};