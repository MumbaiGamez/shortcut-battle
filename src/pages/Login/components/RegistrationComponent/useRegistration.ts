import { useState, useCallback, useMemo } from 'react';

import { useForm } from '../../../../components/FormComponent/useForm';

import { authAPI } from '../../../../api/auth';

import { InputTypeEnum } from '../../../../components/Input';
import { UseRegistrationComponentProps } from './types';
import { FieldsList } from '../../../../components/FormComponent/types';

const fieldsList = [
  FieldsList.firstName,
  FieldsList.secondName,
  FieldsList.login,
  FieldsList.email,
  FieldsList.phone,
  FieldsList.password,
];

export const useRegistration = (props: UseRegistrationComponentProps) => {
  const { setError } = props;

  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const {
    handleError,
    handleLoading,
    handleSuccess,
    isFormValid,
    isLoading,
    isSuccess,
    validateField,
  } = useForm({ fieldsList, setError });

  const handleRegistration = useCallback(() => {
    if (isFormValid) {
      const data = {
        firstName,
        secondName,
        login,
        password,
        email,
        phone,
      };

      authAPI.signup({
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

  const inputsList = useMemo(
    () => [
      {
        fieldName: FieldsList.firstName,
        hanldeChange: setFirstName,
        placeholder: 'First name',
        value: firstName,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.secondName,
        hanldeChange: setSecondName,
        placeholder: 'Second name',
        value: secondName,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.email,
        hanldeChange: setEmail,
        placeholder: 'Email',
        type: InputTypeEnum.email,
        value: email,
        validationRule: { isRequired: true, email: true },
        validateField,
      },
      {
        fieldName: FieldsList.phone,
        hanldeChange: setPhone,
        placeholder: 'Phone',
        type: InputTypeEnum.email,
        value: phone,
        validationRule: { isRequired: true, phone: true },
        validateField,
      },
      {
        fieldName: FieldsList.login,
        hanldeChange: setLogin,
        placeholder: 'Login',
        value: login,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.password,
        hanldeChange: setPassword,
        placeholder: 'Password',
        type: InputTypeEnum.password,
        value: password,
        validationRule: { minSymbols: 6 },
        validateField,
      },
    ],
    [email, firstName, login, password, phone, secondName, validateField]
  );

  return {
    handleRegistration,
    inputsList,
    isFormValid,
    isLoading,
    isSuccess,
  };
};
