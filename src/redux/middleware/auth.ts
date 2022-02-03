import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { RoutesList } from '@components/NavigationMenu/useNavigationMenu';

import { endpoints as authEndpoints } from '../api/authApi';
import { endpoints as userEndpoints } from '../api/userApi';
import { setAuth } from '../slices/settingsSlice';

import { history } from '../store';

export const authMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (userEndpoints.getUser.matchFulfilled(action)) {
      if (!Cookies.get('sbUser')) {
        const { id, login } = action.payload;

        Cookies.set('sbUser', JSON.stringify({ id: String(id), login }));
      }

      api.dispatch(setAuth(true));
    } else if (userEndpoints.getUser.matchRejected(action)) {
      if (Cookies.get('sbUser')) {
        Cookies.remove('sbUser');
      }
    }

    if (
      authEndpoints.signin.matchFulfilled(action) ||
      authEndpoints.signup.matchFulfilled(action) ||
      authEndpoints.OAuth.matchFulfilled(action) ||
      (authEndpoints.signin.matchRejected(action) &&
        action?.payload?.data === 'OK')
    ) {
      api.dispatch(setAuth(true));
      // @ts-ignore
      api.dispatch(userEndpoints.getUser.initiate());
      history.push(RoutesList.play);
    }

    if (authEndpoints.logout.matchFulfilled(action)) {
      Cookies.remove('sbUser');
      api.dispatch(setAuth(false));
    }

    if (authEndpoints.getOAuthServiceId.matchFulfilled(action)) {
      const { service_id } = action.payload;

      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`;
    }

    return next(action);
  };
