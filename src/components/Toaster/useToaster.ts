import { useEffect, useState } from 'react';

import { UseToasterProps } from './types';

export const useToaster = (props: UseToasterProps) => {
  const { errorId, isSuccess, isError, text } = props;
  const [isHideToaster, setIsHideToaster] = useState(true);

  useEffect(() => {
    if (isSuccess || isError) {
      setIsHideToaster(false);

      setTimeout(() => {
        setIsHideToaster(true);
      }, 2000);
    }
  }, [isSuccess, isError, text, errorId]);

  return [isHideToaster, setIsHideToaster];
};
