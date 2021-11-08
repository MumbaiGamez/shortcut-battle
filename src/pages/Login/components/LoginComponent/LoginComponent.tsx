import React from 'react';

import { FormComponent } from '../FormComponent';

import { useLogin } from './useLogin';

import { LoginComponentProps } from './types';

export const LoginComponent = (props: LoginComponentProps) => {
  const { switchForm } = props;
  const { error, handleLogin, inputsList, isAllFieldsValid, isLoading } =
    useLogin();

  return (
    <FormComponent
      buttonText={'Login'}
      error={error}
      inputsList={inputsList}
      isLoading={isLoading}
      isButtonDisabled={!isAllFieldsValid}
      onButtonClick={handleLogin}
      switchForm={switchForm}
      switchFormText={'Not registered? Go to Registration'}
      title={'Login'}
    />
  );
};
