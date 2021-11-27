import { configureStore } from '@reduxjs/toolkit';

import settingsReducer from './settingsSlice';

import { baseApi } from './api/baseApi';
import { errorMiddleware } from './middleware/error';
import { authMiddleware } from './middleware/auth';

import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    router: routerReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      baseApi.middleware,
      authMiddleware,
      errorMiddleware,
      routerMiddleware
    );
  },
});

export const history = createReduxHistory(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
