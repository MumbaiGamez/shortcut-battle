import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesList } from '../../../../../typings/commonTypes';
import { InputTypeEnum } from '../../../../components/Input';

import { authAPI } from '../../../../services';

import { UseRegistrationComponentProps } from './types';

export const useRegistration = (props: UseRegistrationComponentProps) => {
  const { setError } = props;

  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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

  const handleRegistration = () => {
    if (isAllFieldsValid) {
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
    }
  };

  const inputsList = [
    {
      hanldeChange: setFirstName,
      placeholder: 'First name',
      setIsFieldValid: setIsAllFieldsValid,
      value: firstName,
      validationRule: { isRequired: true },
    },
    {
      hanldeChange: setSecondName,
      placeholder: 'Second name',
      setIsFieldValid: setIsAllFieldsValid,
      value: secondName,
      validationRule: { isRequired: true },
    },
    {
      hanldeChange: setEmail,
      placeholder: 'Email',
      setIsFieldValid: setIsAllFieldsValid,
      type: InputTypeEnum.email,
      value: email,
      validationRule: { isRequired: true, email: true },
    },
    {
      hanldeChange: setPhone,
      placeholder: 'Phone',
      setIsFieldValid: setIsAllFieldsValid,
      type: InputTypeEnum.email,
      value: phone,
      validationRule: { isRequired: true, phone: true },
    },
    {
      hanldeChange: setLogin,
      placeholder: 'Login',
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
    handleRegistration,
    inputsList,
    isAllFieldsValid,
    isLoading,
    isSuccess,
  };
};
