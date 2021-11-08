import React from 'react';

import { FormComponent } from '../FormComponent';

import { useRegistration } from './useRegistration';

import { RegistrationComponentProps } from './types';

import styles from './RegistrationComponent.css';

export const RegistrationComponent = (props: RegistrationComponentProps) => {
  const { switchForm } = props;
  const { error, handleRegistration, inputsList, isAllFieldsValid, isLoading } =
    useRegistration();

  return (
    <FormComponent
      buttonText={'Registration'}
      error={error}
      inputsList={inputsList}
      isLoading={isLoading}
      isButtonDisabled={!isAllFieldsValid}
      onButtonClick={handleRegistration}
      switchForm={switchForm}
      switchFormText={'Already registered? Go to Login'}
      switchFormClass={styles.switchForm}
      title={'Registration'}
    />
  );
};
