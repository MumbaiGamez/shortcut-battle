import React from 'react';
import { useTranslation } from 'react-i18next';

import { Form } from '@components/Form';

import { useRegistration } from './useRegistration';

import { RegistrationComponentProps } from './types';

import styles from './RegistrationComponent.css';

export const RegistrationComponent = (props: RegistrationComponentProps) => {
  const { toggleForm } = props;

  const { t } = useTranslation();

  const { handleRegistration, inputsList, isFormValid, isLoading } =
    useRegistration();

  return (
    <Form
      buttonText={t('login.registration')}
      inputsList={inputsList}
      isLoading={isLoading}
      isButtonDisabled={!isFormValid}
      onButtonClick={handleRegistration}
      toggleForm={toggleForm}
      toggleFormText={t('login.goToLogin')}
      toggleFormClass={styles.toggleForm}
      title={t('login.registration')}
    />
  );
};
