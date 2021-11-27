import { useState, useCallback, useMemo } from 'react';

import { useSigninMutation } from '../../../../redux/api/authApi';

import { useForm } from '../../../../components/Form/useForm';

import { InputTypeEnum } from '../../../../components/Input';

export const useLogin = () => {
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  });

  const { isFormValid, validateField } = useForm({ fieldsObject: loginData });

  const [signin, { isLoading }] = useSigninMutation();

  const handleLogin = useCallback(() => {
    if (isFormValid) {
      signin(loginData);
    }
  }, [isFormValid, loginData, signin]);

  const inputsList = useMemo(
    () => [
      {
        fieldName: 'login',
        handleChange: (value: string) =>
          setLoginData((prevState) => ({
            ...prevState,
            login: value,
          })),
        placeholder: 'Login',
        value: loginData.login,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: 'password',
        handleChange: (value: string) =>
          setLoginData((prevState) => ({
            ...prevState,
            password: value,
          })),
        placeholder: 'Password',
        type: InputTypeEnum.password,
        value: loginData.password,
        validationRule: { minSymbols: 6 },
        validateField,
      },
    ],
    [loginData, validateField]
  );

  return {
    handleLogin,
    inputsList,
    isFormValid,
    isLoading,
  };
};
