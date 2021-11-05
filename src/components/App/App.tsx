import React from 'react';

import { Button } from '../Button';

import { Loader } from '../Loader';
import { Star } from '../Start';
import { Input } from '../Input';
import { Card } from '../Card';

import { InputTypeEnum } from '../../../typings/commonTypes';

import styles from './App.css';

export const App = () => {
  return (
    <div className={styles.app}>
      <h1>Shortcut Battle</h1>
      <h2>Coming soon</h2>
      <br />
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
