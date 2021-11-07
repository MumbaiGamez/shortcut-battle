import { useCallback, useState } from 'react';

import { InputTypeEnum, UseInputProps } from './types';

import { getValidationError } from '../../utils/validation';

export const useInput = ({
  handleInput,
  type,
  value,
  validationRule,
}: UseInputProps) => {
  const [defaultInputValue, defaultInputHandler] = useState('');
  const [isCrossedEye, setIsCrossedEye] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentType, setСurrentType] = useState(type || InputTypeEnum.text);

  const checkValidation = (value: string) => {
    const { errorMessage } = getValidationError(validationRule, value);

    setErrorMessage(errorMessage);
  };

  const toggleEye = useCallback(() => {
    if (isCrossedEye) {
      setСurrentType(InputTypeEnum.password);
    } else {
      setСurrentType(InputTypeEnum.text);
    }

    setIsCrossedEye((prevState) => !prevState);
  }, [isCrossedEye]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    checkValidation(value);

    if (handleInput) {
      handleInput(value);
    } else {
      defaultInputHandler(value);
    }
  };

  const clearInputValue = useCallback(() => {
    checkValidation('');

    if (handleInput) {
      handleInput('');
    } else {
      defaultInputHandler('');
    }
  }, [handleInput]);

  const shouldShowEyeIcon = type === InputTypeEnum.password;

  const currentValue = value || defaultInputValue;

  return {
    clearInputValue,
    currentType,
    currentValue,
    errorMessage,
    handleInputChange,
    shouldShowEyeIcon,
    isCrossedEye,
    toggleEye,
  };
};
