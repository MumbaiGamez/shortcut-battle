import React from 'react';

import { Button, ButtonTheme } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { Input, InputTypeEnum } from '../../../../components/Input';

import { LoginComponentProps } from './types';

import styles from './LoginComponent.css';

export const LoginComponent = (props: LoginComponentProps) => {
  const { toggleForm } = props;

  return (
    <Card title="Login">
      <Input validationRule={{ isRequired: true }} placeholder="Login" />
      <Input
        placeholder="Password"
        type={InputTypeEnum.password}
        validationRule={{ minSymbols: 6 }}
      />
      <span className={styles.toggleFormText} onClick={toggleForm}>
        Not registered? Go to Registration
      </span>
      <Button theme={ButtonTheme.Glow}>Login</Button>
    </Card>
  );
};
