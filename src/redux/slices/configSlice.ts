import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { APP_SHORTCUTS } from '../../pages/Game/constants';
import { RootState } from '../store';

type Config = {
  interval: number;
  count: number;
  hitScore: number;
  appName: keyof typeof APP_SHORTCUTS;
};

const initialState: Config = {
  interval: 4000,
  count: 20,
  hitScore: 10,
  appName: 'VS_CODE',
};

const configSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Config>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { change } = configSlice.actions;

export const selectConfig = (state: RootState) => state.config;

export const selectAppShortcuts = (state: RootState) =>
  APP_SHORTCUTS[state.config.appName];

export default configSlice.reducer;
