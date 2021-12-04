import { ToastTheme, ToastType } from '../redux/slices/settingsSlice';

export const createToast = (message: string, theme: ToastTheme): ToastType => {
  return {
    id: new Date().getTime(),
    message: message,
    theme: theme,
  };
};

export const createErrorToast = (message: string): ToastType => {
  return createToast(message, ToastTheme.Error);
};

export const createSuccessToast = (message: string): ToastType => {
  return createToast(message, ToastTheme.Success);
};
