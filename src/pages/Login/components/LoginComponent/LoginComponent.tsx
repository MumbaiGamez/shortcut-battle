import React from 'react';

import { Input, InputTypeEnum } from '../../../../components/Input';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { Toaster } from '../../../../components/Toaster';
import { Loader } from '../../../../components/Loader';

import { useLogin } from './useLogin';

import { LoginComponentProps } from './types';

import styles from './LoginComponent.css';

export const LoginComponent = (props: LoginComponentProps) => {
  const { switchForm } = props;
  const {
    error,
    handleLogin,
    isLoading,
    login,
    password,
    setLogin,
    setPassword,
  } = useLogin();

  return (
    <Card title={'Login'}>
      <Toaster isError={!!error} text={error} />
      {isLoading && <Loader />}
      <Input
        handleInput={setLogin}
        placeholder={'Login'}
        value={login}
        validationRule={{ isRequired: true }}
      />
      <Input
        handleInput={setPassword}
        placeholder={'Password'}
        value={password}
        type={InputTypeEnum.password}
        validationRule={{ minSymbols: 6 }}
      />
      <div className={styles.switchForm} onClick={switchForm}>
        Not registered? Go to Registration
      </div>
      <Button isGlow={true} onClick={handleLogin}>
        Login
      </Button>
    </Card>
  );
};
