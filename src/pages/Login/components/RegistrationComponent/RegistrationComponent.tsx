import React from 'react';

import { FormComponent } from '../FormComponent';

import { useRegistration } from './useRegistration';

import { RegistrationComponentProps } from './types';

import styles from './RegistrationComponent.css';

export const RegistrationComponent = (props: RegistrationComponentProps) => {
  const { toggleForm, setError } = props;

  const { handleRegistration, inputsList, isFormValid, isLoading } =
    useRegistration({ setError });

  return (
    <FormComponent
      buttonText="Registration"
      inputsList={inputsList}
      isLoading={isLoading}
      isButtonDisabled={!isFormValid}
      onButtonClick={handleRegistration}
      toggleForm={toggleForm}
      toggleFormText="Already registered? Go to Login"
      toggleFormClass={styles.toggleForm}
      title="Registration"
    />
  );
};
