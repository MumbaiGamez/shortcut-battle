import React from 'react';

import { Form } from '@components/Form';

import { useRegistration } from './useRegistration';

import { RegistrationComponentProps } from './types';

import styles from './RegistrationComponent.css';

export const RegistrationComponent = (props: RegistrationComponentProps) => {
  const { toggleForm } = props;

  const { handleRegistration, inputsList, isFormValid, isLoading } =
    useRegistration();

  return (
    <Form
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
