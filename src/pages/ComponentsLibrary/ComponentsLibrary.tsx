import React from 'react';

import { Loader } from '../../components/Loader';
import { Star } from '../../components/Star';
import { Input, InputTypeEnum } from '../../components/Input';
import { Card } from '../../components/Card';
import { Button, ButtonTheme } from '../../components/Button';

import styles from './ComponentsLibrary.css';

export const ComponentsLibrary = () => {
  return (
    <div className={styles.componentsLibrary}>
      <Loader />
      <Star className={styles.starWrapper} />
      <div className={styles.cardContainer}>
        <Card title="Title" subtitle="Subtitle">
          <Input
            type={InputTypeEnum.password}
            validationRule={{ minSymbols: 6 }}
          />
          <Input validationRule={{ isRequired: true }} />
          <Button theme={ButtonTheme.Glow}>Sample button</Button>
        </Card>
      </div>
    </div>
  );
};
