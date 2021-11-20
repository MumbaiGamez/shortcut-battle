import React from 'react';

import { FormComponent } from '../FormComponent';
import { useProfile } from './useProfile';

import styles from './Profile.css';

export const Profile = () => {
  const { handleUpdate, inputsList, isFormValid, isLoading } = useProfile();

  return (
    <div className={styles.profile}>
      <FormComponent
        buttonText="Update"
        isButtonDisabled={isFormValid}
        isLoading={isLoading}
        inputsList={inputsList}
        onButtonClick={handleUpdate}
        title="Profile"
      />
    </div>
  );
};
