import { useEffect, useState } from 'react';

import { UseToasterProps } from './types';

const TOASTER_TIMEOUT = 2000;

let openedToaster: ReturnType<typeof setTimeout> | null = null;

export const useToaster = (props: UseToasterProps) => {
  const { toasterId, text } = props;

  const [isHiddenToaster, setIsHiddenToaster] = useState(true);

  useEffect(() => {
    if (text) {
      setIsHiddenToaster(false);

      if (openedToaster) {
        clearTimeout(openedToaster);
      }

      openedToaster = setTimeout(() => {
        setIsHiddenToaster(true);
      }, TOASTER_TIMEOUT);
    }
  }, [text, toasterId]);

  return [isHiddenToaster, setIsHiddenToaster];
};
