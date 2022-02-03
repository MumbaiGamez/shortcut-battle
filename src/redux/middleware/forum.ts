import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { endpoints as forumEndpoints } from '../api/forumApi';

export const forumMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (
      forumEndpoints.addTopic.matchFulfilled(action) ||
      forumEndpoints.addComment.matchFulfilled(action)
    ) {
      api.dispatch(
        // @ts-ignore
        forumEndpoints.getTopics.initiate(undefined, {
          subscribe: false,
          forceRefetch: true,
        })
      );
    }

    return next(action);
  };
