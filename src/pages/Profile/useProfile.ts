import { useState, useCallback, useMemo, useEffect } from 'react';

import {
  useGetUserQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserProfileMutation,
} from '../../redux/api/userApi';

import { useForm } from '../../components/Form/useForm';

import { FieldsList } from '../../components/Form/types';
import { InputTypeEnum } from '../../components/Input';
import { ProfileDataType } from '../../redux/types/apiTypes';

export const useProfile = () => {
  const [userData, setUserData] = useState<ProfileDataType>({
    firstName: '',
    secondName: '',
    displayName: '',
    login: '',
    email: '',
    phone: '',
  });

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
        handleChange: (value: string) =>
          setUserData((prevState) => ({
            ...prevState,
            firstName: value,
          })),
        label: 'First name',
        placeholder: 'First name',
        value: userData.firstName || '',
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.secondName,
        handleChange: (value: string) =>
          setUserData((prevState) => ({
            ...prevState,
            secondName: value,
          })),
        label: 'Second name',
        placeholder: 'Second name',
        value: userData.secondName || '',
        validationRule: { isRequired: true },
        validateField,
      },
      {
        fieldName: FieldsList.displayName,
        handleChange: (value: string) =>
          setUserData((prevState) => ({
            ...prevState,
            displayName: value,
          })),
        label: 'Display name',
        placeholder: 'Display name',
        value: userData.displayName || '',
        validateField,
      },
      {
        fieldName: FieldsList.email,
        handleChange: (value: string) =>
          setUserData((prevState) => ({
            ...prevState,
            email: value,
          })),
        label: 'Email',
        placeholder: 'Email',
        type: InputTypeEnum.email,
        value: userData.email || '',
        validationRule: { isRequired: true, email: true },
        validateField,
      },
      {
        fieldName: FieldsList.phone,
        handleChange: (value: string) =>
          setUserData((prevState) => ({
            ...prevState,
            phone: value,
          })),
        label: 'Phone',
        placeholder: 'Phone',
        type: InputTypeEnum.email,
        value: userData.phone || '',
        validationRule: { isRequired: true, phone: true },
        validateField,
      },
      {
        fieldName: FieldsList.login,
        handleChange: (value: string) =>
          setUserData((prevState) => ({
            ...prevState,
            login: value,
          })),
        label: 'Login',
        placeholder: 'Login',
        value: userData.login || '',
        validationRule: { isRequired: true },
        validateField,
      },
    ],
    [userData, validateField]
  );

  const { data, isLoading: isProfileLoading } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      const { avatar, id, ...rest } = data;
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
