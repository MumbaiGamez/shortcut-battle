import i18next from 'i18next';

import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { createSuccessToast } from '@utils/createToast';

import { endpoints as userEndpoints } from '../api/userApi';
import { addToast } from '../slices/settingsSlice';

export const successMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (userEndpoints.updateUserProfile.matchFulfilled(action)) {
      api.dispatch(
        addToast(
          createSuccessToast(i18next.t('messages.profileUpdatedSuccessfully'))
        )
      );
    }

    if (userEndpoints.updateUserAvatar.matchFulfilled(action)) {
      api.dispatch(
        addToast(
          createSuccessToast(i18next.t('messages.avatarUpdatedSuccessfully'))
        )
      );
    }

    return next(action);
  };
