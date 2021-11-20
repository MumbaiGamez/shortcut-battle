import React from 'react';

import { FormComponent } from '../../components/FormComponent';
import { Avatar } from '../../components/Avatar';

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

  return (
    <div className={styles.profile}>
      <FormComponent
        buttonText="Update"
        isButtonDisabled={isFormValid}
        isLoading={isLoading}
        inputsList={inputsList}
        onButtonClick={handleUpdate}
        title="Profile"
      >
        <Avatar
          handleChangeAvatar={handleChangeAvatar}
          handleDeleteAvatar={handleDeleteAvatar}
          name={firstName}
          src={avatar}
        />
      </FormComponent>
    </div>
  );
};
