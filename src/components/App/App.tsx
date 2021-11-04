import Button from '../Button';
import React, { FC } from 'react';
import s from './App.css';

export const App: FC = () => {
  return (
    <div className={s.app}>
      <h1>Shortcut Battle</h1>
      <h2>Coming soon</h2>
      <br />
      <Button>Sample button</Button>
    </div>
  );
};
