import React, { FC } from 'react';

import { Button } from '../Button';

import { Loader } from '../Loader';
import { Star } from '../Start';
import { Input } from '../Input';
import { Card } from '../Card';

import { InputTypeEnum } from '../../../typings/commonTypes';

import styles from './App.css';

export const App: FC = () => {
  return (
    <div className={styles.app}>
      <h1>Shortcut Battle</h1>
      <h2>Coming soon</h2>
      <br />
      <Button>Sample button</Button>
      <Loader />
      <Star />
      <Input type={InputTypeEnum.password} validationRule={{ minSymbols: 6 }} />
      <Card />
    </div>
  );
};
