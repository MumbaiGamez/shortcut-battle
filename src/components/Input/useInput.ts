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

    const newErrorMessage = getValidationError(validationRule, value);
    setErrorMessage(newErrorMessage);

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

  const valueForInput = value || defaultInputValue;

  return {
    clearInputValue,
    defaultInputType,
    defaultInputValue: valueForInput,
    errorMessage,
    handleInputChange,
    isShowEyeIcon,
    isCrossedEye,
    toggleEye,
  };
};
