import { useState, useCallback, useMemo, useEffect } from 'react';

import { useForm } from '../../pages/Login/components/FormComponent/useForm';

import { authAPI } from '../../api/auth';

import { InputTypeEnum } from '../Input';

import { FieldsList } from '../../pages/Login/components/FormComponent/types';
import { UserDataType } from '../../api/types';

const fieldsList = [
  FieldsList.firstName,
  FieldsList.secondName,
  FieldsList.displayName,
  FieldsList.login,
  FieldsList.email,
  FieldsList.phone,
  FieldsList.avatar,
];

export const useProfile = () => {
  const [error, setError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSuccess = (data: UserDataType) => {
    const { firstName, secondName, displayName, login, email, phone, avatar } =
      data;

    firstName && setFirstName(firstName);
    secondName && setSecondName(secondName);
    displayName && setDisplayName(displayName);
    login && setLogin(login);
    email && setEmail(email);
    phone && setPhone(phone);
    avatar && setAvatar(avatar);
  };

  const {
    handleError,
    handleLoading,
    isFormValid,
    isLoading,
    isSuccess,
    validateField,
  } = useForm({ fieldsList, setError });

  useEffect(() => {
    authAPI.getUserInfo({
      handleError,
      handleLoading,
      handleSuccess,
    });
  }, [handleError, handleLoading]);

  const handleUpdate = useCallback(() => {
    if (isFormValid) {
      const data = {
        firstName,
        secondName,
        displayName,
        login,
        email,
        phone,
        avatar,
      };
      console.log('data', data);
    }
  }, [
    avatar,
    displayName,
    email,
    firstName,
    isFormValid,
    login,
    phone,
    secondName,
  ]);

  const inputsList = useMemo(
    () => [
      {
        fieldName: FieldsList.firstName,
        hanldeChange: setFirstName,
        label: 'First name',
        placeholder: 'First name',
        value: firstName,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.secondName,
        hanldeChange: setSecondName,
        label: 'Second name',
        placeholder: 'Second name',
        value: secondName,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.displayName,
        hanldeChange: setDisplayName,
        label: 'Display name',
        placeholder: 'Display name',
        value: displayName,
        validateField,
      },
      {
        fieldName: FieldsList.email,
        hanldeChange: setEmail,
        label: 'Email',
        placeholder: 'Email',
        type: InputTypeEnum.email,
        value: email,
        validationRule: { isRequired: true, email: true },
        validateField,
      },
      {
        fieldName: FieldsList.phone,
        hanldeChange: setPhone,
        label: 'Phone',
        placeholder: 'Phone',
        type: InputTypeEnum.email,
        value: phone,
        validationRule: { isRequired: true, phone: true },
        validateField,
      },
      {
        fieldName: FieldsList.login,
        hanldeChange: setLogin,
        label: 'Login',
        placeholder: 'Login',
        value: login,
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.avatar,
        hanldeChange: setAvatar,
        label: 'Avatar',
        placeholder: 'avatar',
        type: InputTypeEnum.password,
        value: avatar,
        validateField,
      },
    ],
    [
      avatar,
      displayName,
      email,
      firstName,
      login,
      phone,
      secondName,
      validateField,
    ]
  );

  return {
    error,
    handleUpdate,
    inputsList,
    isFormValid,
    isLoading,
    isSuccess,
  };
};
