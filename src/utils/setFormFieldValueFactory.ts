import { Dispatch, SetStateAction } from 'react';

export const setFormFieldValueFactory = <T>(
  callback: Dispatch<SetStateAction<T>>
) => {
  return function (fieldName: string) {
    return function (value: string) {
      callback((prevState: T) => {
        return {
          ...prevState,
          [fieldName]: value,
        };
      });
    };
  };
};
