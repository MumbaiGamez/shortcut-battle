import React from 'react';

import { FormComponent } from '../FormComponent';

import { useRegistration } from './useRegistration';

import { RegistrationComponentProps } from './types';

import styles from './RegistrationComponent.css';

export const RegistrationComponent = (props: RegistrationComponentProps) => {
  const { switchForm, setError } = props;
  const { handleRegistration, inputsList, isAllFieldsValid, isLoading } =
    useRegistration({ setError });

  return (
    <FormComponent
      buttonText={'Registration'}
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
