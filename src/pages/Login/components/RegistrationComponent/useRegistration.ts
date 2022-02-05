import { useState, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { useSignupMutation } from '@redux/api/authApi';

import { useForm } from '@components/Form/useForm';

import { InputTypeEnum } from '@components/Input';
import { FieldsList } from '@components/Form/types';

import { setFormFieldValueFactory } from '@utils/setFormFieldValueFactory';

export const useRegistration = () => {
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    secondName: '',
    login: '',
    email: '',
    phone: '',
    password: '',
  });

  const { t } = useTranslation();

  const changeRegistrationFactory =
    setFormFieldValueFactory(setRegistrationData);

  const [signup, { isLoading }] = useSignupMutation();

  const { isFormValid, validateField } = useForm({
    fieldsObject: registrationData,
  });

  const handleRegistration = useCallback(() => {
    if (isFormValid) {
      signup(registrationData);
    }
  }, [isFormValid, registrationData, signup]);

  const inputsList = useMemo(
    () => [
      {
        fieldName: FieldsList.firstName,
        handleChange: changeRegistrationFactory(FieldsList.firstName),
        placeholder: t('form.firstName'),
        value: registrationData.firstName,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.secondName,
        handleChange: changeRegistrationFactory(FieldsList.secondName),
        placeholder: t('form.secondName'),
        value: registrationData.secondName,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.email,
        handleChange: changeRegistrationFactory(FieldsList.email),
        placeholder: t('form.email'),
        type: InputTypeEnum.email,
        value: registrationData.email,
        validationRule: { isRequired: true, email: true },
        validateField,
      },
      {
        fieldName: FieldsList.phone,
        handleChange: changeRegistrationFactory(FieldsList.phone),
        placeholder: t('form.phone'),
        type: InputTypeEnum.email,
        value: registrationData.phone,
        validationRule: { isRequired: true, phone: true },
        validateField,
      },
      {
        fieldName: FieldsList.login,
        handleChange: changeRegistrationFactory(FieldsList.login),
        placeholder: t('form.login'),
        value: registrationData.login,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.password,
        handleChange: changeRegistrationFactory(FieldsList.password),
        placeholder: t('form.password'),
        type: InputTypeEnum.password,
        value: registrationData.password,
        validationRule: { minSymbols: 6 },
        validateField,
      },
    ],
    [
      changeRegistrationFactory,
      registrationData.email,
      registrationData.firstName,
      registrationData.login,
      registrationData.password,
      registrationData.phone,
      registrationData.secondName,
      t,
      validateField,
    ]
  );

  return {
    handleRegistration,
    inputsList,
    isFormValid,
    isLoading,
  };
};
