import React from 'react';
import { useTranslation } from 'react-i18next';

import { Form } from '@components/Form';
import { Avatar } from '@components/Avatar';

import { useProfile } from './useProfile';

import styles from './Profile.css';

export const Profile = () => {
  const {
    avatar,
    firstName,
    handleChangeAvatar,
    handleDeleteAvatar,
    handleUpdate,
    inputsList,
    isFormValid,
    isLoading,
  } = useProfile();

  const { t } = useTranslation();

  return (
    <div className={styles.profile}>
      <Form
        buttonText={t('form.update')}
        isButtonDisabled={!isFormValid}
        isLoading={isLoading}
        inputsList={inputsList}
        onButtonClick={handleUpdate}
        title={t('nav.profile')}
      >
        <Avatar
          handleChangeAvatar={handleChangeAvatar}
          handleDeleteAvatar={handleDeleteAvatar}
          name={firstName}
          src={avatar}
        />
      </Form>
    </div>
  );
};
