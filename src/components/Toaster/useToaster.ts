import { useEffect, useState } from 'react';

import { UseToasterProps } from './types';

export const useToaster = (props: UseToasterProps) => {
  const { toasterId, theme, text } = props;
  const [isHideToaster, setIsHideToaster] = useState(true);

  useEffect(() => {
    if (text) {
      setIsHideToaster(false);

      setTimeout(() => {
        setIsHideToaster(true);
      }, 2000);
    }
  }, [theme, text, toasterId]);

  return [isHideToaster, setIsHideToaster];
};
