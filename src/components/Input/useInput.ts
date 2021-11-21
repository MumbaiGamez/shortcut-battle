import { useCallback, useState, useEffect } from 'react';

import { InputTypeEnum, UseInputProps } from './types';

import { getValidationError } from '../../utils/validation';

export const useInput = (props: UseInputProps) => {
  const [defaultInputValue, defaultInputHandler] = useState('');

  const {
    fieldName,
    hanldeChange = defaultInputHandler,
    type,
    value = defaultInputValue,
    validationRule,
    validateField,
  } = props;

  const [isCrossedEye, setIsCrossedEye] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentType, setСurrentType] = useState(type || InputTypeEnum.text);

  useEffect(() => {
    if (validateField && fieldName) {
      const { isValid } = getValidationError(validationRule, value);

      validateField(fieldName, isValid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkValidation = useCallback(
    (value: string) => {
      const { isValid, errorMessage } = getValidationError(
        validationRule,
        value
      );

      if (validateField && fieldName) {
        validateField(fieldName, isValid);
      }

      setErrorMessage(errorMessage);
    },
    [validationRule, validateField, fieldName]
  );

  const toggleEye = useCallback(() => {
    if (isCrossedEye) {
      setСurrentType(InputTypeEnum.password);
    } else {
      setСurrentType(InputTypeEnum.text);
    }

    setIsCrossedEye((prevState) => !prevState);
  }, [isCrossedEye]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;

    if (currentType === InputTypeEnum.file) {
      const file = target.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            hanldeChange(reader.result);
          }
        };
      }
    } else {
      const { value } = target;

      checkValidation(value);
      hanldeChange(value);
    }
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
