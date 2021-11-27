import { RootState } from './store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const selectErrorMessage = (state: RootState) =>
  state.settings.errorMessage;
export const selectSuccessMessage = (state: RootState) =>
  state.settings.successMessage;

export const selectIsAuth = (state: RootState) => state.settings.isAuth;

export default settingsSlice.reducer;
