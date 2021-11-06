import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesList } from '../../../../../typings/commonTypes';

import { authAPI } from '../../../../services';

export const useRegistration = () => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

  const handleRegistration = () => {
    const data = {
      first_name: firstName,
      second_name: secondName,
      login,
      password,
      email,
      phone,
    };
    authAPI.registration({
      data,
      errorCallback,
      handleLoading,
      successCallback,
    });
  };

  return {
    email,
    error,
    handleRegistration,
    firstName,
    isLoading,
    isSuccess,
    login,
    password,
    phone,
    secondName,
    setEmail,
    setFirstName,
    setLogin,
    setPassword,
    setPhone,
    setSecondName,
  };
};
