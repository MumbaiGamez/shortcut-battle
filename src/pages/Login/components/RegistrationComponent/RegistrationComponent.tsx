import React from 'react';

import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { Input } from '../../../../components/Input';
import { Toaster } from '../../../../components/Toaster';
import { Loader } from '../../../../components/Loader';

import { InputTypeEnum } from '../../../../../typings/commonTypes';
import { RegistrationComponentProps } from './types';

import styles from './RegistrationComponent.css';
import { useRegistration } from './useRegistration';

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
        inputHandler={setFirstName}
        placeholder={'First name'}
        value={firstName}
        validationRule={{ isRequired: true }}
      />
      <Input
        inputHandler={setSecondName}
        placeholder={'Second name'}
        value={secondName}
        validationRule={{ isRequired: true }}
      />
      <Input
        inputHandler={setEmail}
        placeholder={'Email'}
        type={InputTypeEnum.email}
        value={email}
        validationRule={{ isRequired: true, email: true }}
      />
      <Input
        inputHandler={setPhone}
        placeholder={'Phone'}
        type={InputTypeEnum.email}
        value={phone}
        validationRule={{ isRequired: true, phone: true }}
      />
      <Input
        inputHandler={setLogin}
        validationRule={{ isRequired: true }}
        value={login}
        placeholder={'Login'}
      />
      <Input
        inputHandler={setPassword}
        placeholder={'Password'}
        type={InputTypeEnum.password}
        value={password}
        validationRule={{ minSymbols: 6 }}
      />
      <div className={styles.switchForm} onClick={switchForm}>
        Already registered? Go to Login
      </div>
      <Button onClick={handleRegistration}>Registration</Button>
    </Card>
  );
};
