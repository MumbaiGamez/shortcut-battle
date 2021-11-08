import { useCallback, useState, useEffect } from 'react';

import { InputProps, InputTypeEnum } from './types';

import { getValidationError } from '../../utils/validation';

export type UseInputProps = Pick<
  InputProps,
  'hanldeChange' | 'setIsFieldValid' | 'type' | 'value' | 'validationRule'
>;

export const useInput = (props: UseInputProps) => {
  const [defaultInputValue, defaultInputHandler] = useState('');

  const {
    hanldeChange = defaultInputHandler,
    setIsFieldValid,
    type,
    value = defaultInputValue,
    validationRule,
  } = props;

  const [isCrossedEye, setIsCrossedEye] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentType, setСurrentType] = useState(type || InputTypeEnum.text);

  useEffect(() => {
    if (setIsFieldValid) {
      const { isValid } = getValidationError(validationRule, value);
      if (!isValid) {
        setIsFieldValid(isValid);
      }
    }
  }, [value, setIsFieldValid, validationRule]);

  const checkValidation = useCallback(
    (value: string) => {
      const { isValid, errorMessage } = getValidationError(
        validationRule,
        value
      );

      if (isValid && setIsFieldValid) {
        setIsFieldValid(isValid);
      }

      setErrorMessage(errorMessage);
    },
    [validationRule, setIsFieldValid]
  );

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
    hanldeChange(value);
  };

  const clearInputValue = useCallback(() => {
    checkValidation('');
    hanldeChange('');
  }, [hanldeChange, checkValidation]);

  const shouldShowEyeIcon = type === InputTypeEnum.password;

  return {
    clearInputValue,
    currentType,
    currentValue: value,
    errorMessage,
    handleInputChange,
    isCrossedEye,
    shouldShowEyeIcon,
    toggleEye,
  };
};
