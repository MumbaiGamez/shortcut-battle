import { RefObject, useEffect } from 'react';

type UseOutsideClickType = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => void;

export const useOutsideClick: UseOutsideClickType = (ref, callback) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      callback();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};
