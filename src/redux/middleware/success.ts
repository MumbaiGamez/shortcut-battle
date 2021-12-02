import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { createSuccessToast } from '../../utils/createToast';

import { endpoints as userEndpoints } from '../api/userApi';
import { addToast } from '../slices/settingsSlice';

export const successMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (userEndpoints.updateUserProfile.matchFulfilled(action)) {
      api.dispatch(
        addToast(createSuccessToast('Profile updated successfully'))
      );
    }

    if (userEndpoints.updateUserAvatar.matchFulfilled(action)) {
      api.dispatch(addToast(createSuccessToast('Avatar updated successfully')));
    }

    return next(action);
  };
