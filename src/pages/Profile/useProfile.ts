import { useState, useCallback, useMemo, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import {
  useGetUserQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserProfileMutation,
} from '@redux/api/userApi';

import { useForm } from '@components/Form/useForm';

import { FieldsList } from '@components/Form/types';
import { InputTypeEnum } from '@components/Input';
import { ProfileDataType } from '@redux/types/apiTypes';

import { setFormFieldValueFactory } from '@utils/setFormFieldValueFactory';

export const useProfile = () => {
  const [userData, setUserData] = useState<ProfileDataType>({
    firstName: '',
    secondName: '',
    displayName: '',
    login: '',
    email: '',
    phone: '',
  });

  const { t } = useTranslation();

  const changeProfileFactory = setFormFieldValueFactory(setUserData);

  const [updateAvatar, { isLoading: isAvatarUpdateLoading }] =
    useUpdateUserAvatarMutation();

  const [updateUserProfile, { isLoading: isProfileUpdateLoading }] =
    useUpdateUserProfileMutation();

  const [avatar, setAvatar] = useState('');

  const handleChangeAvatar = (newAvatar: File) => {
    const data = new FormData();

    data.append('file', newAvatar);

    updateAvatar(data);

    const reader = new FileReader();

    reader.readAsDataURL(newAvatar);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result);
      }
    };
  };

  const handleDeleteAvatar = () => {
    setAvatar('');
  };

  const { isFormValid, validateField } = useForm({
    fieldsObject: userData,
  });

  const handleUpdate = useCallback(() => {
    if (isFormValid) {
      updateUserProfile(userData);
    }
  }, [updateUserProfile, userData, isFormValid]);

  const inputsList = useMemo(
    () => [
      {
        fieldName: FieldsList.firstName,
        handleChange: changeProfileFactory(FieldsList.firstName),
        label: t('form.firstName'),
        placeholder: t('form.firstName'),
        value: userData.firstName || '',
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.secondName,
        handleChange: changeProfileFactory(FieldsList.secondName),
        label: t('form.secondName'),
        placeholder: t('form.secondName'),
        value: userData.secondName || '',
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.displayName,
        handleChange: changeProfileFactory(FieldsList.displayName),
        label: t('form.displayName'),
        placeholder: t('form.displayName'),
        value: userData.displayName || '',
        validateField,
      },
      {
        fieldName: FieldsList.email,
        handleChange: changeProfileFactory(FieldsList.email),
        label: t('form.email'),
        placeholder: t('form.email'),
        type: InputTypeEnum.email,
        value: userData.email || '',
        validationRule: { isRequired: true, email: true },
        validateField,
      },
      {
        fieldName: FieldsList.phone,
        handleChange: changeProfileFactory(FieldsList.phone),
        label: t('form.phone'),
        placeholder: t('form.phone'),
        type: InputTypeEnum.email,
        value: userData.phone || '',
        validationRule: { isRequired: true, phone: true },
        validateField,
      },
      {
        fieldName: FieldsList.login,
        handleChange: changeProfileFactory(FieldsList.login),
        label: t('form.login'),
        placeholder: t('form.login'),
        value: userData.login || '',
        validationRule: { isRequired: true },
        validateField,
      },
    ],
    [
      changeProfileFactory,
      t,
      userData.displayName,
      userData.email,
      userData.firstName,
      userData.login,
      userData.phone,
      userData.secondName,
      validateField,
    ]
  );

  const { data, isLoading: isProfileLoading } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      const { avatar, ...rest } = data;
      const avatarUrl = avatar
        ? `https://ya-praktikum.tech/api/v2/resources${avatar}`
        : '';

      setUserData(rest);
      setAvatar(avatarUrl);
    }
  }, [data]);

  return {
    avatar,
    firstName: userData.firstName,
    handleChangeAvatar,
    handleDeleteAvatar,
    handleUpdate,
    inputsList,
    isFormValid,
    isLoading:
      isProfileLoading || isAvatarUpdateLoading || isProfileUpdateLoading,
  };
};
