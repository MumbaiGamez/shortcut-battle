import React from 'react';

import { Loader } from '../../components/Loader';
import { Star } from '../../components/Start';
import { Input, InputTypeEnum } from '../../components/Input';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

import styles from './ComponentsLibrary.css';

export const ComponentsLibrary = () => {
  return (
    <div className={styles.componentsLibrary}>
      <Loader />
      <Star className={styles.starWrapper} />
      <div className={styles.cardContainer}>
        <Card>
          <Input
            type={InputTypeEnum.password}
            validationRule={{ minSymbols: 6 }}
          />
          <Input validationRule={{ isRequired: true }} />
          <Button isGlow={true}>Sample button</Button>
        </Card>
      </div>
    </div>
  );
};
