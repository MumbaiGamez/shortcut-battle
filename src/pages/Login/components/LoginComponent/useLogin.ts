import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesList } from '../../../../../typings/commonTypes';
import { InputTypeEnum } from '../../../../components/Input';

import { authAPI } from '../../../../services';

import { UseLoginComponentProps } from './types';

export const useLogin = (props: UseLoginComponentProps) => {
  const { setError } = props;

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllFieldsValid, setIsAllFieldsValid] = useState(true);

  const navigate = useNavigate();

  const errorCallback = (error: string) => {
    setError(error);
  };

  const successCallback = () => {
    setIsSuccess(true);
    navigate(RoutesList.home);
  };

  const handleLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const handleLogin = () => {
    if (isAllFieldsValid) {
      const data = { login, password };
      authAPI.login({ data, errorCallback, handleLoading, successCallback });
    }
  };

  const inputsList = [
    {
      hanldeChange: setLogin,
      placeholder: 'login',
      setIsFieldValid: setIsAllFieldsValid,
      value: login,
      validationRule: { isRequired: true },
    },
    {
      hanldeChange: setPassword,
      placeholder: 'Password',
      setIsFieldValid: setIsAllFieldsValid,
      type: InputTypeEnum.password,
      value: password,
      validationRule: { minSymbols: 6 },
    },
  ];

  return {
    handleLogin,
    inputsList,
    isAllFieldsValid,
    isLoading,
    isSuccess,
  };
};
