import { ToastTheme, ToastType } from '@redux/slices/settingsSlice';

const createToasterObject = (message: string, theme: ToastTheme): ToastType => {
  return {
    id: new Date().getTime(),
    message: message,
    theme: theme,
  };
};

export const createErrorToast = (message: string): ToastType => {
  return createToasterObject(message, ToastTheme.Error);
};

export const createSuccessToast = (message: string): ToastType => {
  return createToasterObject(message, ToastTheme.Success);
};
