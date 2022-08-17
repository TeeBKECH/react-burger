import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { getCookie } from '../../utils/api';
import { getUser } from '../../services/actions/auth';
import { FC, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {

  const { user } = useAppSelector(store => store.userReducer)
  const token = getCookie('accessToken')
  const location = useLocation()
  const dispatch = useAppDispatch()
  const state = {from: location}

  const init = useCallback( () => {
    if (token) {
      dispatch(getUser())
    }
  }, [dispatch, token])

  useEffect(() => {
    init()
  }, [])

  return (
    <Route
      {...rest}
      render={() =>
        user ? (
          children
        ) : (
          // Если пользователя нет в хранилище, происходит переадресация на роут /login
          <Redirect
            to={{pathname: '/login', state}}
          />
        )
      }
    />
  );
}