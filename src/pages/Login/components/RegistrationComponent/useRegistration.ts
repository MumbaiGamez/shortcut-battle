import { useState, useCallback, useMemo } from 'react';

import { useSignupMutation } from '../../../../redux/api/authApi';

import { useForm } from '../../../../components/Form/useForm';

import { InputTypeEnum } from '../../../../components/Input';
import { FieldsList } from '../../../../components/Form/types';

import { setValueToUseStateFactory } from '../../../../utils/setValueToUseStateFactory';

export const useRegistration = () => {
  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    secondName: '',
    login: '',
    email: '',
    phone: '',
    password: '',
  });

  const changeRegistrationFactory =
    setValueToUseStateFactory(setRegistrationData);

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
        placeholder: 'First name',
        value: registrationData.firstName,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.secondName,
        handleChange: changeRegistrationFactory(FieldsList.secondName),
        placeholder: 'Second name',
        value: registrationData.secondName,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.email,
        handleChange: changeRegistrationFactory(FieldsList.email),
        placeholder: 'Email',
        type: InputTypeEnum.email,
        value: registrationData.email,
        validationRule: { isRequired: true, email: true },
        validateField,
      },
      {
        fieldName: FieldsList.phone,
        handleChange: changeRegistrationFactory(FieldsList.phone),
        placeholder: 'Phone',
        type: InputTypeEnum.email,
        value: registrationData.phone,
        validationRule: { isRequired: true, phone: true },
        validateField,
      },
      {
        fieldName: FieldsList.login,
        handleChange: changeRegistrationFactory(FieldsList.login),
        placeholder: 'Login',
        value: registrationData.login,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.password,
        handleChange: changeRegistrationFactory(FieldsList.password),
        placeholder: 'Password',
        type: InputTypeEnum.password,
        value: registrationData.password,
        validationRule: { minSymbols: 6 },
        validateField,
      },
    ],
    [changeRegistrationFactory, registrationData, validateField]
  );

  return {
    handleRegistration,
    inputsList,
    isFormValid,
    isLoading,
  };
};
