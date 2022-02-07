import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, ButtonTheme } from '@components/Button';
import { Form } from '@components/Form';

import { useLogin } from './useLogin';

import { LoginComponentProps } from './types';

export const LoginComponent = (props: LoginComponentProps) => {
  const { toggleForm } = props;

  const { t } = useTranslation();

  const { handleLogin, inputsList, isFormValid, isLoading, redirectToOAuth } =
    useLogin();

  const oauthButton = useMemo(
    () => (
      <Button theme={ButtonTheme.Glow} onClick={redirectToOAuth}>
        {t('login.authYandex')}
      </Button>
    ),
    [redirectToOAuth, t]
  );

  return (
    <Form
      additionalButton={oauthButton}
      buttonText={t('login.login')}
      inputsList={inputsList}
      isLoading={isLoading}
      isButtonDisabled={!isFormValid}
      onButtonClick={handleLogin}
      toggleForm={toggleForm}
      toggleFormText={t('login.goToRegistration')}
      title={t('login.login')}
    />
  );
};
