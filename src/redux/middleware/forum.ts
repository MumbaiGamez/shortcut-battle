import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { endpoints as forumEndpoints } from '../api/forumApi';

export const forumMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (forumEndpoints.addTopic.matchFulfilled(action)) {
      // @ts-ignore
      api.dispatch(forumEndpoints.getTopics.initiate());
    }

    return next(action);
  };
