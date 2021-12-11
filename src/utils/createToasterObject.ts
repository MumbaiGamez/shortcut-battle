import { ToastTheme, ToastType } from '../redux/slices/settingsSlice';

export const createErrorToasterObject = (message: string): ToastType => {
  return createToasterObject(message, ToastTheme.Error);
};

export const createSuccessToasterObject = (message: string): ToastType => {
  return createToasterObject(message, ToastTheme.Success);
};

const createToasterObject = (message: string, theme: ToastTheme): ToastType => {
  return {
    id: new Date().getTime(),
    message: message,
    theme: theme,
  };
};
