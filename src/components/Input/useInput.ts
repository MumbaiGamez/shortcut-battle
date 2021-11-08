import { useCallback, useState } from 'react';

import { InputProps, InputTypeEnum } from './types';

import { getValidationError } from '../../utils/validation';

export type UseInputProps = Pick<
  InputProps,
  'hanldeChange' | 'type' | 'value' | 'validationRule'
>;

export const useInput = (props: UseInputProps) => {
  const [defaultInputValue, defaultInputHandler] = useState('');

  const {
    hanldeChange = defaultInputHandler,
    type,
    value = defaultInputValue,
    validationRule,
  } = props;

  const [isCrossedEye, setIsCrossedEye] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentType, setСurrentType] = useState(type || InputTypeEnum.text);

  const checkValidation = useCallback(
    (value: string) => {
      const { errorMessage } = getValidationError(validationRule, value);

      setErrorMessage(errorMessage);
    },
    [validationRule]
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
    shouldShowEyeIcon,
    isCrossedEye,
    toggleEye,
  };
};
