import React, { FC } from 'react';
import cn from 'classnames';

import s from './App.css';

import Button from '../Button';
import { Loader } from '../Loader';
import { Star } from '../Start';
import { Input } from '../Input';
import { Card } from '../Card';
import { InputTypeEnum } from '../../commonTypes';

export const App: FC = () => {
  return (
    <div className={cn(s.app)}>
      <h1>Shortcut Battle</h1>
      <h2>Coming soon</h2>
      <br />
      <Button>Sample button</Button>
      <Loader />
      <Star />
      <Input type={InputTypeEnum.password} />
      <Card />
    </div>
  );
};
