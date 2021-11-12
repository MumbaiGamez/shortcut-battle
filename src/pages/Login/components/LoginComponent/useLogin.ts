import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesList } from '../../../../../typings/commonTypes';
import { InputTypeEnum } from '../../../../components/Input';

import { authAPI } from '../../../../api/auth';

import { UseLoginComponentProps } from './types';

export const useLogin = (props: UseLoginComponentProps) => {
  const { setError } = props;

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [formFieldsValidation, setFormFieldsValidation] = useState({
    login: false,
    password: false,
  });

  useEffect(() => {
    const isFormValid = Object.values(formFieldsValidation).every(
      (field) => field
    );

    setIsFormValid(isFormValid);
  }, [formFieldsValidation]);

  const validateField = useCallback(
    (fieldName: string, isValid: boolean) => {
      setFormFieldsValidation({
        ...formFieldsValidation,
        [fieldName]: isValid,
      });
    },
    [formFieldsValidation]
  );

  const navigate = useNavigate();

  const handleError = useCallback(
    (error: string) => {
      setError(error);
    },
    [setError]
  );

  const handleSuccess = useCallback(() => {
    setIsSuccess(true);
    navigate(RoutesList.home);
  }, [navigate]);

  const handleLoading = useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

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
        hanldeChange: setLogin,
        placeholder: 'login',
        value: login,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: 'password',
        hanldeChange: setPassword,
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
