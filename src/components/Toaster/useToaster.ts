import { useEffect, useState } from 'react';
type UseToasterProps = {
  isSuccess?: boolean;
  isError?: boolean;
  text: string;
};

export const useToaster = (props: UseToasterProps) => {
  const { isSuccess, isError, text } = props;
  const [isHideToaster, setIsHideToaster] = useState(true);

  useEffect(() => {
    if (isSuccess || isError) {
      setIsHideToaster(false);

      setTimeout(() => {
        setIsHideToaster(true);
      }, 1500);
    }
  }, [isSuccess, isError, text]);

  return [isHideToaster, setIsHideToaster];
};
