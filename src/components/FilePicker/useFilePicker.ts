import { ChangeEvent, useCallback } from 'react';
import { UseFilePickerType } from './types';

export const useFilePicker = (props: UseFilePickerType) => {
  const { handleChange } = props;

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      console.log(target);
      const file = target.files?.[0];
      console.log(file);
      if (file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            handleChange(reader.result);
          }
        };
      }
    },
    [handleChange]
  );

  return { handleInputChange };
};
