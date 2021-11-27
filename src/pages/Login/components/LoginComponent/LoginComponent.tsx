import React from 'react';

import { Form } from '../../../../components/Form';

import { useLogin } from './useLogin';

import { LoginComponentProps } from './types';

export const LoginComponent = (props: LoginComponentProps) => {
  const { toggleForm } = props;

  const { handleLogin, inputsList, isFormValid, isLoading } = useLogin();

  return (
    <Form
      buttonText="Login"
      inputsList={inputsList}
      isLoading={isLoading}
      isButtonDisabled={!isFormValid}
      onButtonClick={handleLogin}
      toggleForm={toggleForm}
      toggleFormText="Not registered? Go to Registration"
      title="Login"
    />
  );
};
