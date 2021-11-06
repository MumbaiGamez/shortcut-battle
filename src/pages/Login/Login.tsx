import React from 'react';

import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';

import { InputTypeEnum } from '../../../typings/commonTypes';

import styles from './Login.css';

export const Login = () => {
  return (
    <div className={styles.login}>
      <Card>
        <Input validationRule={{ isRequired: true }} placeholder={'Login'} />
        <Input
          placeholder={'Password'}
          type={InputTypeEnum.password}
          validationRule={{ minSymbols: 6 }}
        />
        <Button>Login</Button>
      </Card>
    </div>
  );
};
