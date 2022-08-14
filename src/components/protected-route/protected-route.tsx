import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../utils/api';
import { getUser } from '../../services/actions/auth';
import { useCallback, useEffect } from 'react';

export const ProtectedRoute = ({ children, ...rest }) => {

  const { user } = useSelector(store => store.userReducer)
  const token = getCookie('accessToken')
  const location = useLocation()
  const dispatch = useDispatch()
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