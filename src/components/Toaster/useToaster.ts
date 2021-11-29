import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from './../../redux/hooks';
import {
  clearMessage,
  selectErrorMessage,
  selectSuccessMessage,
} from '../../redux/slices/settingsSlice';

const TOASTER_TIMEOUT = 2000;
const REMOVE_MESSAGE_DELAY = 500;

let openedToaster: ReturnType<typeof setTimeout> | null = null;

enum ToasterTheme {
  Error = 'Error',
  Success = 'Success',
}

export const useToaster = () => {
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectErrorMessage);
  const success = useAppSelector(selectSuccessMessage);

  let theme;

  if (error) {
    theme = ToasterTheme.Error;
  }

  if (success) {
    theme = ToasterTheme.Success;
  }

  const [isHiddenToaster, setIsHiddenToaster] = useState(true);

  useEffect(() => {
    if (error || success) {
      setIsHiddenToaster(false);

      if (openedToaster) {
        clearTimeout(openedToaster);
      }

      openedToaster = setTimeout(() => {
        setIsHiddenToaster(true);

        setTimeout(() => {
          dispatch(clearMessage());
        }, REMOVE_MESSAGE_DELAY);
      }, TOASTER_TIMEOUT);
    }
  }, [dispatch, error, success]);

  return { isHiddenToaster, setIsHiddenToaster, theme, text: error || success };
};
