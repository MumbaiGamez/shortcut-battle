import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import { createErrorToast } from '../../utils/createToast';

import { addToast } from '../slices/settingsSlice';

export const errorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const { data } = action.payload;
      const errorText = data?.reason;

      if (errorText && errorText !== 'Cookie is not valid') {
        api.dispatch(addToast(createErrorToast(errorText)));
      }
    }

    return next(action);
  };
