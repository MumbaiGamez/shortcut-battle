import React, { useMemo } from 'react';

import { Button, ButtonTheme } from '@components/Button';
import { Form } from '@components/Form';

import { useLogin } from './useLogin';

import { LoginComponentProps } from './types';

export const LoginComponent = (props: LoginComponentProps) => {
  const { toggleForm } = props;

  const { handleLogin, inputsList, isFormValid, isLoading, redirectToOAuth } =
    useLogin();

  const oauthButton = useMemo(
    () => (
      <Button theme={ButtonTheme.Glow} onClick={redirectToOAuth}>
        Auth via Yandex
      </Button>
    ),
    [redirectToOAuth]
  );

  return (
    <Form
      additionalButton={oauthButton}
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
