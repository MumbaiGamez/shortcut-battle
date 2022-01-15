import { RootState } from '../store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ToastTheme {
  Error = 'Error',
  Success = 'Success',
}

type LanguagesType = {
  name: string;
};

export type ToastType = {
  id: number;
  message: string;
  theme: ToastTheme;
};

export type SettingsType = {
  isAuth: boolean;
  toasts: ToastType[];
  languages: LanguagesType[];
  activeLanguage: LanguagesType['name'];
};

const initialState: SettingsType = {
  isAuth: false,
  toasts: [],
  languages: [{ name: 'En' }, { name: 'Ru' }],
  activeLanguage: 'En',
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

export const selectLanguages = createSelector(
  selectSettings,
  (state) => state.languages
);

export const selectActiveLanguage = createSelector(
  selectSettings,
  (state) => state.activeLanguage
);

export default settingsSlice.reducer;
