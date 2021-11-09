import { useEffect, useState } from 'react';

import { UseToasterProps } from './types';

const TOASTER_TIMEOUT = 2000;

export const useToaster = (props: UseToasterProps) => {
  const { toasterId, theme, text } = props;
  const [isHideToaster, setIsHideToaster] = useState(true);

  useEffect(() => {
    if (text) {
      setIsHideToaster(false);

      setTimeout(() => {
        setIsHideToaster(true);
      }, TOASTER_TIMEOUT);
    }
  }, [theme, text, toasterId]);

  return [isHideToaster, setIsHideToaster];
};
