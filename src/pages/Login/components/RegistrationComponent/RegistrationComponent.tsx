import React from 'react';

import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { Input, InputTypeEnum } from '../../../../components/Input';

import { RegistrationComponentProps } from './types';

import styles from './RegistrationComponent.css';

export const RegistrationComponent = (props: RegistrationComponentProps) => {
  const { switchForm } = props;
  return (
    <Card title={'Registration'}>
      <Input validationRule={{ isRequired: true }} placeholder={'Name'} />
      <Input
        placeholder={'Email'}
        type={InputTypeEnum.email}
        validationRule={{ isRequired: true, email: true }}
      />
      <Input
        placeholder={'Phone'}
        type={InputTypeEnum.email}
        validationRule={{ isRequired: true, phone: true }}
      />
      <Input validationRule={{ isRequired: true }} placeholder={'Login'} />
      <Input
        placeholder={'Password'}
        type={InputTypeEnum.password}
        validationRule={{ minSymbols: 6 }}
      />
      <div className={styles.switchForm} onClick={switchForm}>
        Already registered? Go to Login
      </div>
      <Button isGlow={true}>Registration</Button>
    </Card>
  );
};
