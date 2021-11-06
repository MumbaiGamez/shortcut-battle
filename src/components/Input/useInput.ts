import { useState } from 'react';

import { InputTypeEnum } from '../../../typings/commonTypes';
import { UseInputProps } from './types';

import { getValidationError } from '../../utils/validation';

export const useInput = ({
  inputHandler,
  type,
  value,
  validationRule,
}: UseInputProps) => {
  const [defaultInputValue, defaultInputHandler] = useState('');
  const [isCrossedEye, setIsCrossedEye] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentType, setСurrentType] = useState(type || InputTypeEnum.text);

  const checkValidation = (value: string) => {
    const newErrorMessage = getValidationError(validationRule, value);
    setErrorMessage(newErrorMessage);
  };

  const toggleEye = () => {
    if (isCrossedEye) {
      setСurrentType(InputTypeEnum.password);
    } else {
      setСurrentType(InputTypeEnum.text);
    }

    setIsCrossedEye((prevState) => !prevState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    checkValidation(value);

    if (inputHandler) {
      inputHandler(value);
    } else {
      defaultInputHandler(value);
    }
  };

  const clearInputValue = () => {
    checkValidation('');
    if (inputHandler) {
      inputHandler('');
    } else {
      defaultInputHandler('');
    }
  };

  const isShowEyeIcon = type === InputTypeEnum.password;

  const currentValue = value || defaultInputValue;

  return {
    clearInputValue,
    currentType,
    currentValue,
    errorMessage,
    handleInputChange,
    isShowEyeIcon,
    isCrossedEye,
    toggleEye,
  };
};
