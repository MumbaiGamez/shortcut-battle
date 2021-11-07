import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesList } from '../../../../../typings/commonTypes';

import { authAPI } from '../../../../services';

export const useLogin = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    const data = { login, password };
    authAPI.login({ data, errorCallback, handleLoading, successCallback });
  };

  return {
    error,
    isLoading,
    isSuccess,
    login,
    password,
    setLogin,
    setPassword,
    handleLogin,
  };
};