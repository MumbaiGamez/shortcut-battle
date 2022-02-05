import { useState, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import {
  useGetOAuthServiceIdMutation,
  useSigninMutation,
} from '@redux/api/authApi';

import { useForm } from '@components/Form/useForm';

import { FieldsList } from '@components/Form/types';
import { InputTypeEnum } from '@components/Input';

import { setFormFieldValueFactory } from '@utils/setFormFieldValueFactory';

export const useLogin = () => {
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  });

  const { t } = useTranslation();

  const changeLoginFactory = setFormFieldValueFactory(setLoginData);

  const { isFormValid, validateField } = useForm({ fieldsObject: loginData });

  const [signin, { isLoading }] = useSigninMutation();

  const [getOAuthServiceId] = useGetOAuthServiceIdMutation();

  const redirectToOAuth = useCallback(() => {
    getOAuthServiceId();
  }, [getOAuthServiceId]);

  const handleLogin = useCallback(() => {
    if (isFormValid) {
      signin(loginData);
    }
  }, [isFormValid, loginData, signin]);

  const inputsList = useMemo(
    () => [
      {
        fieldName: FieldsList.login,
        handleChange: changeLoginFactory(FieldsList.login),
        placeholder: t('form.login'),
        value: loginData.login,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.password,
        handleChange: changeLoginFactory(FieldsList.password),
        placeholder: t('form.password'),
        type: InputTypeEnum.password,
        value: loginData.password,
        validationRule: { minSymbols: 6 },
        validateField,
      },
    ],
    [changeLoginFactory, loginData.login, loginData.password, t, validateField]
  );

  return {
    handleLogin,
    inputsList,
    isFormValid,
    isLoading,
    redirectToOAuth,
  };
};
