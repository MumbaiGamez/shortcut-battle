import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory, createMemoryHistory } from 'history';

import settingsReducer from './slices/settingsSlice';
import configReducer from './slices/configSlice';
import gameReducer from './slices/gameSlice';
import { baseApi, yandexApi } from './api/baseApi';
import { errorMiddleware } from './middleware/error';
import { authMiddleware } from './middleware/auth';
import { successMiddleware } from './middleware/success';
import { forumMiddleware } from './middleware/forum';

import { isServer } from '@utils/ssr';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: isServer
      ? createMemoryHistory({ initialEntries: ['/'] })
      : createBrowserHistory(),
  });

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [yandexApi.reducerPath]: yandexApi.reducer,
    router: routerReducer,
    settings: settingsReducer,
    config: configReducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      baseApi.middleware,
      yandexApi.middleware,
      authMiddleware,
      errorMiddleware,
      routerMiddleware,
      forumMiddleware,
      successMiddleware
    );
  },
});

export const history = createReduxHistory(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
