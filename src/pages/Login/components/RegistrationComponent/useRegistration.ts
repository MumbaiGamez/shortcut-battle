import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RoutesList } from '../../../../../typings/commonTypes';
import { InputTypeEnum } from '../../../../components/Input';

import { authAPI } from '../../../../api/auth';

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
  const [isFormValid, setIsFormValid] = useState(true);
  const [formFieldsValidation, setFormFieldsValidation] = useState({
    firstName: false,
    secondName: false,
    login: false,
    email: false,
    password: false,
    phone: false,
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

  const handleError = useCallback(
    (error: string) => {
      setError(error);
    },
    [setError]
  );

  const handleSuccess = useCallback(() => {
    setIsSuccess(true);
    navigate(RoutesList.home);
  }, [setIsSuccess, navigate]);

  const handleLoading = useCallback(
    (isLoading: boolean) => {
      setIsLoading(isLoading);
    },
    [setIsLoading]
  );

  const handleRegistration = useCallback(() => {
    if (isFormValid) {
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
        handleError,
        handleLoading,
        handleSuccess,
      });
    }
  }, [
    email,
    firstName,
    handleError,
    handleLoading,
    handleSuccess,
    isFormValid,
    login,
    password,
    phone,
    secondName,
  ]);

  const inputsList = [
    {
      fieldName: 'firstName',
      hanldeChange: setFirstName,
      placeholder: 'First name',
      value: firstName,
      validationRule: { isRequired: true },
      validateField,
    },
    {
      fieldName: 'secondName',
      hanldeChange: setSecondName,
      placeholder: 'Second name',
      value: secondName,
      validationRule: { isRequired: true },
      validateField,
    },
    {
      fieldName: 'email',
      hanldeChange: setEmail,
      placeholder: 'Email',
      type: InputTypeEnum.email,
      value: email,
      validationRule: { isRequired: true, email: true },
      validateField,
    },
    {
      fieldName: 'phone',
      hanldeChange: setPhone,
      placeholder: 'Phone',
      type: InputTypeEnum.email,
      value: phone,
      validationRule: { isRequired: true, phone: true },
      validateField,
    },
    {
      fieldName: 'login',
      hanldeChange: setLogin,
      placeholder: 'Login',
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
    handleRegistration,
    inputsList,
    isFormValid,
    isLoading,
    isSuccess,
  };
};
