import { useState, useCallback, useMemo } from 'react';

import { useForm } from '../../../../components/Form/useForm';

import { authAPI } from '../../../../api/auth';

import { InputTypeEnum } from '../../../../components/Input';
import { FieldsList } from '../../../../components/Form/types';
import { UseLoginComponentProps } from './types';

const fieldsList = [FieldsList.login, FieldsList.password];

export const useLogin = (props: UseLoginComponentProps) => {
  const { setError } = props;

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const {
    handleError,
    handleLoading,
    handleSuccess,
    isFormValid,
    isLoading,
    isSuccess,
    validateField,
  } = useForm({ fieldsList, setError });

  const handleLogin = useCallback(() => {
    if (isFormValid) {
      const data = { login, password };

      authAPI.login({ data, handleError, handleLoading, handleSuccess });
    }
  }, [handleError, handleLoading, handleSuccess, isFormValid, login, password]);

  const inputsList = useMemo(
    () => [
      {
        fieldName: 'login',
        handleChange: setLogin,
        placeholder: 'login',
        value: login,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: 'password',
        handleChange: setPassword,
        placeholder: 'Password',
        type: InputTypeEnum.password,
        value: password,
        validationRule: { minSymbols: 6 },
        validateField,
      },
    ],
    [login, password, validateField]
  );

  return {
    handleLogin,
    inputsList,
    isFormValid,
    isLoading,
    isSuccess,
  };
};
