import { useState, useCallback, useMemo } from 'react';

import { useSignupMutation } from '../../../../redux/api/authApi';

import { useForm } from '../../../../components/Form/useForm';

import { InputTypeEnum } from '../../../../components/Input';
import { FieldsList } from '../../../../components/Form/types';

export const useRegistration = () => {
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    secondName: '',
    login: '',
    email: '',
    phone: '',
    password: '',
  });

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
        handleChange: (value: string) =>
          setRegistrationData((prevState) => ({
            ...prevState,
            firstName: value,
          })),
        placeholder: 'First name',
        value: registrationData.firstName,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.secondName,
        handleChange: (value: string) =>
          setRegistrationData((prevState) => ({
            ...prevState,
            secondName: value,
          })),
        placeholder: 'Second name',
        value: registrationData.secondName,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.email,
        handleChange: (value: string) =>
          setRegistrationData((prevState) => ({
            ...prevState,
            email: value,
          })),
        placeholder: 'Email',
        type: InputTypeEnum.email,
        value: registrationData.email,
        validationRule: { isRequired: true, email: true },
        validateField,
      },
      {
        fieldName: FieldsList.phone,
        handleChange: (value: string) =>
          setRegistrationData((prevState) => ({
            ...prevState,
            phone: value,
          })),
        placeholder: 'Phone',
        type: InputTypeEnum.email,
        value: registrationData.phone,
        validationRule: { isRequired: true, phone: true },
        validateField,
      },
      {
        fieldName: FieldsList.login,
        handleChange: (value: string) =>
          setRegistrationData((prevState) => ({
            ...prevState,
            login: value,
          })),
        placeholder: 'Login',
        value: registrationData.login,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.password,
        handleChange: (value: string) =>
          setRegistrationData((prevState) => ({
            ...prevState,
            password: value,
          })),
        placeholder: 'Password',
        type: InputTypeEnum.password,
        value: registrationData.password,
        validationRule: { minSymbols: 6 },
        validateField,
      },
    ],
    [registrationData, validateField]
  );

  return {
    handleRegistration,
    inputsList,
    isFormValid,
    isLoading,
  };
};
