import { useEffect, useState } from 'react';
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

  const validateField = (fieldName: string, isValid: boolean) => {
    setFormFieldsValidation({
      ...formFieldsValidation,
      [fieldName]: isValid,
    });
  };

  const navigate = useNavigate();

  const handleError = (error: string) => {
    setError(error);
  };

  const handleSuccess = () => {
    setIsSuccess(true);
    navigate(RoutesList.home);
  };

  const handleLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const handleLogin = () => {
    if (isFormValid) {
      const data = { login, password };
      authAPI.login({ data, handleError, handleLoading, handleSuccess });
    }
  };

  const inputsList = [
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
  ];

  return {
    handleLogin,
    inputsList,
    isFormValid,
    isLoading,
    isSuccess,
  };
};
