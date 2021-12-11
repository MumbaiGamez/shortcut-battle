import React from 'react';

import { Button, ButtonTheme } from '@components/Button';
import { Form } from '@components/Form';

import { useLogin } from './useLogin';

import { LoginComponentProps } from './types';

export const LoginComponent = (props: LoginComponentProps) => {
  const { toggleForm } = props;

  const { auth, handleLogin, inputsList, isFormValid, isLoading } = useLogin();

  const oauthButton = (
    <Button theme={ButtonTheme.Glow} onClick={auth}>
      Auth via Yandex
    </Button>
  );

  return (
    <Form
      bottomComponent={oauthButton}
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
