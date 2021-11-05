import { InputTypeEnum } from '../../../typings/commonTypes';
import { useState } from 'react';
import { UseInputProps } from './types';

export const useInput = ({ inputHandler, type, value }: UseInputProps) => {
  const [defaultInputValue, defaultInputHandler] = useState('');
  const [isCrossedEye, setIsCrossedEye] = useState(false);
  const [defaultInputType, setDefaultInputType] = useState(
    type || InputTypeEnum.text
  );

  const toggleEye = () => {
    if (isCrossedEye) {
      setDefaultInputType(InputTypeEnum.password);
    } else {
      setDefaultInputType(InputTypeEnum.text);
    }

    setIsCrossedEye((prevState) => !prevState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (inputHandler) {
      inputHandler(value);
    } else {
      defaultInputHandler(value);
    }
  };

  const clearInputValue = () => {
    if (inputHandler) {
      inputHandler('');
    } else {
      defaultInputHandler('');
    }
  };

  const isShowEyeIcon = type === InputTypeEnum.password;

  return {
    clearInputValue,
    defaultInputType,
    defaultInputValue: value || defaultInputValue,
    handleInputChange,
    isShowEyeIcon,
    isCrossedEye,
    toggleEye,
  };
};
