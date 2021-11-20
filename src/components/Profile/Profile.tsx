import React from 'react';

import { FormComponent } from '../FormComponent';
import { Avatar } from '../Avatar';

import { useProfile } from './useProfile';

import styles from './Profile.css';

export const Profile = () => {
  const {
    avatar,
    firstName,
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
        <Avatar name={firstName} src={avatar} />
      </FormComponent>
    </div>
  );
};
