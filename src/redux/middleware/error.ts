import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';

import { setErrorMessage } from '../settingsSlice';

export const errorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const { data } = action.payload;
      const errorText = data?.reason;

      if (errorText && errorText !== 'Cookie is not valid') {
        api.dispatch(setErrorMessage(errorText));
      }
    }

    return next(action);
  };
