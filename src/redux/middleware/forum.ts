import { Middleware } from '@reduxjs/toolkit';

import { endpoints as forumEndpoints } from '../api/forumApi';

export const forumMiddleware: Middleware = () => (next) => (action) => {
  if (forumEndpoints.addTopic.matchFulfilled(action)) {
    console.log('tut???');
    // @ts-ignore
    api.dispatch(forumEndpoints.getTopics.initiate());
  }

  return next(action);
};
