import React from 'react';

import { FormComponent } from '../FormComponent';

import { useLogin } from './useLogin';

import { LoginComponentProps } from './types';

export const LoginComponent = (props: LoginComponentProps) => {
  const { toggleForm, setError } = props;
  const { handleLogin, inputsList, isAllFieldsValid, isLoading } = useLogin({
    setError,
  });

  return (
    <FormComponent
      buttonText="Login"
      inputsList={inputsList}
      isLoading={isLoading}
      isButtonDisabled={!isAllFieldsValid}
      onButtonClick={handleLogin}
      toggleForm={toggleForm}
      toggleFormText="Not registered? Go to Registration"
      title="Login"
    />
  );
};
