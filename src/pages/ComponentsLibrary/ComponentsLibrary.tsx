import React from 'react';

import { Loader } from '../../components/Loader';
import { Star } from '../../components/Start';
import { Input } from '../../components/Input';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

import { InputTypeEnum } from '../../../typings/commonTypes';

import styles from './ComponentsLibrary.css';

export const ComponentsLibrary = () => {
  return (
    <div className={styles.container}>
      <Loader />
      <Star customClassName={styles.starWrapper} />
      <Card>
        <Input
          type={InputTypeEnum.password}
          validationRule={{ minSymbols: 6 }}
        />
        <Input validationRule={{ isRequired: true }} />
        <Button>Sample button</Button>
      </Card>
    </div>
  );
};
