import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SettingsType = {
  errorMessage: null | string;
  isAuth: boolean;
  successMessage: null | string;
};

const initialState: SettingsType = {
  errorMessage: null,
  isAuth: false,
  successMessage: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
    clearMessages: (state) => {
      state.errorMessage = null;
      state.successMessage = null;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuth, setErrorMessage, setSuccessMessage, clearMessages } =
  settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export const selectErrorMessage = createSelector(
  selectSettings,
  (state) => state.errorMessage
);
export const selectSuccessMessage = createSelector(
  selectSettings,
  (state) => state.successMessage
);

export const selectIsAuth = createSelector(
  selectSettings,
  (state) => state.isAuth
);

export default settingsSlice.reducer;
