import React from 'react';

import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { Input, InputTypeEnum } from '../../../../components/Input';

import { LoginComponentProps } from './types';

import styles from './LoginComponent.css';

export const LoginComponent = (props: LoginComponentProps) => {
  const { switchForm } = props;

  return (
    <Card title={'Login'}>
      <Input validationRule={{ isRequired: true }} placeholder={'Login'} />
      <Input
        placeholder={'Password'}
        type={InputTypeEnum.password}
        validationRule={{ minSymbols: 6 }}
      />
      <div className={styles.switchForm} onClick={switchForm}>
        Not registered? Go to Registration
      </div>
      <Button isGlow={true}>Login</Button>
    </Card>
  );
};
