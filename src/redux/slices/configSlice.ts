import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export type Config = {
  interval: number;
  count: number;
  hitScore: number;
};

const initialState: Config = {
  interval: 2000,
  count: 20,
  hitScore: 10,
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

export default configSlice.reducer;
