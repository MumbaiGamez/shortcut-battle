import React from 'react';

import { Button, ButtonTheme } from '../../../../components/Button';
import { Input, InputTypeEnum } from '../../../../components/Input';
import { Card } from '../../../../components/Card';
import { Toaster } from '../../../../components/Toaster';
import { Loader } from '../../../../components/Loader';

import { useRegistration } from './useRegistration';

import { RegistrationComponentProps } from './types';

import styles from './RegistrationComponent.css';

export const RegistrationComponent = (props: RegistrationComponentProps) => {
  const { switchForm } = props;
  const {
    email,
    error,
    handleRegistration,
    firstName,
    isLoading,
    login,
    password,
    phone,
    secondName,
    setEmail,
    setFirstName,
    setLogin,
    setPassword,
    setPhone,
    setSecondName,
  } = useRegistration();
  return (
    <Card title={'Registration'}>
      <Toaster isError={!!error} text={error} />
      {isLoading && <Loader />}
      <Input
        hanldeChange={setFirstName}
        placeholder={'First name'}
        value={firstName}
        validationRule={{ isRequired: true }}
      />
      <Input
        hanldeChange={setSecondName}
        placeholder={'Second name'}
        value={secondName}
        validationRule={{ isRequired: true }}
      />
      <Input
        hanldeChange={setEmail}
        placeholder={'Email'}
        type={InputTypeEnum.email}
        value={email}
        validationRule={{ isRequired: true, email: true }}
      />
      <Input
        hanldeChange={setPhone}
        placeholder={'Phone'}
        type={InputTypeEnum.email}
        value={phone}
        validationRule={{ isRequired: true, phone: true }}
      />
      <Input
        hanldeChange={setLogin}
        validationRule={{ isRequired: true }}
        value={login}
        placeholder={'Login'}
      />
      <Input
        hanldeChange={setPassword}
        placeholder={'Password'}
        type={InputTypeEnum.password}
        value={password}
        validationRule={{ minSymbols: 6 }}
      />
      <span className={styles.switchForm} onClick={switchForm}>
        Already registered? Go to Login
      </span>
      <Button theme={ButtonTheme.Glow} onClick={handleRegistration}>
        Registration
      </Button>
    </Card>
  );
};
