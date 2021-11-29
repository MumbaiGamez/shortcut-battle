import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import { removeToast, selectToasts } from '../../redux/slices/settingsSlice';

const TOASTER_TIMEOUT = 2000;

export const useToaster = () => {
  const dispatch = useAppDispatch();

  const toasts = useAppSelector(selectToasts);

  toasts.map((toast) => {
    setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, TOASTER_TIMEOUT);
  });

  return { toasts };
};
