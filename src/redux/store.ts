import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

import settingsReducer from './slices/settingsSlice';
import { baseApi } from './api/baseApi';
import { errorMiddleware } from './middleware/error';
import { authMiddleware } from './middleware/auth';
import { successMiddleware } from './middleware/success';

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
      routerMiddleware,
      successMiddleware
    );
  },
});

export const history = createReduxHistory(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
