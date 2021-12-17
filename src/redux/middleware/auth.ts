import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { RoutesList } from '@components/NavigationMenu/useNavigationMenu';

import { endpoints as authEndpoints } from '../api/authApi';
import { endpoints as userEndpoints } from '../api/userApi';
import { setAuth } from '../slices/settingsSlice';

import { history } from '../store';

export const authMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (userEndpoints.getUser.matchFulfilled(action)) {
      api.dispatch(setAuth(true));
    }

    if (
      authEndpoints.signin.matchFulfilled(action) ||
      authEndpoints.signup.matchFulfilled(action) ||
      authEndpoints.OAuth.matchFulfilled(action) ||
      (authEndpoints.signin.matchRejected(action) &&
        action?.payload?.data === 'OK')
    ) {
      api.dispatch(setAuth(true));
      history.push(RoutesList.play);
    }

    if (authEndpoints.logout.matchFulfilled(action)) {
      api.dispatch(setAuth(false));
    }

    if (authEndpoints.getOAuthServiceId.matchFulfilled(action)) {
      const { service_id } = action.payload;

      window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${REDIRECT_URI}`;
    }

    return next(action);
  };
