import {
  isRejectedWithValue,
  Middleware,
  MiddlewareAPI,
} from '@reduxjs/toolkit';
import { createErrorToasterObject } from '../../utils/createToasterObject';

import { addToast } from '../slices/settingsSlice';

export const errorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const { data } = action.payload;
      const errorText = data?.reason;

      if (errorText && errorText !== 'Cookie is not valid') {
        api.dispatch(addToast(createErrorToasterObject(errorText)));
      }
    }

    return next(action);
  };
