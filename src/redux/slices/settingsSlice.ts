import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ToastTheme {
  Error = 'Error',
  Success = 'Success',
}

export type ToastType = {
  id: number;
  message: string;
  theme: ToastTheme;
};

export type SettingsType = {
  isAuth: boolean;
  toasts: ToastType[];
};

const initialState: SettingsType = {
  isAuth: false,
  toasts: [],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastType>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<number>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setAuth, addToast, removeToast } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export const selectToasts = createSelector(
  selectSettings,
  (state) => state.toasts
);

export const selectIsAuth = createSelector(
  selectSettings,
  (state) => state.isAuth
);

export default settingsSlice.reducer;
