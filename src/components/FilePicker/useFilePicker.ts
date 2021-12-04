import { ChangeEvent, useCallback } from 'react';
import { UseFilePickerType } from './types';

export const useFilePicker = (props: UseFilePickerType) => {
  const { handleChange } = props;

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;

      const file = target.files?.[0];

      if (file) {
        handleChange(file);
      }
    },
    [handleChange]
  );

  return { handleInputChange };
};
